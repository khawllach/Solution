import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./Components/Layouts/Topbar";
import CarrierDashboard from "./Components/CarrierDashboard/CarrierDashboard";
import NewPickupRequest from "./Components/NewPickupRequest/NewPickupRequest";
import Appointments from "./Components/Appointment/ConfirmedAppointments";
import Login from "./Components/Auth/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import CarrierRegister from "./Components/CarrierRegister/CarrierRegister";
import OperatorRegister from "./Components/Operatorregister/Operatorregister";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import PendingRequestsPage from "./Components/PendingRequestsPage/PendingRequestsPage";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (without Topbar) */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/carrier-register" element={<CarrierRegister />} />
          <Route path="/operator-register" element={<OperatorRegister />} />

          {/* Carrier Portal Routes (with Topbar) */}
          <Route
            path="/carrier/*"
            element={
              <>
                <Topbar />
                <Routes>
                  <Route path="dashboard" element={<CarrierDashboard />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="control" element={<NewPickupRequest />} />
                  <Route
                    path="*"
                    element={<Navigate to="/carrier/dashboard" replace />}
                  />
                </Routes>
              </>
            }
          />

          {/* Operator Portal Routes (with Topbar) */}
          <Route
            path="/operator/*"
            element={
              <>
                <Topbar />
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="pending" element={<PendingRequestsPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/operator/dashboard" replace />}
                  />
                </Routes>
              </>
            }
          />

          {/* Legacy routes redirect */}
          <Route
            path="/CarrierDashboard"
            element={<Navigate to="/carrier/dashboard" replace />}
          />
          <Route
            path="/pending"
            element={<Navigate to="/carrier/pending" replace />}
          />
          <Route
            path="/control"
            element={<Navigate to="/carrier/control" replace />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
