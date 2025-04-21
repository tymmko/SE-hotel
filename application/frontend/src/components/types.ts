export type IconName = 'bill' |
                        'book' |
                        'couch' |
                        'logo' |
                        'search' |
                        'eye' |
                        'loginvisual' |
                        'roomNumberBadge' |
                        'guestBadge' |
                        'user';
export type RoomComponent = {
    type: 'single' | 'double' | 'suite';
    isAvailable: boolean;
    price: number;
    roomNumber: number;
};
