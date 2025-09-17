import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";
import { TrendingUp, Droplets, Thermometer, Leaf, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

const Insights = () => {
  const [activeChart, setActiveChart] = useState("moisture");

  // Mock data for charts
  const moistureData = [
    { name: "Week 1", moisture: 45, optimal: 60 },
    { name: "Week 2", moisture: 38, optimal: 60 },
    { name: "Week 3", moisture: 52, optimal: 60 },
    { name: "Week 4", moisture: 35, optimal: 60 },
    { name: "Week 5", moisture: 48, optimal: 60 },
    { name: "Week 6", moisture: 42, optimal: 60 },
  ];

  const temperatureData = [
    { name: "Mon", temp: 22, humidity: 65 },
    { name: "Tue", temp: 25, humidity: 60 },
    { name: "Wed", temp: 28, humidity: 55 },
    { name: "Thu", temp: 30, humidity: 50 },
    { name: "Fri", temp: 27, humidity: 58 },
    { name: "Sat", temp: 24, humidity: 62 },
    { name: "Sun", temp: 26, humidity: 59 },
  ];

  const cropHealthData = [
    { name: "Healthy", value: 75, color: "#22c55e" },
    { name: "At Risk", value: 20, color: "#f59e0b" },
    { name: "Disease", value: 5, color: "#ef4444" },
  ];

  const yieldPrediction = [
    { name: "Corn", predicted: 85, current: 78 },
    { name: "Wheat", predicted: 92, current: 88 },
    { name: "Soybeans", predicted: 78, current: 75 },
  ];

  const performanceMetrics = [
    {
      title: "Water Efficiency",
      value: 87,
      icon: Droplets,
      color: "text-blue-500",
      trend: "+12%",
    },
    {
      title: "Temperature Control",
      value: 93,
      icon: Thermometer,
      color: "text-orange-500",
      trend: "+5%",
    },
    {
      title: "Crop Health Score",
      value: 89,
      icon: Leaf,
      color: "text-green-500",
      trend: "+8%",
    },
    {
      title: "Overall Performance",
      value: 91,
      icon: TrendingUp,
      color: "text-primary",
      trend: "+15%",
    },
  ];

  const chartOptions = [
    { key: "moisture", label: "Soil Moisture Trends", icon: Droplets },
    { key: "temperature", label: "Weather Patterns", icon: Thermometer },
    { key: "health", label: "Crop Health Analysis", icon: Leaf },
    { key: "yield", label: "Yield Predictions", icon: TrendingUp },
  ];

  const renderChart = () => {
    switch (activeChart) {
      case "moisture":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moistureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--glass-bg))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="moisture" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                stroke="hsl(var(--success))" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "temperature":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--glass-bg))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="temp" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="humidity" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "health":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropHealthData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {cropHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case "yield":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yieldPrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--glass-bg))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="current" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-card p-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-primary" />
            Visual Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Interactive charts and analytics for data-driven farming decisions
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index} 
                className="grid-morph text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="circular-widget mx-auto mb-4 pulse-glow">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {metric.title}
                </h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  {metric.value}%
                </div>
                <div className="text-sm text-success font-medium">
                  {metric.trend} from last month
                </div>
                
                {/* Progress Circle */}
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={80}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" data={[{ value: metric.value }]}>
                      <RadialBar dataKey="value" fill="hsl(var(--primary))" />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Charts */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 lg:mb-0">
              Interactive Analytics
            </h2>
            <div className="flex flex-wrap gap-2">
              {chartOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    onClick={() => setActiveChart(option.key)}
                    className={`morph-button flex items-center space-x-2 ${
                      activeChart === option.key 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="neuro-inset p-6 rounded-3xl">
            {renderChart()}
          </div>
        </div>

        {/* Insights Summary */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Weekly Summary
            </h3>
            <div className="space-y-3">
              <div className="neuro-surface p-3 flex justify-between">
                <span className="text-muted-foreground">Avg. Moisture</span>
                <span className="font-semibold text-foreground">43%</span>
              </div>
              <div className="neuro-surface p-3 flex justify-between">
                <span className="text-muted-foreground">Avg. Temperature</span>
                <span className="font-semibold text-foreground">26°C</span>
              </div>
              <div className="neuro-surface p-3 flex justify-between">
                <span className="text-muted-foreground">Irrigation Events</span>
                <span className="font-semibold text-foreground">3</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Key Insights
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-success/10 border border-success/20 rounded-xl">
                <p className="text-success-foreground">
                  Optimal growing conditions maintained for 85% of the week
                </p>
              </div>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl">
                <p className="text-warning-foreground">
                  Two instances of low soil moisture detected
                </p>
              </div>
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-primary">
                  Predicted yield increase of 12% with current practices
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Next Actions
            </h3>
            <div className="space-y-3">
              <button className="morph-button w-full text-left p-3">
                Schedule irrigation for Field A
              </button>
              <button className="morph-button w-full text-left p-3">
                Apply fertilizer to Field B
              </button>
              <button className="morph-button w-full text-left p-3">
                Monitor disease in Field C
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;