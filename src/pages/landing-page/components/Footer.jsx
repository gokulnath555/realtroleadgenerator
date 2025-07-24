import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Documentation", href: "#" },
      { label: "Integrations", href: "#" }
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" }
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
      { label: "System Status", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">Realtroleads</span>
              </Link>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Streamline your real estate lead generation with our automated platform. Trusted by 500+ professionals nationwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-300">support@realtroleads.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-300">1-800-LEADS-24</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-300">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-lg hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Product */}
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-slate-300">
                Get the latest updates on new features and real estate insights.
              </p>
            </div>
            
            <div className="flex w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-400">
              © {currentYear} Realtroleads. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} className="text-success" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;