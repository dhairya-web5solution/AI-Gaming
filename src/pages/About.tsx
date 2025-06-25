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

  const achievements = [
    { metric: "125K+", label: "Active Players", icon: Users },
    { metric: "$2.5M+", label: "Rewards Distributed", icon: Award },
    { metric: "47", label: "Games Available", icon: Rocket },
    { metric: "15", label: "Supported Chains", icon: Globe }
  ];

  const handleJoinMission = () => {
    console.log('Joining mission - redirecting to signup...');
    window.location.href = '/signup';
  };

  const handleViewWhitepaper = () => {
    console.log('Opening whitepaper...');
    // In production, this would download or open the whitepaper PDF
    alert('Opening whitepaper... This would download or open the whitepaper PDF.');
  };

  const handlePartnerWithUs = () => {
    console.log('Opening partnership form...');
    // In production, this would open a partnership inquiry form
    alert('Opening partnership form... This would open a partnership inquiry form.');
  };

  const handleContactTeam = () => {
    console.log('Opening contact form...');
    // In production, this would open a contact form or email client
    alert('Opening contact form... This would open a contact form or email client.');
  };

  const handleLinkedInClick = (memberName: string) => {
    console.log(`Opening ${memberName}'s LinkedIn profile...`);
    // In production, this would open the actual LinkedIn profile
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-indigo-900/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Revolutionizing Gaming Since 2023</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            About 
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"> AI Gaming</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            We're revolutionizing the gaming industry by combining artificial intelligence, 
            decentralized finance, and immersive gameplay to create the future of interactive entertainment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleJoinMission}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              Join Our Mission
            </button>
            <button 
              onClick={handleViewWhitepaper}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              View Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:text-purple-300 transition-colors" />
                    <div className="text-3xl font-bold text-white mb-2">{achievement.metric}</div>
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{achievement.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To democratize gaming rewards and create sustainable economic opportunities for players worldwide. 
                We believe gaming should be more than entertainment—it should be a pathway to financial empowerment 
                through skill, strategy, and community participation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 mr-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
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
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 text-center group backdrop-blur-sm">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-4 w-fit mx-auto mb-6 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">{value.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">The visionaries building the future of gaming</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 text-center group backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-br from-purple-500 to-blue-500 p-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover bg-gray-700"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`;
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-4 group-hover:text-purple-300 transition-colors">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors leading-relaxed">{member.bio}</p>
                
                <button
                  onClick={() => handleLinkedInClick(member.name)}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  View LinkedIn →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Key milestones in our mission to revolutionize gaming</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
                      <div className="text-purple-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-4 border-gray-900 shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-indigo-900/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Be part of the future of gaming. Connect with our team, explore partnership opportunities, 
            or start your journey as a player today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePartnerWithUs}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              Partner With Us
            </button>
            <button 
              onClick={handleContactTeam}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Contact Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}