import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import SocialProofSection from './components/SocialProofSection';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/user-dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </div>
        </div>

        {/* Right Side - Social Proof */}
        <SocialProofSection />
      </div>
    </div>
  );
};

export default LoginPage;