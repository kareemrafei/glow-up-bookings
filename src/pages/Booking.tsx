import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { useBookings } from "../hooks/useBookings";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

const Booking = () => {
  const { salonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get('service');
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [salon, setSalon] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const { createBooking } = useBookings();
  const { user } = useAuth();

  useEffect(() => {
    if (salonId) {
      fetchSalonAndService();
    }
  }, [salonId, serviceId]);

  useEffect(() => {
    if (selectedDate && serviceId && salonId) {
      fetchAvailableSlots();
    }
  }, [selectedDate, serviceId, salonId]);

  const fetchSalonAndService = async () => {
    try {
      // Fetch salon
      const { data: salonData, error: salonError } = await supabase
        .from('salons')
        .select('*')
        .eq('id', salonId)
        .single();

      if (salonError) throw salonError;
      setSalon(salonData);

      // Fetch service if serviceId is provided
      if (serviceId) {
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('id', serviceId)
          .single();

        if (serviceError) throw serviceError;
        setService(serviceData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data
      setSalon({
        name: "Reda's Premium Barbershop",
        address: "123 Main St"
      });
      setService({
        name: "Classic Haircut",
        price: 25,
        duration_minutes: 30
      });
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDate || !serviceId || !salonId) return;
    
    setLoadingSlots(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      
      // Get existing bookings for the date
      const { data: existingBookings, error } = await supabase
        .from('bookings')
        .select('appointment_time')
        .eq('salon_id', salonId)
        .eq('appointment_date', dateString)
        .neq('status', 'cancelled');

      if (error) throw error;

      // Generate all possible time slots
      const allSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30"
      ];

      // Filter out booked slots
      const bookedTimes = existingBookings?.map(b => b.appointment_time) || [];
      const available = allSlots.filter(slot => !bookedTimes.includes(slot));
      
      setAvailableTimes(available);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      // Fallback to default slots
      setAvailableTimes([
        "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30"
      ]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !user || !salonId || !serviceId) {
      if (!user) {
        navigate('/login');
        return;
      }
      alert("Please select both date and time");
      return;
    }
    
    try {
      const bookingData = {
        client_id: user.id,
        salon_id: salonId,
        service_id: serviceId,
        appointment_date: selectedDate.toISOString().split('T')[0],
        appointment_time: selectedTime,
        total_price: service?.price || 25,
        status: 'pending' as const,
        payment_status: 'pending' as const
      };
      
      const booking = await createBooking(bookingData);
      
      navigate("/booking/confirmation", { 
        state: {
          ...booking,
          salon: salon,
          service: service
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (!salon || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{service.duration_minutes} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <Badge variant="secondary">${service.price}</Badge>
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
            {loadingSlots ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading available times...</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      disabled={!selectedDate}
                      className="h-12"
                    >
                      {time}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-4 text-muted-foreground">
                    No available times for selected date
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Booking */}
        <Button 
          onClick={handleBooking}
          className="w-full h-12 text-lg"
          disabled={!selectedDate || !selectedTime || loadingSlots}
        >
          {!user ? 'Sign In to Book' : `Confirm Booking - $${service.price}`}
        </Button>
      </div>
    </div>
  );
};

export default Booking;