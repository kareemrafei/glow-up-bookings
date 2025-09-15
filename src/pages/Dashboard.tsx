import { useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { CalendarDays, Clock, MapPin, Star, Trophy, Share2, Upload } from "lucide-react";
import { getAppointments, deleteAppointment, Appointment } from "@/lib/appointments";
import { useI18n } from "@/lib/i18n";

const Dashboard = () => {
  const [userPoints] = useState(85);
  const { t } = useI18n();
  
  const allAppointments = useMemo(() => getAppointments(), [])
  const now = new Date()
  const upcomingBookings = allAppointments
    .filter((a) => new Date(a.dateISO) >= now)
    .map((a) => ({
      id: a.id,
      salon: a.salonName,
      service: a.service.name,
      date: new Date(a.dateISO).toISOString().slice(0, 10),
      time: a.time,
      price: a.service.price,
      status: "confirmed" as const,
    }))
  const pastBookings = allAppointments
    .filter((a) => new Date(a.dateISO) < now)
    .map((a) => ({
      id: a.id,
      salon: a.salonName,
      service: a.service.name,
      date: new Date(a.dateISO).toISOString().slice(0, 10),
      time: a.time,
      price: a.service.price,
      status: "completed" as const,
      canReview: true,
      hasPhoto: false,
    }))

  const handleCancelBooking = (bookingId: string) => {
    deleteAppointment(bookingId)
    window.location.reload()
  };

  const handleLeaveReview = (bookingId: string) => {
    // TODO: Implement review modal
    console.log("Leave review for booking:", bookingId);
  };

  const handleUploadPhoto = (bookingId: string) => {
    // TODO: Implement photo upload
    console.log("Upload photo for booking:", bookingId);
  };

  const shareReferralLink = () => {
    const referralLink = `https://glowup.app/signup?ref=user123`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, John!</h1>
                <p className="opacity-90">Manage your bookings and profile</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-yellow-300">
                <Trophy className="h-5 w-5" />
                <span className="text-xl font-bold">{userPoints}</span>
              </div>
              <p className="text-sm opacity-90">Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">{t("my_bookings")}</TabsTrigger>
            <TabsTrigger value="points">{t("points_rewards")}</TabsTrigger>
            <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>{t("upcoming_appointments")}</CardTitle>
                <CardDescription>{t("scheduled_bookings")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">{t("no_upcoming")}</p>
                ) : (
                  upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{booking.salon}</h3>
                          <p className="text-sm text-muted-foreground">{booking.service}</p>
                        </div>
                        <Badge>{`$${booking.price}`}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {booking.time}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Past Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>{t("past_appointments")}</CardTitle>
                <CardDescription>{t("booking_history")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{booking.salon}</h3>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">${booking.price}</Badge>
                        <p className="text-xs text-green-600 mt-1">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {booking.canReview && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLeaveReview(booking.id)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Leave Review (+5 pts)
                        </Button>
                      )}
                      {!booking.hasPhoto && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUploadPhoto(booking.id)}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Upload Photo (+10 pts)
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">Book Again</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="points" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Points Balance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Your Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{userPoints}</div>
                    <p className="text-muted-foreground">Total Points Earned</p>
                  </div>
                </CardContent>
              </Card>

              {/* Referral */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-blue-500" />
                    Refer Friends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Invite friends and both get +30 points when they book!
                  </p>
                  <Button onClick={shareReferralLink} className="w-full">
                    Share Referral Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* How to Earn Points */}
            <Card>
              <CardHeader>
                <CardTitle>How to Earn Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Complete a booking</span>
                    <Badge variant="secondary">+10 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Upload a photo</span>
                    <Badge variant="secondary">+10 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Leave a review</span>
                    <Badge variant="secondary">+5 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Successful referral</span>
                    <Badge variant="secondary">+30 pts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Profile settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;