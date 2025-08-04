import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, DollarSign } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      category: "Barber Services",
      icon: "💈",
      items: [
        { name: "Classic Haircut", duration: "30 min", price: "$25", description: "Traditional scissor cut with styling" },
        { name: "Beard Trim", duration: "20 min", price: "$15", description: "Professional beard shaping and trim" },
        { name: "Hair Wash & Style", duration: "45 min", price: "$30", description: "Complete wash, cut and styling service" },
        { name: "Buzz Cut", duration: "15 min", price: "$20", description: "Quick and clean clipper cut" }
      ]
    },
    {
      category: "Nail Services", 
      icon: "💅",
      items: [
        { name: "Classic Manicure", duration: "45 min", price: "$35", description: "Nail shaping, cuticle care and polish" },
        { name: "Gel Manicure", duration: "60 min", price: "$45", description: "Long-lasting gel polish application" },
        { name: "Pedicure", duration: "60 min", price: "$40", description: "Foot care with nail treatment and polish" },
        { name: "Nail Art", duration: "90 min", price: "$60", description: "Custom nail designs and artwork" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
        >
          ← Back to Home
        </Button>
        <h1 className="text-3xl font-bold">Our Services</h1>
        <p className="mt-2 opacity-90">Discover all the services we offer</p>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {services.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-2xl font-bold">{category.category}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((service, serviceIndex) => (
                <Card key={serviceIndex} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="text-lg font-semibold">
                        {service.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        Starting at {service.price}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => navigate("/booking")}
                    >
                      Book This Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;