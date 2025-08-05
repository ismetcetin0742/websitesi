import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import Home from "@/pages/home";
import About from "@/pages/about";
import Solutions from "@/pages/solutions";
import Sectors from "@/pages/sectors";
import References from "@/pages/references";
import Blog from "@/pages/blog";
import Career from "@/pages/career";
import Contact from "@/pages/contact";
import DemoRequest from "@/pages/demo-request";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/solutions/:slug" component={Solutions} />
      <Route path="/sectors" component={Sectors} />
      <Route path="/sectors/:slug" component={Sectors} />
      <Route path="/references" component={References} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/career" component={Career} />
      <Route path="/contact" component={Contact} />
      <Route path="/demo-request" component={DemoRequest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
