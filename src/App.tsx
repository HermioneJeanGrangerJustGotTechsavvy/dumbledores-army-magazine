
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HouseSorting from "./pages/HouseSorting";
import DormDesigner from "./pages/DormDesigner";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Writing from "./pages/Writing";
import Art from "./pages/Art";
import PotterPrints from "./pages/PotterPrints";
import Performances from "./pages/Performances";
import Issues from "./pages/Issues";
import About from "./pages/About";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/house-sorting" element={<HouseSorting />} />
          <Route path="/dorm-designer" element={<DormDesigner />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/art" element={<Art />} />
          <Route path="/potter-prints" element={<PotterPrints />} />
          <Route path="/performances" element={<Performances />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
