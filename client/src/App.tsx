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
import TestLogin from "@/pages/admin/test-login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminContacts from "@/pages/admin/contacts";
import AdminDemos from "@/pages/admin/demos";
import AdminApplications from "@/pages/admin/applications";
import BlogManagement from "@/pages/admin/blog/index";
import AdminBlogPosts from "@/pages/admin/blog/posts";
import CreateBlogPost from "@/pages/admin/blog/create";
import BlogSettings from "@/pages/admin/blog/settings";

import AboutManagement from "@/pages/admin/about/index";
import AdminAboutContent from "@/pages/admin/about/content";
import AdminCompanyValues from "@/pages/admin/about/values";
import AdminTeamPage from "@/pages/admin/about/team";
import AdminAboutStats from "@/pages/admin/about/stats";
import AdminReferences from "@/pages/admin/references/index";
import AdminReferencesContent from "@/pages/admin/references/content";
import AdminReferencesLogos from "@/pages/admin/references/logos";
import AdminReferencesProjects from "@/pages/admin/references/projects";
import AdminHomepage from "@/pages/admin/homepage/index";
import AdminHomepageStatistics from "@/pages/admin/homepage/statistics";
import AdminHomepageSolutions from "@/pages/admin/homepage/solutions";
import AdminSolutions from "@/pages/admin/solutions";
import AdminSectors from "@/pages/admin/sectors";
import AdminContent from "@/pages/admin/content";
import AdminCareers from "@/pages/admin/careers/index";
import AdminJobPositions from "@/pages/admin/careers/positions";
import CreateJobPosition from "@/pages/admin/careers/create";
import CareerContentManagement from "@/pages/admin/careers/content";
import AdminContact from "@/pages/admin/contact/index";
import AdminContactContent from "@/pages/admin/contact/content";
import AdminContactInfo from "@/pages/admin/contact/info";
import AdminLayout from "@/components/AdminLayout";

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/test-login" component={TestLogin} />
        <Route path="/admin">
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </Route>
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
            <BlogManagement />
          </AdminLayout>
        </Route>
        <Route path="/admin/blog/posts">
          <AdminLayout>
            <AdminBlogPosts />
          </AdminLayout>
        </Route>
        <Route path="/admin/blog/create">
          <AdminLayout>
            <CreateBlogPost />
          </AdminLayout>
        </Route>
        <Route path="/admin/blog/settings">
          <AdminLayout>
            <BlogSettings />
          </AdminLayout>
        </Route>
        <Route path="/admin/about">
          <AdminLayout>
            <AboutManagement />
          </AdminLayout>
        </Route>
        <Route path="/admin/about/content">
          <AdminLayout>
            <AdminAboutContent />
          </AdminLayout>
        </Route>
        <Route path="/admin/about/values">
          <AdminLayout>
            <AdminCompanyValues />
          </AdminLayout>
        </Route>
        <Route path="/admin/about/team">
          <AdminLayout>
            <AdminTeamPage />
          </AdminLayout>
        </Route>
        <Route path="/admin/about/stats">
          <AdminLayout>
            <AdminAboutStats />
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
        <Route path="/admin/careers">
          <AdminLayout>
            <AdminCareers />
          </AdminLayout>
        </Route>
        <Route path="/admin/careers/positions">
          <AdminLayout>
            <AdminJobPositions />
          </AdminLayout>
        </Route>
        <Route path="/admin/careers/positions/create">
          <AdminLayout>
            <CreateJobPosition />
          </AdminLayout>
        </Route>
        <Route path="/admin/careers/content">
          <AdminLayout>
            <CareerContentManagement />
          </AdminLayout>
        </Route>
        <Route path="/admin/contact">
          <AdminLayout>
            <AdminContact />
          </AdminLayout>
        </Route>
        <Route path="/admin/contact/content">
          <AdminLayout>
            <AdminContactContent />
          </AdminLayout>
        </Route>
        <Route path="/admin/contact/info">
          <AdminLayout>
            <AdminContactInfo />
          </AdminLayout>
        </Route>
        <Route path="/admin/content">
          <AdminLayout>
            <AdminContent />
          </AdminLayout>
        </Route>
        <Route path="/admin/references">
          <AdminLayout>
            <AdminReferences />
          </AdminLayout>
        </Route>
        <Route path="/admin/references/content">
          <AdminLayout>
            <AdminReferencesContent />
          </AdminLayout>
        </Route>
        <Route path="/admin/references/logos">
          <AdminLayout>
            <AdminReferencesLogos />
          </AdminLayout>
        </Route>
        <Route path="/admin/references/projects">
          <AdminLayout>
            <AdminReferencesProjects />
          </AdminLayout>
        </Route>
        <Route path="/admin/homepage">
          <AdminLayout>
            <AdminHomepage />
          </AdminLayout>
        </Route>
        <Route path="/admin/homepage/statistics">
          <AdminLayout>
            <AdminHomepageStatistics />
          </AdminLayout>
        </Route>
        <Route path="/admin/homepage/solutions">
          <AdminLayout>
            <AdminHomepageSolutions />
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
