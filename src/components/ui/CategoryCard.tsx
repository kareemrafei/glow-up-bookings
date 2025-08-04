import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

const CategoryCard = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl mb-2">💈</CardTitle>
          <CardTitle>Barber Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-center">
            Haircuts, beard trims, styling and more
          </p>
          <Button className="w-full" onClick={() => navigate("/booking/barber")}>
            Book Barber
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl mb-2">💅</CardTitle>
          <CardTitle>Nail Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-center">
            Manicures, pedicures, nail art and treatments
          </p>
          <Button className="w-full" onClick={() => navigate("/booking/nails")}>
            Book Nail Artist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCard;
