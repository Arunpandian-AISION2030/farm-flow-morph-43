import { useState, useEffect } from "react";
import { Brain, Droplets, Bug, Leaf, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const mockRecommendations = [
    {
      id: 1,
      type: "irrigation",
      priority: "high",
      title: "Immediate Irrigation Required",
      description: "Soil moisture level (35%) is below optimal threshold. Recommend immediate irrigation to prevent crop stress.",
      action: "Apply 25mm of water within next 6 hours",
      impact: "Prevent 15-20% yield loss",
      icon: Droplets,
      color: "warning",
    },
    {
      id: 2,
      type: "fertilizer",
      priority: "medium",
      title: "Nitrogen Fertilizer Application",
      description: "Based on crop growth stage and soil analysis, apply nitrogen-rich fertilizer to boost plant development.",
      action: "Apply 120kg/hectare of urea fertilizer",
      impact: "Expected 10% increase in yield",
      icon: Leaf,
      color: "success",
    },
    {
      id: 3,
      type: "disease",
      priority: "high",
      title: "Potential Disease Detection",
      description: "Image analysis suggests early signs of leaf blight. Immediate preventive action recommended.",
      action: "Apply copper-based fungicide spray",
      impact: "Prevent disease spread to 80% of crop",
      icon: Bug,
      color: "destructive",
    },
    {
      id: 4,
      type: "weather",
      priority: "low",
      title: "Weather Advisory",
      description: "Rain expected in 3 days (15mm). Adjust irrigation schedule accordingly to optimize water usage.",
      action: "Delay next irrigation by 2 days",
      impact: "Save 20% water consumption",
      icon: Clock,
      color: "info",
    },
  ];

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "irrigation": return Droplets;
      case "fertilizer": return Leaf;
      case "disease": return Bug;
      case "weather": return Clock;
      default: return Brain;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "warning": return "border-warning/30 bg-warning/5 text-warning-foreground";
      case "success": return "border-success/30 bg-success/5 text-success-foreground";
      case "destructive": return "border-destructive/30 bg-destructive/5 text-destructive-foreground";
      default: return "border-primary/30 bg-primary/5 text-primary-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    const classes = {
      high: "bg-destructive text-destructive-foreground",
      medium: "bg-warning text-warning-foreground", 
      low: "bg-success text-success-foreground",
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes[priority as keyof typeof classes]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center">
            <div className="circular-widget mx-auto mb-6 pulse-glow">
              <Brain className="w-12 h-12 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI is Analyzing Your Farm Data...
            </h2>
            <p className="text-muted-foreground">
              Processing environmental conditions, crop data, and historical patterns 
              to generate personalized recommendations.
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Brain className="w-8 h-8 mr-3 text-primary" />
                AI Recommendations
              </h1>
              <p className="text-muted-foreground mt-2">
                Personalized farming insights based on your data analysis
              </p>
            </div>
            <div className="neuro-surface px-6 py-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Confidence Score:</span>
                <span className="font-bold text-success">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => {
            const Icon = getRecommendationIcon(rec.type);
            return (
              <div 
                key={rec.id} 
                className={`grid-morph border-2 ${getColorClasses(rec.color)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="circular-widget !w-16 !h-16">
                    <Icon className="w-8 h-8 text-current" />
                  </div>
                  {getPriorityBadge(rec.priority)}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {rec.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {rec.description}
                </p>

                <div className="space-y-3">
                  <div className="neuro-inset p-3">
                    <p className="text-xs text-muted-foreground mb-1">Recommended Action:</p>
                    <p className="text-sm font-medium text-foreground">{rec.action}</p>
                  </div>

                  <div className="neuro-inset p-3">
                    <p className="text-xs text-muted-foreground mb-1">Expected Impact:</p>
                    <p className="text-sm font-medium text-success">{rec.impact}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="morph-button flex-1 bg-primary text-primary-foreground hover:bg-primary-light">
                    Implement
                  </button>
                  <button className="morph-button px-4">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recommendation Summary</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="neuro-surface p-4 text-center">
              <p className="text-2xl font-bold text-destructive">2</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
            <div className="neuro-surface p-4 text-center">
              <p className="text-2xl font-bold text-warning">1</p>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </div>
            <div className="neuro-surface p-4 text-center">
              <p className="text-2xl font-bold text-success">1</p>
              <p className="text-sm text-muted-foreground">Low Priority</p>
            </div>
            <div className="neuro-surface p-4 text-center">
              <p className="text-2xl font-bold text-primary">25%</p>
              <p className="text-sm text-muted-foreground">Yield Increase</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;