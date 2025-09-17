import { useState } from "react";
import { Upload, Camera, Droplets, Thermometer, Wind, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const InputData = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    soilMoisture: "",
    temperature: "",
    humidity: "",
    cropType: "",
    farmArea: "",
    location: "",
    soilPH: "",
    rainfall: "",
    cropStage: "",
    pestHistory: "",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate data processing
    toast({
      title: "Data Submitted Successfully!",
      description: "Your farm data has been processed. Check the AI recommendations.",
    });
    
    // Reset form
    setFormData({
      soilMoisture: "",
      temperature: "",
      humidity: "",
      cropType: "",
      farmArea: "",
      location: "",
      soilPH: "",
      rainfall: "",
      cropStage: "",
      pestHistory: "",
    });
    setUploadedImage(null);
  };

  const cropTypes = [
    "Corn", "Wheat", "Soybeans", "Rice", "Cotton", "Tomatoes", "Potatoes", "Carrots",
    "Barley", "Oats", "Sugarcane", "Sunflower", "Canola", "Sorghum", "Millet",
    "Lettuce", "Cabbage", "Onions", "Peppers", "Cucumber", "Spinach", "Broccoli"
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-card p-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Input Farm Data</h1>
          <p className="text-muted-foreground">
            Provide your farm conditions and crop information for AI-powered analysis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          {/* Sensor Data Section */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-primary" />
              Environmental Conditions
            </h2>
            
            <div className="space-y-6">
              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Droplets className="w-4 h-4 inline mr-1" />
                  Soil Moisture (%)
                </label>
                <input
                  type="number"
                  name="soilMoisture"
                  value={formData.soilMoisture}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 35"
                  min="0"
                  max="100"
                />
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 25"
                  min="-10"
                  max="50"
                />
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Wind className="w-4 h-4 inline mr-1" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 65"
                  min="0"
                  max="100"
                />
              </div>
            </div>
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Soil pH Level
                </label>
                <input
                  type="number"
                  name="soilPH"
                  value={formData.soilPH}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 6.5"
                  min="3"
                  max="10"
                  step="0.1"
                />
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Recent Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 25"
                  min="0"
                  max="500"
                />
              </div>

          {/* Crop Information Section */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary" />
              Crop Information
            </h2>
            
            <div className="space-y-6">
              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Crop Type
                </label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                >
                  <option value="">Select crop type</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Farm Area (hectares)
                </label>
                <input
                  type="number"
                  name="farmArea"
                  value={formData.farmArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., 10"
                  min="0.1"
                  step="0.1"
                />
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                  placeholder="e.g., Iowa, USA"
                />
              </div>
            </div>
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Crop Growth Stage
                </label>
                <select
                  name="cropStage"
                  value={formData.cropStage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                >
                  <option value="">Select growth stage</option>
                  <option value="seedling">Seedling</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting/Grain Filling</option>
                  <option value="maturity">Maturity</option>
                </select>
              </div>

              <div className="neuro-inset p-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pest/Disease History
                </label>
                <select
                  name="pestHistory"
                  value={formData.pestHistory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground"
                >
                  <option value="">Select pest history</option>
                  <option value="none">No previous issues</option>
                  <option value="minor">Minor pest activity</option>
                  <option value="moderate">Moderate pest/disease</option>
                  <option value="severe">Severe infestations</option>
                </select>
              </div>

          {/* Image Upload Section */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-primary" />
                Crop Image Analysis
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="neuro-inset p-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="crop-image"
                  />
                  <label 
                    htmlFor="crop-image"
                    className="cursor-pointer block text-center"
                  >
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 hover:border-primary/50 transition-colors">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-foreground font-medium">Upload Crop Image</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Click to select an image for disease detection
                      </p>
                    </div>
                  </label>
                </div>

                {uploadedImage && (
                  <div className="neuro-surface p-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded crop" 
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      Image ready for AI analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 text-center">
            <button
              type="submit"
              className="morph-button bg-primary text-primary-foreground hover:bg-primary-light px-12 py-4 text-lg font-semibold"
            >
              Analyze Data & Get Recommendations
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default InputData;