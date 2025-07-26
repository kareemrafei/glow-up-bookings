import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, MapPin, Clock, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalonListing = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const salon = {
    id: "1",
    name: "Reda's Premium Barbershop",
    rating: 4.8,
    reviewCount: 127,
    location: "Tripoli, Lebanon",
    phone: "+961 70 123 456",
    hours: "10:00 AM - 9:00 PM",
    images: ["/placeholder.svg"],
    services: [
      { id: "1", name: "Classic Haircut", price: 25, duration: "30 min" },
      { id: "2", name: "Beard Trim", price: 15, duration: "20 min" },
      { id: "3", name: "Hair Wash & Style", price: 20, duration: "25 min" },
      { id: "4", name: "Full Service", price: 45, duration: "60 min" }
    ],
    reviews: [
      { id: "1", user: "Ahmad M.", rating: 5, comment: "Best barber in town! Reda is a true artist.", date: "2 days ago" },
      { id: "2", user: "Omar K.", rating: 5, comment: "Professional service, clean environment.", date: "1 week ago" },
      { id: "3", user: "Hassan L.", rating: 4, comment: "Great haircut, will definitely come back.", date: "2 weeks ago" }
    ]
  };

  const handleBookNow = () => {
    if (!selectedService) {
      alert("Please select a service first");
      return;
    }
    navigate(`/booking/${salon.id}?service=${selectedService}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold">{salon.name}</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Salon Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(salon.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{salon.rating}</span>
                  <span className="text-muted-foreground">({salon.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {salon.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {salon.hours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {salon.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Pricing</CardTitle>
            <CardDescription>Select a service to book</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {salon.services.map((service) => (
              <div 
                key={service.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedService === service.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <Badge variant="secondary">${service.price}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Book Button */}
        <Button 
          onClick={handleBookNow}
          className="w-full h-12 text-lg"
          disabled={!selectedService}
        >
          Book Now
        </Button>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salon.reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonListing;