export type Appointment = {
  id: string
  salonId: string | undefined
  serviceId: string | null
  dateISO: string
  time: string
  salonName: string
  service: { name: string; price: number; duration: string }
  createdAtISO: string
}

const STORAGE_KEY = "glowup:appointments"

function readAll(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Appointment[]
  } catch {
    return []
  }
}

function writeAll(appointments: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
}

export function saveAppointment(partial: Omit<Appointment, "id" | "createdAtISO">): Appointment {
  const appointment: Appointment = {
    ...partial,
    id: crypto.randomUUID(),
    createdAtISO: new Date().toISOString(),
  }
  const current = readAll()
  current.push(appointment)
  writeAll(current)
  return appointment
}

export function getAppointments(): Appointment[] {
  return readAll()
}

export function deleteAppointment(id: string) {
  const current = readAll().filter((a) => a.id !== id)
  writeAll(current)
}

