/**
 * Page: Landing
 * Description: Public landing page for SentiWiz
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Star,
  MessageSquare,
  BarChart4,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';

// --- HERO SECTION ---
const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[#1a2657] via-[#23294A] to-[#2E4670] py-20 px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80')] bg-cover bg-center"></div>
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-center justify-center mb-10">
        <img 
          src="/lovable-uploads/7c593e41-fc53-4f79-83cc-2986b4c8b503.png" 
          alt="SentiWiz Logo" 
          className="h-20 w-auto"
          style={{ background: "transparent" }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Understand Your Customers Like Never Before
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-foreground/80">
            AI-driven insights to grow your business
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link to="/signup">Get a Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-2">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80"
              alt="Dashboard Preview"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- PLATFORM ICONS SECTION ---
const PlatformIcons = () => {
  const platforms = [
    { name: 'Instagram', icon: Instagram, color: '#E1306C' },
    { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { name: 'Google Reviews', icon: Star, color: '#FFC107' },
    { name: 'Website', icon: Globe, color: '#4CAF50' }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#141b2e] via-[#222b43] to-[#1a2547]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p className="uppercase tracking-widest text-gray-300 font-semibold text-sm">
            Connected Platforms
          </p>
        </div>
        <div className="flex flex-wrap gap-6 justify-center items-end">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col items-center group"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 shadow-md hover:bg-white/20 transition-all duration-200">
                <platform.icon size={32} color={platform.color} strokeWidth={2} />
              </div>
              <span className="text-xs mt-2 text-gray-200 group-hover:text-white transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-md md:text-lg text-gray-200 font-light">
            Connect all your customer feedback channels in one powerful dashboard
          </p>
        </div>
      </div>
    </section>
  );
};

// --- BENEFITS SECTION ---
const BenefitCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    <div className="p-3 bg-primary/10 rounded-full mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const Benefits = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose SentiWiz?</h2>
        <p className="mt-4 text-xl text-gray-600">
          Powerful features to help you understand and act on customer feedback
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <BenefitCard
          icon={Globe}
          title="Multilingual Support"
          description="Analyze customer feedback in multiple languages with accurate sentiment detection."
        />
        <BenefitCard
          icon={BarChart4}
          title="Real-Time Visuals"
          description="Get real-time sentiment analysis results with intuitive visualizations."
        />
        <BenefitCard
          icon={CheckCircle}
          title="Plug & Play Setup"
          description="Easy to set up with no technical skills required. Connect platforms in minutes."
        />
        <BenefitCard
          icon={Star}
          title="Privacy-Focused"
          description="Sentiment analysis that's secure and respects your customers' privacy."
        />
      </div>
    </div>
  </section>
);

// --- JOURNEY SECTION ---
const Journey = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/10 to-primary/10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-4 text-xl text-gray-600">
          From feedback collection to actionable insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { 
            icon: MessageSquare, 
            title: "Collect Feedback", 
            description: "Connect your platforms and automatically gather customer feedback." 
          },
          { 
            icon: BarChart4, 
            title: "Analyze Sentiment", 
            description: "Our AI analyzes the sentiment and emotion behind every message." 
          },
          { 
            icon: CheckCircle, 
            title: "Visualize Data", 
            description: "View comprehensive dashboards showing sentiment trends and patterns." 
          },
          { 
            icon: Star, 
            title: "Take Action", 
            description: "Get actionable insights to improve customer satisfaction." 
          }
        ].map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gray-200 hidden md:block"></div>
            <div className="z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md border border-gray-100 mb-4">
              <step.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- CTA SECTION ---
const CTA = () => (
  <section className="bg-primary py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white">Ready to understand your customers better?</h2>
      <p className="mt-4 text-xl text-primary-foreground/80">
        Join thousands of businesses that use SentiWiz to improve customer satisfaction.
      </p>
      <div className="mt-10">
        <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
          <Link to="/signup">Get Started Free</Link>
        </Button>
      </div>
    </div>
  </section>
);

// --- FOOTER SECTION ---
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">SentiWiz</h3>
        <p className="text-gray-400">AI-powered sentiment analysis for better business decisions.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Product</h3>
        <ul className="space-y-2">
          <li><Link to="#" className="text-gray-400 hover:text-white">Features</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Integrations</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          <li><Link to="#" className="text-gray-400 hover:text-white">Documentation</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Guides</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Support</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Company</h3>
        <ul className="space-y-2">
          <li><Link to="#" className="text-gray-400 hover:text-white">About Us</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Blog</Link></li>
          <li><Link to="#" className="text-gray-400 hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center">
      <p className="text-gray-400">&copy; {new Date().getFullYear()} SentiWiz. All rights reserved.</p>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Benefits />
      <PlatformIcons />
      <Journey />
      <CTA />
      <Footer />
    </div>
  );
}
