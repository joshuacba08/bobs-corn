import { Toaster } from "@/components/ui/toaster";
import CornNavBar from "@/layout/CornNavBar";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <CornNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default AppRouter;
