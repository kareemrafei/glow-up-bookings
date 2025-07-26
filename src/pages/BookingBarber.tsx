import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const BookingBarber = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/booking")}
          className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold">Book a Barber</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-6xl mb-4">💈</CardTitle>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Pick a barber and a time slot.
            </p>
            <p className="text-muted-foreground">
              We're working hard to bring you the best barber booking experience. 
              Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingBarber;