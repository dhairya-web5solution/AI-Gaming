import React, { useState } from 'react';
import { Twitter, Github, Disc as Discord, Instagram as Telegram, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/aigaming', label: 'Twitter' },
    { icon: Discord, href: 'https://discord.gg/aigaming', label: 'Discord' },
    { icon: Telegram, href: 'https://t.me/aigaming', label: 'Telegram' },
    { icon: Github, href: 'https://github.com/aigaming', label: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@aigaming.com', label: 'Email' }
  ];

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Games', href: '#games', isInternal: true },
        { name: 'Marketplace', href: '#marketplace', isInternal: true },
        { name: 'Staking', href: '#staking', isInternal: true },
        { name: 'Tournaments', href: '#tournaments', isInternal: true },
        { name: 'Analytics', href: '#analytics', isInternal: true }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: 'https://docs.aigaming.com', isInternal: false },
        { name: 'API Reference', href: 'https://api.aigaming.com', isInternal: false },
        { name: 'Whitepaper', href: '/whitepaper.pdf', isInternal: false },
        { name: 'Roadmap', href: '/roadmap', isInternal: true },
        { name: 'Blog', href: 'https://blog.aigaming.com', isInternal: false }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: 'https://help.aigaming.com', isInternal: false },
        { name: 'Contact Us', href: 'mailto:support@aigaming.com', isInternal: false },
        { name: 'Bug Reports', href: 'https://github.com/aigaming/issues', isInternal: false },
        { name: 'Feature Requests', href: 'https://feedback.aigaming.com', isInternal: false },
        { name: 'Community', href: 'https://community.aigaming.com', isInternal: false }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms', isInternal: true },
        { name: 'Privacy Policy', href: '/privacy', isInternal: true },
        { name: 'Cookie Policy', href: '/cookies', isInternal: true },
        { name: 'Disclaimer', href: '/disclaimer', isInternal: true },
        { name: 'Compliance', href: '/compliance', isInternal: true }
      ]
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      alert(`Thank you for subscribing with ${email}!`);
      setEmail('');
      // In production, this would send the email to your backend
    }
  };

  const handleLinkClick = (link: any) => {
    if (link.isInternal && link.href.startsWith('#')) {
      // Scroll to section
      const element = document.getElementById(link.href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.isInternal) {
      // Handle internal navigation
      window.location.href = link.href;
    } else {
      // Open external link
      window.open(link.href, '_blank');
    }
  };

  const handleSocialClick = (href: string) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <span className="text-white font-bold text-xl">AI Gaming</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              The future of gaming is here. Experience AI-powered gameplay, earn real rewards, and join the revolution of decentralized gaming.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.href)}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group text-left"
                    >
                      {link.name}
                      {!link.isInternal && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest news, updates, and exclusive offers.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-3 rounded-l-lg border border-gray-600 focus:border-purple-500 focus:outline-none flex-1 md:w-64"
                required
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-r-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 AI Gaming Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-gray-400">Built with</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-400">React</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-400">Blockchain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-400">AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}