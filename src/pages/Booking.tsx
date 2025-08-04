import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

const Booking = () => {
  const { salonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get('service');
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Mock data
  const salon = {
    name: "Reda's Premium Barbershop",
    service: { name: "Classic Haircut", price: 25, duration: "30 min" }
  };

  const availableTimes = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    
    // TODO: Save booking to Firebase
    const bookingData = {
      salonId,
      serviceId,
      date: selectedDate,
      time: selectedTime,
      salon: salon.name,
      service: salon.service
    };
    
    console.log("Booking created:", bookingData);
    navigate("/booking/confirmation", { state: bookingData });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
        >
          ← Back
        </Button>
        <h1 className="text-2xl font-bold">Book Your Appointment</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salon:</span>
                <span className="font-medium">{salon.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{salon.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{salon.service.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <Badge variant="secondary">${salon.service.price}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Select Time
            </CardTitle>
            <CardDescription>
              {selectedDate ? `Available times for ${selectedDate.toDateString()}` : "Please select a date first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                  className="h-12"
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confirm Booking */}
        <Button 
          onClick={handleBooking}
          className="w-full h-12 text-lg"
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Booking - ${salon.service.price}
        </Button>
      </div>
    </div>
  );
};

export default Booking;