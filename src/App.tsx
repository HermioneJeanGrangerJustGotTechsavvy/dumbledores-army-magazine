
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HouseSorting from "./pages/HouseSorting";
import DormDesigner from "./pages/DormDesigner";
import Classes from "./pages/Classes";
import Writing from "./pages/Writing";
import Issues from "./pages/Issues";
import About from "./pages/About";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/house-sorting" element={<HouseSorting />} />
            <Route path="/dorm-designer" element={<DormDesigner />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
