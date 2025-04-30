import { FC, SVGProps } from 'react';

import { ReactComponent as ArrowDiagonal } from './arrow-diagonal.svg';
import { ReactComponent as Bill } from './bill.svg';
import { ReactComponent as BillFilled } from './bill-filled.svg';
import { ReactComponent as Book } from './book.svg';
import { ReactComponent as BookFilled } from './book-filled.svg';
import { ReactComponent as Couch } from './couch.svg';
import { ReactComponent as CouchFilled } from './couch-filled.svg';
import { ReactComponent as DollarStar } from './dollar-star.svg';
import { ReactComponent as Eye } from './eye.svg';
import { ReactComponent as Visual } from './loginvisual.svg';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Pencil } from './pencil.svg';
import { ReactComponent as Search } from './search.svg';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as UserFilled } from './user-filled.svg';
import { ReactComponent as RoomNumberBadge } from './roomNumberBadge.svg';
import { ReactComponent as GuestBadge } from './guestBadge.svg';


const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
	'arrow-diagonal': ArrowDiagonal,
	bill: Bill,
	'bill-filled': BillFilled,
	book: Book,
	'book-filled': BookFilled,
	couch: Couch,
	'couch-filled': CouchFilled,
	'dollar-star': DollarStar,
	eye: Eye,
	logo: Logo,
	pencil: Pencil,
	user: User,
	'user-filled': UserFilled,
	search: Search,
	visual: Visual,
	'room-number-badge': RoomNumberBadge,
	'guest-badge': GuestBadge
};

export default icons;
