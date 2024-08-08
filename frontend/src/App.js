import {  Route, Routes,Router, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import FormDetails from "./Components/FormDetails";
import ToastifyAlert from "./Components/Toastify";
import { MantineProvider } from "@mantine/core";
import ReportData from "./Components/ReportData";

function App() {
  return (
    <>
    <ToastifyAlert/>
    <MantineProvider>
     <BrowserRouter>   
        <Routes>
          <Route path="/" element={<FormDetails/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportData/>}/>
        </Routes>
     </BrowserRouter>
     </MantineProvider>
    </>
  );
}

export default App;
