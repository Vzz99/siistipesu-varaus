import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingPage } from "@/pages/BookingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingPage />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
