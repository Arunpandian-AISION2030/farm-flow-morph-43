import { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock sensor data
  const sensorData = [
    {
      id: 1,
      name: "Soil Moisture",
      value: 42,
      unit: "%",
      icon: Droplets,
      status: "warning",
      threshold: "< 30% needs irrigation",
    },
    {
      id: 2,
      name: "Temperature",
      value: 28,
      unit: "°C",
      icon: Thermometer,
      status: "good",
      threshold: "Optimal range: 20-30°C",
    },
    {
      id: 3,
      name: "Humidity",
      value: 65,
      unit: "%",
      icon: Wind,
      status: "good",
      threshold: "Optimal range: 60-80%",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "info",
      message: "Field A irrigation scheduled for tomorrow morning",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Low soil moisture detected in Field B",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "success",
      message: "Pesticide application completed in Field C",
      time: "1 day ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success": return CheckCircle;
      case "warning": return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Real-time monitoring of your farm conditions
              </p>
            </div>
            <div className="neuro-inset px-6 py-3">
              <p className="text-sm text-muted-foreground">Current Time</p>
              <p className="text-lg font-mono text-foreground">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Sensor Widgets */}
        <div className="grid md:grid-cols-3 gap-6">
          {sensorData.map((sensor) => {
            const Icon = sensor.icon;
            return (
              <div key={sensor.id} className="grid-morph">
                <div className="flex items-center justify-between mb-4">
                  <div className="circular-widget pulse-glow">
                    <Icon className={`w-8 h-8 ${getStatusColor(sensor.status)}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">
                      {sensor.value}
                      <span className="text-lg text-muted-foreground ml-1">
                        {sensor.unit}
                      </span>
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {sensor.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {sensor.threshold}
                </p>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      sensor.status === 'good' ? 'bg-success' : 
                      sensor.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${Math.min(sensor.value, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Alerts & Notifications */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <div 
                    key={alert.id} 
                    className="neuro-surface p-4 flex items-start space-x-3 hover:scale-105 transition-all duration-300"
                  >
                    <AlertIcon className={`w-5 h-5 mt-1 ${
                      alert.type === 'success' ? 'text-success' :
                      alert.type === 'warning' ? 'text-warning' : 'text-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="morph-button text-center py-6">
                <Droplets className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Schedule Irrigation</span>
              </button>
              <button className="morph-button text-center py-6">
                <Thermometer className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Climate Control</span>
              </button>
              <button className="morph-button text-center py-6">
                <Wind className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Weather Forecast</span>
              </button>
              <button className="morph-button text-center py-6">
                <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Send Alert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;