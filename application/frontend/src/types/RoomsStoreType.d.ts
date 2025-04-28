import { Room } from "./rooms"

type RoomsStoreType = {
    roomsList : Room[],
    error: unknown | null,
    loading: boolean,
}