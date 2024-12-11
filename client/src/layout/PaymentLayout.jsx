/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

const PaymentLayout = ({ children }) => {
  return (
    <div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default PaymentLayout;
