import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import SalonListing from "./pages/SalonListing";
import Booking from "./pages/Booking";
import BookingHome from "./pages/BookingHome";
import BookingBarber from "./pages/BookingBarber";
import BookingNails from "./pages/BookingNails";
import BookingConfirmation from "./pages/BookingConfirmation";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/salon/:id" element={<SalonListing />} />
          <Route path="/booking" element={<BookingHome />} />
          <Route path="/booking/barber" element={<BookingBarber />} />
          <Route path="/booking/nails" element={<BookingNails />} />
          <Route path="/booking/:salonId" element={<Booking />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
