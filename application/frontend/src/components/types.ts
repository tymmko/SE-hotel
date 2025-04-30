export type IconName =  'arrow-diagonal'|
						'bill' |
						'book' |
						'couch' |
						'dollar-star' |
						'pencil' |
						'eye' |
						'logo' |
						'search' |
						'loginvisual' |
						'room-number-badge' |
						'guest-badge' |
						'user';
						
export type RoomComponent = {
	type: 'single' | 'double' | 'suite';
	isAvailable: boolean;
	price: number;
	roomNumber: number;
};
