import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./Components/Layouts/Topbar";
import CarrierDashboard from "./Components/CarrierDashboard/CarrierDashboard";
import NewPickupRequest from "./Components/NewPickupRequest/NewPickupRequest";
import Appointments from "./Components/Appointment/ConfirmedAppointments";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Topbar />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/CarrierDashboard" replace />}
          />

          <Route path="/CarrierDashboard" element={<CarrierDashboard />} />
          <Route path="/pending" element={<Appointments />} />
          <Route path="/control" element={<NewPickupRequest />} />

          <Route
            path="*"
            element={<Navigate to="/CarrierDashboard" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
