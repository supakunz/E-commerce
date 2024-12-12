const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderSchema = require("../models/OrderModel");
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const getAllOrderlist = async (req, res) => {
  try {
    let products = await orderSchema.find({});
    console.log("All Order List Fetched");
    res.send(products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const paymentCreate = async (req, res) => {
  const { address, cart } = req.body;
  console.log("Cart ==>", cart);
  console.log("Address ==>", address);
  try {
    // create payment session
    const orderId = uuidv4(); // generate orderId
    const exchangeRate = 35; // อัตราการแลกเปลี่ยน USD -> THB

    // Data Products ที่จะส่งไป
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          description: `Category: ${item.category}, Size: ${item.size}`,
          images: [
            `${
              item.id < 37 ? process.env.CLIENT_URL + item.image : item.image
            }`,
          ], // เพิ่ม URL ที่ถูกต้อง
        },
        unit_amount: Math.round(item.new_price * exchangeRate * 100), // คูณ 100 เพื่อแปลงเป็นสตางค์
      },
      quantity: item.total,
    }));

    // Data ที่จะส่งไปเพื่อขอ Link จ่ายเงิน Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment?id=${orderId}`, //หน้าที่จะ redirect ไปหลังจ่ายเงินสำเร็จ
      cancel_url: `${process.env.CLIENT_URL}/payment?id=${orderId}`, //หน้าที่จะ redirect ไปหลังยกเลิกจ่ายเงิน
    });

    // create order in database (name, address, session id, status)
    console.log("session", session);

    const data = {
      address: address,
      products: cart,
      amount_total: session.amount_total,
      session_id: session.id,
      status: session.status,
      order_id: orderId,
      date: session.created,
    };

    const productData = new orderSchema(data);
    console.log(productData);

    // Save on Database
    await productData.save();

    res.json({
      message: "Checkout success.",
      id: session.id,
      // result,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: "Error payment" });
  }
};

const removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await orderSchema.findOneAndDelete({ order_id: orderId });
    console.log("Remove Order");
    res.json({ success: true, message: "Remove Successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getOrderID = async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await orderSchema.find({ order_id: orderId });
    const selectedOrder = result[0];
    if (!selectedOrder) {
      throw {
        errorMessage: "Order not found",
      };
    }
    res.json(selectedOrder);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: error.errorMessage || "System error" });
  }
};

const webHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentSuccessData = event.data.object;
      const sessionId = paymentSuccessData.id;

      const data = {
        status: paymentSuccessData.status,
      };

      // หา order จาก sessionId และ update status
      const result = await orderSchema.findOneAndUpdate(
        {
          session_id: sessionId,
        },
        data,
        {
          new: true,
        }
      );
      console.log("=== update result", result);

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = {
  getAllOrderlist,
  paymentCreate,
  getOrderID,
  webHook,
  removeOrder,
};
