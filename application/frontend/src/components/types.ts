export type IconName =  'add' |
						'add-filled'|
						'arrow-diagonal'|
						'arrow-down' |
						'bill' |
						'book' |
						'calendar' |
						'check' |
						'couch' |
						'dollar-star' |
						'pencil' |
						'eye' |
						'group-shapes' |
						'logo' |
						'save' |
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
