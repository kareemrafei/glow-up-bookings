import { useState, useEffect } from 'react'
import { supabase, type Database } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

type Booking = Database['public']['Tables']['bookings']['Row']
type BookingInsert = Database['public']['Tables']['bookings']['Insert']

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
    
    // Set up real-time subscription
    const channel = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookings(prev => [...prev, payload.new as Booking])
          } else if (payload.eventType === 'UPDATE') {
            setBookings(prev => 
              prev.map(booking => 
                booking.id === payload.new.id ? payload.new as Booking : booking
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setBookings(prev => 
              prev.filter(booking => booking.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          salons(name),
          services(name, duration_minutes, price),
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData: BookingInsert) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Success",
        description: "Booking created successfully"
      })

      return data
    } catch (error) {
      console.error('Error creating booking:', error)
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Booking status updated"
      })
    } catch (error) {
      console.error('Error updating booking:', error)
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      })
      throw error
    }
  }

  const getAvailableTimeSlots = async (
    salonId: string, 
    serviceId: string, 
    date: string
  ): Promise<string[]> => {
    try {
      // Get existing bookings for the date
      const { data: existingBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('appointment_time, services(duration_minutes)')
        .eq('salon_id', salonId)
        .eq('appointment_date', date)
        .neq('status', 'cancelled')

      if (bookingsError) throw bookingsError

      // Get service duration
      const { data: service, error: serviceError } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('id', serviceId)
        .single()

      if (serviceError) throw serviceError

      // Generate available slots (simplified logic)
      const allSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
      ]

      // Filter out booked slots
      const bookedTimes = existingBookings?.map(b => b.appointment_time) || []
      const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot))

      return availableSlots
    } catch (error) {
      console.error('Error getting available slots:', error)
      return []
    }
  }

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    getAvailableTimeSlots,
    refetch: fetchBookings
  }
}