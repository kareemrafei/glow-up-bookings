import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

type Locale = "en" | "ar"

type Messages = Record<string, string>

const messages: Record<Locale, Messages> = {
  en: {
    app_name: "GlowUp Booking",
    back: "Back",
    back_home: "Back to Home",
    book_your_appointment: "Book Your Appointment",
    booking_summary: "Booking Summary",
    salon: "Salon:",
    service: "Service:",
    duration: "Duration:",
    price: "Price:",
    select_date: "Select Date",
    select_time: "Select Time",
    available_times_for: "Available times for {date}",
    select_date_first: "Please select a date first",
    confirm_booking: "Confirm Booking",
    booking_confirmed: "Booking Confirmed!",
    appointment_booked: "Your appointment has been successfully booked",
    booking_details: "Booking Details",
    appointment_date: "Appointment Date",
    whats_next: "What's Next?",
    youll_receive_email: "You'll receive a confirmation email shortly",
    salon_may_reschedule: "The salon will contact you if they need to reschedule",
    arrive_early: "Please arrive 5 minutes before your appointment",
    leave_review: "Don't forget to leave a review after your service!",
    view_my_bookings: "View My Bookings",
    book_another: "Book Another",
    my_bookings: "My Bookings",
    points_rewards: "Points & Rewards",
    profile: "Profile",
    upcoming_appointments: "Upcoming Appointments",
    scheduled_bookings: "Your scheduled bookings",
    no_upcoming: "No upcoming bookings",
    past_appointments: "Past Appointments",
    booking_history: "Your booking history",
    refer_friends: "Refer Friends",
    share_referral_link: "Share Referral Link",
    choose_service: "Choose Your Service",
    featured_salons: "Featured Salons",
    search_barbers: "Search for barbers...",
    book_now: "Book Now",
  },
  ar: {
    app_name: "جلوب أب للحجوزات",
    back: "رجوع",
    back_home: "العودة إلى الرئيسية",
    book_your_appointment: "احجز موعدك",
    booking_summary: "ملخص الحجز",
    salon: "الصالون:",
    service: "الخدمة:",
    duration: "المدة:",
    price: "السعر:",
    select_date: "اختر التاريخ",
    select_time: "اختر الوقت",
    available_times_for: "الأوقات المتاحة ليوم {date}",
    select_date_first: "يرجى اختيار التاريخ أولاً",
    confirm_booking: "تأكيد الحجز",
    booking_confirmed: "تم تأكيد الحجز!",
    appointment_booked: "تم حجز موعدك بنجاح",
    booking_details: "تفاصيل الحجز",
    appointment_date: "تاريخ الموعد",
    whats_next: "ماذا بعد؟",
    youll_receive_email: "ستصلك رسالة تأكيد قريبًا",
    salon_may_reschedule: "قد يتواصل معك الصالون لتعديل الموعد",
    arrive_early: "يرجى الحضور قبل الموعد بـ 5 دقائق",
    leave_review: "لا تنسَ ترك تقييم بعد الخدمة!",
    view_my_bookings: "عرض حجوزاتي",
    book_another: "احجز من جديد",
    my_bookings: "حجوزاتي",
    points_rewards: "النقاط والمكافآت",
    profile: "الملف الشخصي",
    upcoming_appointments: "المواعيد القادمة",
    scheduled_bookings: "حجوزاتك المجدولة",
    no_upcoming: "لا توجد حجوزات قادمة",
    past_appointments: "المواعيد السابقة",
    booking_history: "سجل الحجوزات",
    refer_friends: "دعوة الأصدقاء",
    share_referral_link: "مشاركة رابط الدعوة",
    choose_service: "اختر خدمتك",
    featured_salons: "صالونات مميزة",
    search_barbers: "ابحث عن الحلاقين...",
    book_now: "احجز الآن",
  },
}

type I18nContextType = {
  locale: Locale
  dir: "ltr" | "rtl"
  t: (key: string, vars?: Record<string, string>) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("glowup:locale") as Locale | null
    return stored ?? "en"
  })

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    localStorage.setItem("glowup:locale", locale)
  }, [locale, dir])

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])

  const t = useCallback((key: string, vars?: Record<string, string>) => {
    const msg = messages[locale][key] ?? messages.en[key] ?? key
    if (!vars) return msg
    return Object.keys(vars).reduce((acc, k) => acc.replace(`{${k}}`, vars[k]), msg)
  }, [locale])

  const value = useMemo(() => ({ locale, dir, t, setLocale }), [locale, dir, t, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

