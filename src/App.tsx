import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Events from "./pages/Events";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import FirebaseTest from "./components/FirebaseTest";
import DatabaseViewer from "./components/DatabaseViewer";
import QuickTest from "./components/QuickTest";
import EmulatorDebug from "./components/EmulatorDebug";
import FirestoreViewer from "./components/FirestoreViewer";
import FloatingActionButtons from "./components/FloatingActionButtons";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgressIndicator />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/admin" element={<ProtectedAdminRoute />} />
              <Route path="/test-firebase" element={<FirebaseTest />} />
              <Route path="/database" element={<DatabaseViewer />} />
              <Route path="/firestore" element={<FirestoreViewer />} />
              <Route path="/quick-test" element={<QuickTest />} />
              <Route path="/debug" element={<EmulatorDebug />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActionButtons />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
