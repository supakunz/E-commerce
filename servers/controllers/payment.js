const paymentCreate = async (req, res) => {
  try {
    const response = req.boby;
    res.json({ message: "test" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
};

module.exports = { paymentCreate };
