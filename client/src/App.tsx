import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
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
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminContacts from "@/pages/admin/contacts";
import AdminDemos from "@/pages/admin/demos";
import AdminApplications from "@/pages/admin/applications";
import AdminBlog from "@/pages/admin/blog";
import AdminTeam from "@/pages/admin/team";
import AdminSolutions from "@/pages/admin/solutions";
import AdminSectors from "@/pages/admin/sectors";
import AdminContent from "@/pages/admin/content";
import AdminLayout from "@/components/AdminLayout";

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard">
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </Route>
        <Route path="/admin/contacts">
          <AdminLayout>
            <AdminContacts />
          </AdminLayout>
        </Route>
        <Route path="/admin/demos">
          <AdminLayout>
            <AdminDemos />
          </AdminLayout>
        </Route>
        <Route path="/admin/applications">
          <AdminLayout>
            <AdminApplications />
          </AdminLayout>
        </Route>
        <Route path="/admin/blog">
          <AdminLayout>
            <AdminBlog />
          </AdminLayout>
        </Route>
        <Route path="/admin/team">
          <AdminLayout>
            <AdminTeam />
          </AdminLayout>
        </Route>
        <Route path="/admin/solutions">
          <AdminLayout>
            <AdminSolutions />
          </AdminLayout>
        </Route>
        <Route path="/admin/sectors">
          <AdminLayout>
            <AdminSectors />
          </AdminLayout>
        </Route>
        <Route path="/admin/content">
          <AdminLayout>
            <AdminContent />
          </AdminLayout>
        </Route>
        
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/eflow-bpm" component={lazy(() => import('./pages/solutions/eflow-bpm'))} />
        <Route path="/solutions/document-management" component={lazy(() => import('./pages/solutions/document-management'))} />
        <Route path="/solutions/integration" component={lazy(() => import('./pages/solutions/integration'))} />
        <Route path="/solutions/:slug" component={Solutions} />
        <Route path="/sectors" component={Sectors} />
        <Route path="/sectors/manufacturing" component={lazy(() => import('./pages/sectors/manufacturing'))} />
        <Route path="/sectors/service" component={lazy(() => import('./pages/sectors/service'))} />
        <Route path="/sectors/energy" component={lazy(() => import('./pages/sectors/energy'))} />
        <Route path="/sectors/retail" component={lazy(() => import('./pages/sectors/retail'))} />
        <Route path="/sectors/:slug" component={Sectors} />
        <Route path="/references" component={References} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={Blog} />
        <Route path="/career" component={Career} />
        <Route path="/contact" component={Contact} />
        <Route path="/demo-request" component={DemoRequest} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
