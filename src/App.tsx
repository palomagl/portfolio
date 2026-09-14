import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Toaster/Sonner/TooltipProvider/QueryClient foram removidos daqui: nenhuma
// página do site usa toast, tooltip do Radix ou react-query — eram overhead
// de JS/contexto montado à toa em todo carregamento.
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
