// =========================
// 🏨 ROOMS ACTION TYPES
// =========================
export const ROOMS_LOADING = 'ROOMS_LOADING';
export const ROOMS_OK = 'ROOMS_OK';
export const ROOMS_ERROR = 'ROOMS_ERROR';

/**
 * Creating a new room.
 */
export const CREATE_ROOM_LOADING = 'CREATE_ROOM_LOADING';
export const CREATE_ROOM_OK = 'CREATE_ROOM_OK';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

/**
 * Loading a specific room.
 */
export const ROOM_LOADING = 'ROOM_LOADING';
export const ROOM_OK = 'ROOM_OK';
export const ROOM_ERROR = 'ROOM_ERROR';

/**
 * Loading price history for a room.
 */
export const PRICE_HISTORY_LOADING = 'PRICE_HISTORY_LOADING';
export const PRICE_HISTORY_OK = 'PRICE_HISTORY_OK';
export const PRICE_HISTORY_ERROR = 'PRICE_HISTORY_ERROR';

/**
 * Creating a new price history entry.
 */
export const CREATE_PRICE_ENTRY_LOADING = 'CREATE_PRICE_ENTRY_LOADING';
export const CREATE_PRICE_ENTRY_OK = 'CREATE_PRICE_ENTRY_OK';
export const CREATE_PRICE_ENTRY_ERROR = 'CREATE_PRICE_ENTRY_ERROR';

/**
 * Loading equipment for a room.
 */
export const EQUIPMENT_LOADING = 'EQUIPMENT_LOADING';
export const EQUIPMENT_OK = 'EQUIPMENT_OK';
export const EQUIPMENT_ERROR = 'EQUIPMENT_ERROR';

/**
 * Creating new equipment.
 */
export const EQUIPMENT_CREATE_LOADING = 'EQUIPMENT_CREATE_LOADING';
export const EQUIPMENT_CREATE_OK = 'EQUIPMENT_CREATE_OK';
export const EQUIPMENT_CREATE_ERROR = 'EQUIPMENT_CREATE_ERROR';

/**
 * Fetching room occupancy data.
 */
export const OCCUPANCY_LOADING = 'OCCUPANCY_LOADING';
export const OCCUPANCY_OK = 'OCCUPANCY_OK';
export const OCCUPANCY_ERROR = 'OCCUPANCY_ERROR';

// =========================
// 🛠️ EQUIPMENTS ACTION TYPES
// =========================

/**
 * Fetching all available equipment items.
 */
export const EQUIPMENTS_LOADING = 'EQUIPMENTS_LOADING';
export const EQUIPMENTS_OK = 'EQUIPMENTS_OK';
export const EQUIPMENTS_ERROR = 'EQUIPMENTS_ERROR';

/**
 * Updating equipment assignment or details.
 */
export const EQUIPMENT_UPDATE_LOADING = 'EQUIPMENT_UPDATE_LOADING';
export const EQUIPMENT_UPDATE_OK = 'EQUIPMENT_UPDATE_OK';
export const EQUIPMENT_UPDATE_ERROR = 'EQUIPMENT_UPDATE_ERROR';

// =========================
// 📅 RESERVATIONS ACTION TYPES
// =========================

/**
 * Fetching reservation list.
 */
export const RESERVATIONS_LOADING = 'RESERVATIONS_LOADING';
export const RESERVATIONS_OK = 'RESERVATIONS_OK';
export const RESERVATIONS_ERROR = 'RESERVATIONS_ERROR';

/**
 * Creating a reservation.
 */
export const CREATE_RESERVATION_LOADING = 'RESERVATION_CREATE_LOADING';
export const CREATE_RESERVATION_OK = 'RESERVATION_CREATE_OK';
export const CREATE_RESERVATION_ERROR = 'RESERVATION_CREATE_ERROR';

/**
 * Fetching a single reservation.
 */
export const RESERVATION_LOADING = 'RESERVATION_LOADING';
export const RESERVATION_OK = 'RESERVATION_OK';
export const RESERVATION_ERROR = 'RESERVATION_ERROR';

/**
 * Updating reservation status (check-in/check-out).
 */
export const RESERVATION_STATUS_LOADING = 'RESERVATION_STATUS_LOADING';
export const RESERVATION_STATUS_OK = 'RESERVATION_STATUS_OK';
export const RESERVATION_STATUS_ERROR = 'RESERVATION_STATUS_ERROR';

// =========================
// 👤 GUESTS ACTION TYPES
// =========================

/**
 * Fetching guest list.
 */
export const GUESTS_LOADING = 'GUESTS_LOADING';
export const GUESTS_OK = 'GUESTS_OK';
export const GUESTS_ERROR = 'GUESTS_ERROR';

/**
 * Fetching a single guest.
 */
export const GUEST_LOADING = 'GUEST_LOADING';
export const GUEST_OK = 'GUEST_OK';
export const GUEST_ERROR = 'GUEST_ERROR';

// =========================
// 💳 BILLS ACTION TYPES
// =========================

/**
 * Fetching all bills.
 */
export const BILLS_LOADING = 'BILLS_LOADING';
export const BILLS_OK = 'BILLS_OK';
export const BILLS_ERROR = 'BILLS_ERROR';

/**
 * Fetching a single bill.
 */
export const BILL_LOADING = 'BILL_LOADING';
export const BILL_OK = 'BILL_OK';
export const BILL_ERROR = 'BILL_ERROR';
