import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Smart Farm AI Assistant. I can help explain recommendations, answer questions about farming practices, and provide guidance on crop management. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Agriculture-related responses
    if (lowerMessage.includes("irrigation") || lowerMessage.includes("water")) {
      return "For irrigation management, I recommend monitoring soil moisture levels regularly. Water when soil moisture drops below 30% for most crops. Consider drip irrigation for water efficiency and ensure proper drainage to prevent waterlogging.";
    }
    
    if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrient")) {
      return "Fertilizer application depends on your crop type and growth stage. For nitrogen-hungry crops like corn, apply 120-150kg/hectare of nitrogen. Always soil test first and follow the 4R principles: Right source, Right rate, Right time, Right place.";
    }
    
    if (lowerMessage.includes("disease") || lowerMessage.includes("pest")) {
      return "Early detection is key for disease and pest management. Look for yellowing leaves, spots, or unusual growth patterns. Implement integrated pest management (IPM) strategies including crop rotation, beneficial insects, and targeted treatments when necessary.";
    }
    
    if (lowerMessage.includes("soil") || lowerMessage.includes("ph")) {
      return "Soil health is fundamental to successful farming. Maintain soil pH between 6.0-7.0 for most crops. Regular soil testing helps determine nutrient needs. Consider cover crops and organic matter to improve soil structure and fertility.";
    }
    
    // Healthcare-related responses
    if (lowerMessage.includes("heart") || lowerMessage.includes("cardiovascular") || lowerMessage.includes("cad")) {
      return "Cardiovascular health assessment considers multiple risk factors including age, blood pressure, cholesterol levels, and lifestyle factors. Regular monitoring and preventive care are essential for maintaining heart health.";
    }
    
    if (lowerMessage.includes("blood pressure") || lowerMessage.includes("bp")) {
      return "Normal blood pressure is typically below 120/80 mmHg. Elevated readings may indicate hypertension, which is a significant risk factor for cardiovascular disease. Lifestyle modifications and regular monitoring are important.";
    }
    
    if (lowerMessage.includes("cholesterol")) {
      return "Total cholesterol levels should ideally be below 200 mg/dL. Higher levels increase cardiovascular risk. Diet, exercise, and sometimes medication can help manage cholesterol levels effectively.";
    }
    
    // General farming advice
    if (lowerMessage.includes("crop") || lowerMessage.includes("plant")) {
      return "Crop selection should consider your local climate, soil conditions, and market demand. Diversification can reduce risk and improve soil health. Always follow recommended planting dates and spacing for optimal yields.";
    }
    
    if (lowerMessage.includes("weather") || lowerMessage.includes("climate")) {
      return "Weather monitoring is crucial for farming decisions. Check forecasts regularly for irrigation, spraying, and harvesting timing. Climate-smart agriculture practices help adapt to changing weather patterns.";
    }
    
    if (lowerMessage.includes("yield") || lowerMessage.includes("production")) {
      return "Maximizing yield requires balancing multiple factors: proper nutrition, adequate water, pest control, and optimal growing conditions. Focus on soil health and precise timing of inputs for best results.";
    }
    
    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! I'm here to help with any agriculture or healthcare questions you have. Feel free to ask about specific crops, farming techniques, or health assessments anytime.";
    }
    
    // Default responses
    const defaultResponses = [
      "I'd be happy to help! Could you provide more specific details about your farming situation or health assessment needs?",
      "That's an interesting question! For the best advice, could you tell me more about your specific crop type, growing conditions, or health parameters?",
      "I can assist with both agricultural decision support and health risk assessments. What specific area would you like guidance on?",
      "Based on the data you've provided to the system, I can offer more targeted recommendations. What aspect would you like me to focus on?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 morph-button bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl z-50 pulse-glow"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
    }`}>
      <div className="glass-card h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="circular-widget !w-8 !h-8">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              {!isMinimized && (
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-muted rounded"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Minimize2 className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div className="circular-widget !w-6 !h-6 flex-shrink-0">
                      {message.sender === "user" ? (
                        <User className="w-3 h-3 text-primary" />
                      ) : (
                        <Bot className="w-3 h-3 text-primary" />
                      )}
                    </div>
                    <div
                      className={`neuro-surface p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="circular-widget !w-6 !h-6">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                    <div className="neuro-surface p-3 rounded-2xl bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming or health..."
                  className="flex-1 neuro-inset px-4 py-2 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-foreground text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="morph-button bg-primary text-primary-foreground p-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;