export type RoomsStoreType = {
    roomsList : Room[],
    error: unknown | null,
    loading: boolean,
}

export type Room = {
	type: 'single' | 'double' | 'suite';
	isAvailable: boolean;
	price: number;
	roomNumber: number;
	guestId: number;
};