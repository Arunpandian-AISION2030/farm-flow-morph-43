import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Brain, BarChart3, Shield, Heart, GraduationCap, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-farm.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Agriculture DSS",
      description: "Intelligent recommendations for crop management, irrigation, and pest control using advanced algorithms.",
    },
    {
      icon: Heart,
      title: "Healthcare Risk Assessment",
      description: "CAD risk prediction using patient vitals and lifestyle factors with rule-based AI logic.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Interactive dashboards with glassmorphism UI and morphing data visualizations.",
    },
    {
      icon: Shield,
      title: "Decision Support System",
      description: "Evidence-based recommendations following AI-DSS principles and best practices.",
    },
  ];

  const academicInfo = {
    name: "Arun Pandian P",
    regNo: "720522243009",
    course: "AI3021 - IT in Agricultural Engineering",
    department: "Artificial Intelligence and Data Science",
    year: "IV-Year",
    title: "Artificial Intelligence in Decision Support System (AI-DSS)"
  };

  const references = [
    "Yousaf et al., 2022 – AI DSS in Agriculture",
    "Nautiyal et al., 2025 – AI Tools in Agriculture", 
    "Asolo et al., 2024 – AI Chatbot for Sustainable Farming",
    "Setiawan et al., 2007 – Fuzzy DSS for CAD diagnosis",
    "Zhai et al., 2020 – Agriculture 4.0 DSS"
  ];

  return (
    <Layout>
      {/* Academic Header */}
      <section className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="circular-widget pulse-glow">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{academicInfo.title}</h2>
              <p className="text-muted-foreground">Course Project Demonstration</p>
            </div>
          </div>
          <div className="neuro-surface p-4 text-right">
            <p className="text-sm text-muted-foreground">Student</p>
            <p className="font-semibold text-foreground">{academicInfo.name}</p>
            <p className="text-xs text-muted-foreground">{academicInfo.regNo}</p>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-4 text-center">
          <div className="neuro-inset p-3">
            <p className="text-xs text-muted-foreground">Course</p>
            <p className="font-medium text-foreground">{academicInfo.course}</p>
          </div>
          <div className="neuro-inset p-3">
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{academicInfo.department}</p>
          </div>
          <div className="neuro-inset p-3">
            <p className="text-xs text-muted-foreground">Academic Year</p>
            <p className="font-medium text-foreground">{academicInfo.year}</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mb-12">
        <div className="glass-card p-0 relative">
          <img 
            src={heroImage} 
            alt="Smart Farm Technology" 
            className="w-full h-96 object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 rounded-3xl flex items-center">
            <div className="px-12 py-16 text-white">
              <h1 className="text-5xl font-bold mb-6 float-animation">
                AI Decision Support System
              </h1>
              <p className="text-xl mb-8 max-w-lg opacity-90">
                Comprehensive AI-DSS implementation for Agriculture and Healthcare domains,
                featuring intelligent decision support, real-time monitoring, and interactive visualizations.
              </p>
              <Link to="/dashboard">
                <button className="morph-button bg-white text-primary hover:bg-white/90 flex items-center space-x-2 text-lg px-8 py-4">
                  <span>Explore Agriculture DSS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI-DSS Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          AI Decision Support System Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="grid-morph expand-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="circular-widget mx-auto mb-4 pulse-glow">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Domain Applications */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Domain Applications
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
            <div className="circular-widget mb-6 pulse-glow">
              <Sprout className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Agriculture DSS</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• Soil moisture and environmental monitoring</li>
              <li>• Intelligent irrigation scheduling</li>
              <li>• Crop disease detection and prevention</li>
              <li>• Fertilizer optimization recommendations</li>
              <li>• Yield prediction and planning</li>
            </ul>
            <Link to="/dashboard">
              <button className="morph-button bg-success text-success-foreground w-full">
                Access Agriculture DSS
              </button>
            </Link>
          </div>

          <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
            <div className="circular-widget mb-6 pulse-glow">
              <Heart className="w-12 h-12 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Healthcare DSS</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• CAD risk assessment algorithms</li>
              <li>• Patient vital signs analysis</li>
              <li>• Risk factor identification</li>
              <li>• Personalized health recommendations</li>
              <li>• Preventive care guidance</li>
            </ul>
            <Link to="/healthcare">
              <button className="morph-button bg-destructive text-destructive-foreground w-full">
                Access Healthcare DSS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="mb-12">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-3 text-primary" />
            Technical Implementation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="neuro-surface p-4">
              <h4 className="font-semibold text-foreground mb-2">AI Algorithms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rule-based decision trees</li>
                <li>• Pattern recognition</li>
                <li>• Risk scoring algorithms</li>
                <li>• Predictive analytics</li>
              </ul>
            </div>
            <div className="neuro-surface p-4">
              <h4 className="font-semibold text-foreground mb-2">UI/UX Design</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Glassmorphism effects</li>
                <li>• Neumorphic surfaces</li>
                <li>• Morphing animations</li>
                <li>• Interactive visualizations</li>
              </ul>
            </div>
            <div className="neuro-surface p-4">
              <h4 className="font-semibold text-foreground mb-2">Technology Stack</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Recharts for analytics</li>
                <li>• Modern web standards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic References */}
      <section className="mb-12">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-primary" />
            Academic References
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {references.map((ref, index) => (
              <div key={index} className="neuro-surface p-4 flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <p className="text-sm text-foreground">{ref}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 neuro-inset p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Project Focus:</strong> This implementation demonstrates AI-DSS principles 
              in agriculture and healthcare domains, showcasing decision support algorithms, 
              interactive visualizations, and intelligent recommendation systems as discussed 
              in current literature on AI applications in these critical sectors.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="glass-card p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Explore the AI Decision Support System
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Experience the comprehensive AI-DSS implementation with interactive dashboards, 
            intelligent recommendations, and advanced analytics for both agriculture and healthcare domains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/input">
              <button className="morph-button bg-primary text-primary-foreground hover:bg-primary-light px-8 py-4 text-lg">
                Start Data Input
              </button>
            </Link>
            <Link to="/insights">
              <button className="morph-button px-8 py-4 text-lg">
                View Analytics Demo
              </button>
            </Link>
            <Link to="/recommendations">
              <button className="morph-button px-8 py-4 text-lg">
                AI Recommendations
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;