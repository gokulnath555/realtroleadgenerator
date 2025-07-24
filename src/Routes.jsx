import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import Login from "pages/login";
import UserRegistration from "pages/user-registration";
import LeadGenerationForm from "pages/lead-generation-form";
import AccountManagement from "pages/account-management";
import UserDashboard from "pages/user-dashboard";
import TokenManagement from "pages/token-management";
import PublicLeadCaptureForm from "pages/public-lead-capture-form";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/lead-generation-form" element={<LeadGenerationForm />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/token-management" element={<TokenManagement />} />
        <Route path="/public-lead-capture-form" element={<PublicLeadCaptureForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;