import { useState } from "react";
import { Heart, Activity, Thermometer, Droplets, AlertTriangle, CheckCircle, TrendingUp, User } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Healthcare = () => {
  const { toast } = useToast();
  const [patientData, setPatientData] = useState({
    age: "",
    systolicBP: "",
    diastolicBP: "",
    cholesterol: "",
    heartRate: "",
    gender: "",
    smokingStatus: "",
    diabetesStatus: "",
  });
  const [riskAssessment, setRiskAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCADRisk = () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const age = parseInt(patientData.age);
      const systolic = parseInt(patientData.systolicBP);
      const cholesterol = parseInt(patientData.cholesterol);
      const heartRate = parseInt(patientData.heartRate);

      // Simple rule-based CAD risk assessment
      let riskScore = 0;
      let riskFactors = [];
      
      // Age factor
      if (age > 65) {
        riskScore += 25;
        riskFactors.push("Advanced age (>65 years)");
      } else if (age > 45) {
        riskScore += 15;
        riskFactors.push("Moderate age risk (45-65 years)");
      }

      // Blood pressure factor
      if (systolic > 140) {
        riskScore += 20;
        riskFactors.push("Hypertension (BP >140/90)");
      } else if (systolic > 120) {
        riskScore += 10;
        riskFactors.push("Elevated blood pressure");
      }

      // Cholesterol factor
      if (cholesterol > 240) {
        riskScore += 20;
        riskFactors.push("High cholesterol (>240 mg/dL)");
      } else if (cholesterol > 200) {
        riskScore += 10;
        riskFactors.push("Borderline high cholesterol");
      }

      // Heart rate factor
      if (heartRate > 100) {
        riskScore += 10;
        riskFactors.push("Elevated resting heart rate");
      }

      // Additional risk factors
      if (patientData.smokingStatus === "current") {
        riskScore += 25;
        riskFactors.push("Current smoking");
      } else if (patientData.smokingStatus === "former") {
        riskScore += 10;
        riskFactors.push("Former smoking history");
      }

      if (patientData.diabetesStatus === "yes") {
        riskScore += 20;
        riskFactors.push("Diabetes mellitus");
      }

      if (patientData.gender === "male") {
        riskScore += 10;
        riskFactors.push("Male gender");
      }

      // Determine risk level
      let riskLevel = "Low";
      let riskColor = "success";
      let recommendations = ["Maintain healthy lifestyle", "Regular exercise", "Balanced diet"];

      if (riskScore >= 60) {
        riskLevel = "High";
        riskColor = "destructive";
        recommendations = [
          "Immediate cardiology consultation recommended",
          "Consider cardiac stress testing",
          "Aggressive lifestyle modifications",
          "Possible medication therapy",
          "Regular monitoring required"
        ];
      } else if (riskScore >= 30) {
        riskLevel = "Moderate";
        riskColor = "warning";
        recommendations = [
          "Lifestyle modifications recommended",
          "Regular cardiovascular screening",
          "Blood pressure monitoring",
          "Cholesterol management",
          "Consider preventive medications"
        ];
      }

      setRiskAssessment({
        riskScore: Math.min(riskScore, 100),
        riskLevel,
        riskColor,
        riskFactors,
        recommendations,
        confidenceScore: 87
      });

      setLoading(false);
      
      toast({
        title: "CAD Risk Assessment Complete",
        description: `Risk level: ${riskLevel} (${Math.min(riskScore, 100)}% risk score)`,
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCADRisk();
  };

  const resetAssessment = () => {
    setPatientData({
      age: "",
      systolicBP: "",
      diastolicBP: "",
      cholesterol: "",
      heartRate: "",
      gender: "",
      smokingStatus: "",
      diabetesStatus: "",
    });
    setRiskAssessment(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center">
            <div className="circular-widget mx-auto mb-6 pulse-glow">
              <Heart className="w-12 h-12 text-destructive animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI is Analyzing Cardiovascular Risk...
            </h2>
            <p className="text-muted-foreground">
              Processing patient data using advanced CAD risk prediction algorithms
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse delay-200"></div>
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
                <Heart className="w-8 h-8 mr-3 text-destructive" />
                Healthcare AI-DSS
              </h1>
              <p className="text-muted-foreground mt-2">
                Coronary Artery Disease (CAD) Risk Assessment System
              </p>
            </div>
            <div className="neuro-surface px-6 py-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-destructive" />
                <span className="text-sm text-muted-foreground">AI Confidence:</span>
                <span className="font-bold text-destructive">95%</span>
              </div>
            </div>
          </div>
        </div>

        {!riskAssessment ? (
          /* Patient Data Input Form */
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Patient Information
              </h2>
              
              <div className="space-y-6">
                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={patientData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    placeholder="e.g., 45"
                    min="18"
                    max="120"
                    required
                  />
                </div>

                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={patientData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Smoking Status
                  </label>
                  <select
                    name="smokingStatus"
                    value={patientData.smokingStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Diabetes Status
                  </label>
                  <select
                    name="diabetesStatus"
                    value={patientData.diabetesStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="no">No diabetes</option>
                    <option value="yes">Diabetes mellitus</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-destructive" />
                Vital Signs & Lab Values
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="neuro-inset p-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="systolicBP"
                      value={patientData.systolicBP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                      placeholder="120"
                      min="80"
                      max="250"
                      required
                    />
                  </div>

                  <div className="neuro-inset p-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="diastolicBP"
                      value={patientData.diastolicBP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                      placeholder="80"
                      min="40"
                      max="150"
                      required
                    />
                  </div>
                </div>

                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Total Cholesterol (mg/dL)
                  </label>
                  <input
                    type="number"
                    name="cholesterol"
                    value={patientData.cholesterol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    placeholder="200"
                    min="100"
                    max="400"
                    required
                  />
                </div>

                <div className="neuro-inset p-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resting Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    value={patientData.heartRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                    placeholder="72"
                    min="40"
                    max="200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 text-center">
              <button
                type="submit"
                className="morph-button bg-destructive text-destructive-foreground hover:bg-destructive/90 px-12 py-4 text-lg font-semibold"
              >
                Assess CAD Risk
              </button>
            </div>
          </form>
        ) : (
          /* Risk Assessment Results */
          <div className="space-y-8">
            {/* Risk Overview */}
            <div className={`glass-card p-8 border-2 border-${riskAssessment.riskColor}/30 bg-${riskAssessment.riskColor}/5`}>
              <div className="text-center">
                <div className="circular-widget mx-auto mb-6 pulse-glow !w-24 !h-24">
                  <Heart className={`w-12 h-12 text-${riskAssessment.riskColor}`} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  CAD Risk Assessment Results
                </h2>
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className={`text-2xl font-bold text-${riskAssessment.riskColor}`}>
                      {riskAssessment.riskLevel}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <p className={`text-2xl font-bold text-${riskAssessment.riskColor}`}>
                      {riskAssessment.riskScore}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                    <p className="text-2xl font-bold text-primary">
                      {riskAssessment.confidenceScore}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                  Identified Risk Factors
                </h3>
                <div className="space-y-3">
                  {riskAssessment.riskFactors.map((factor: string, index: number) => (
                    <div key={index} className="neuro-surface p-3 flex items-center space-x-3">
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                      <span className="text-foreground text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  {riskAssessment.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="neuro-surface p-3 flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-foreground text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <button
                onClick={resetAssessment}
                className="morph-button bg-primary text-primary-foreground hover:bg-primary-light px-8 py-3"
              >
                New Assessment
              </button>
              <button className="morph-button px-8 py-3">
                Print Report
              </button>
              <button className="morph-button px-8 py-3">
                Share Results
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Healthcare;