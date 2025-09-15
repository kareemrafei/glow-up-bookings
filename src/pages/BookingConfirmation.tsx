import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, CalendarDays, Clock, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as {
    id: string;
    salonName: string;
    service: { name: string; price: number; duration: string };
    dateISO: string;
    time: string;
  } | null;
  const { t } = useI18n();

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p>No booking data found. Please try again.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              {t("back_home")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8 pt-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">{t("booking_confirmed")}</h1>
          <p className="text-muted-foreground">{t("appointment_booked")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("booking_details")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{bookingData.salonName}</p>
                  <p className="text-sm text-muted-foreground">Barbershop</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{new Date(bookingData.dateISO).toDateString()}</p>
                  <p className="text-sm text-muted-foreground">{t("appointment_date")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{bookingData.time}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.service.duration}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{bookingData.service.name}</p>
                    <p className="text-sm text-muted-foreground">{t("service")}</p>
                  </div>
                  <p className="text-xl font-bold text-primary">{`$${bookingData.service.price}`}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-medium text-blue-900 mb-2">{t("whats_next")}</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t("youll_receive_email")}</li>
                <li>• {t("salon_may_reschedule")}</li>
                <li>• {t("arrive_early")}</li>
                <li>• {t("leave_review")}</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate("/dashboard")} className="flex-1">
              {t("view_my_bookings")}
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
              {t("book_another")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;