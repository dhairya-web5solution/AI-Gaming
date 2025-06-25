import React from 'react';
import { Users, Target, Lightbulb, Award, Globe, Zap, Shield, Rocket } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "Ujjawal",
      role: "CEO & Co-Founder",
      image: "https://raw.githubusercontent.com/dhairya-web5solution/AI-Gaming/refs/heads/main/img/ujjawal.jpeg",
      bio: "Former Google AI researcher with 10+ years in gaming and blockchain",
      linkedin: "#"
    },
    {
      name: "Dhairya Patel",
      role: "CTO & Co-Founder",
      image: "https://raw.githubusercontent.com/dhairya-web5solution/AI-Gaming/refs/heads/main/img/dhairya.png",
      bio: "Ex-Ethereum core developer, expert in DeFi protocols and smart contracts",
      linkedin: "#"
    },
    {
      name: "Sarvesh Tiwari",
      role: "Blockchain Development Director",
      image: "https://raw.githubusercontent.com/dhairya-web5solution/AI-Gaming/refs/heads/main/img/sarvesh.png",
      bio: "Former Ubisoft lead designer with 15+ years in AAA game development",
      linkedin: "#"
    },
    {
      name: "Awani Pandey",
      role: "Business Development Director",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "PhD in Machine Learning from MIT, specialized in gaming AI and NLP",
      linkedin: "#"
    }
  ];

  const milestones = [
    { year: "2023", title: "Platform Launch", description: "Initial release with 5 games and basic DeFi features" },
    { year: "2024", title: "AI Integration", description: "Launched AI-powered NPCs and game assistants" },
    { year: "2024", title: "Cross-Chain Support", description: "Enabled multi-chain rewards and asset portability" },
    { year: "2025", title: "Mobile Launch", description: "Released mobile app for iOS and Android" },
    { year: "2025", title: "Creator Hub", description: "Launched GameFi SDK for third-party developers" },
    { year: "2026", title: "Global Expansion", description: "Planned expansion to 50+ countries with localization" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize user security with advanced encryption, smart contract audits, and KYC-free privacy-preserving solutions."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Building an inclusive platform that serves gamers worldwide, regardless of location or economic background."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries with AI integration, cross-chain technology, and next-generation gaming experiences."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our governance DAO ensures the community has a voice in platform development and decision-making."
    }
  ];

  const handleJoinMission = () => {
    console.log('Joining mission - redirecting to signup...');
    // In production, this would redirect to signup or contact form
  };

  const handleViewWhitepaper = () => {
    console.log('Opening whitepaper...');
    // In production, this would download or open the whitepaper PDF
  };

  const handlePartnerWithUs = () => {
    console.log('Opening partnership form...');
    // In production, this would open a partnership inquiry form
  };

  const handleContactTeam = () => {
    console.log('Opening contact form...');
    // In production, this would open a contact form or email client
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About AI Gaming
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're revolutionizing the gaming industry by combining artificial intelligence, 
            decentralized finance, and immersive gameplay to create the future of interactive entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleJoinMission}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Join Our Mission
            </button>
            <button 
              onClick={handleViewWhitepaper}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              View Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To democratize gaming rewards and create sustainable economic opportunities for players worldwide. 
                We believe gaming should be more than entertainment—it should be a pathway to financial empowerment 
                through skill, strategy, and community participation.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To build the world's largest AI-powered gaming ecosystem where players, creators, and stakeholders 
                collaborate in a decentralized economy. We envision a future where gaming transcends borders, 
                creating global communities united by shared experiences and mutual prosperity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-center">
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400">The visionaries building the future of gaming</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-purple-500 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-purple-500"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`;
                  }}
                />
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">Key milestones in our mission to revolutionize gaming</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                      <div className="text-purple-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">125K+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</div>
              <div className="text-gray-400">Rewards Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">47</div>
              <div className="text-gray-400">Games Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">15</div>
              <div className="text-gray-400">Supported Chains</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the future of gaming. Connect with our team, explore partnership opportunities, 
            or start your journey as a player today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePartnerWithUs}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Partner With Us
            </button>
            <button 
              onClick={handleContactTeam}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Contact Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}