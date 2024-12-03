import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* แยก Route สำหรับ User */}
        <Route path="/*" element={<UserRoutes />} />
        {/* แยก Route สำหรับ Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
