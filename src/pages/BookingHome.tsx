import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const BookingHome = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold">Choose Your Service</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/booking/barber")}>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">💈</CardTitle>
            <CardTitle>Barber</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              Book a Barber
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/booking/nails")}>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl mb-2">💅</CardTitle>
            <CardTitle>Nails</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              Book a Nail Artist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingHome;