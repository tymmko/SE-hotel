export interface Reservation {
    reservation_id: number
    guest_id:       number
    room_id:        number
    check_in_date:  string  // ISO date
    check_out_date: string  // ISO date
    status:         string  // e.g. "Confirmed" | "Canceled"
  }
  
  export interface NewReservation {
    guest_id:       number
    room_id:        number
    check_in_date:  string
    check_out_date: string
    status:         string
  }
  