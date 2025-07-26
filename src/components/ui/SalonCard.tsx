import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Star, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Salon {
  id: string;
  name: string;
  location: string;
  hours: string;
  rating: number;
  reviewCount: number;
  services: string[];
  price: string;
}

interface SalonCardProps {
  salon: Salon;
}

const SalonCard = ({ salon }: SalonCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{salon.name}</CardTitle>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(salon.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{salon.rating}</span>
              <span className="text-sm text-muted-foreground">({salon.reviewCount})</span>
            </div>
          </div>
          <Badge variant="secondary">{salon.price}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {salon.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {salon.hours}
          </div>
          <div className="text-sm text-muted-foreground">
            Services: {salon.services.join(", ")}
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={() => navigate(`/salon/${salon.id}`)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
