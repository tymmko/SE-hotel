// src/di/container.js
const models = require('../data/models').models; // Use the exported 'models' object

// Import repositories
const RoomRepository = require('../data/repositories/roomRepository');
// const GuestRepository = require('../data/repositories/guestRepository'); // REMOVED
const ReservationRepository = require('../data/repositories/reservationRepository');
const BillRepository = require('../data/repositories/billRepository');
const UserRepository = require('../data/repositories/userRepository');
const PriceHistoryRepository = require('../data/repositories/priceHistoryRepository');
const EquipmentRepository = require('../data/repositories/equipmentRepository');
// Import other repositories as needed

// Import services
const RoomService = require('../services/roomService');
// const GuestService = require('../services/guestService'); // REMOVED
const ReservationService = require('../services/reservationService');
const BillService = require('../services/billService');
const UserService = require('../services/userService');
const PriceHistoryService = require('../services/priceHistoryService');
const EquipmentService = require('../services/equipmentService');
// Import other services as needed

// Import controllers
const RoomController = require('../controllers/room.controller');
// const GuestController = require('../controllers/guest.controller'); // REMOVED
const ReservationController = require('../controllers/reservation.controller');
const BillController = require('../controllers/bill.controller');
const UserController = require('../controllers/user.controller');
const PriceHistoryControllerFactory = require('../controllers/priceHistory.controller');
const EquipmentControllerFactory = require('../controllers/equipment.controller');

// Import other controllers as needed

class Container {
  constructor() {
    this.instances = {};
  }

  register(name, instance) {
    this.instances[name] = instance;
  }

  get(name) {
    if (!this.instances[name]) {
      // Attempt to build it if a builder function is registered
      if (this.builders && this.builders[name]) {
        this.instances[name] = this.builders[name](this);
        return this.instances[name];
      }
      throw new Error(`Instance not found or builder not defined: ${name}`);
    }
    return this.instances[name];
  }

  has(name) {
    return !!this.instances[name] || (this.builders && !!this.builders[name]);
  }

  // Store builder functions for deferred instantiation
  setBuilder(name, builderFn) {
    if (!this.builders) {
      this.builders = {};
    }
    this.builders[name] = builderFn;
  }
}

function initializeContainer() {
  const container = new Container();
  
  // Register database models (already loaded, pass the 'models' object)
  container.register('models', models);
  
  // Register repositories
  container.setBuilder('roomRepository', (c) => new RoomRepository(c.get('models')));
  // container.register('guestRepository', new GuestRepository(models)); // REMOVED
  container.setBuilder('reservationRepository', (c) => new ReservationRepository(c.get('models')));
  container.setBuilder('billRepository', (c) => new BillRepository(c.get('models')));
  container.setBuilder('userRepository', (c) => new UserRepository(c.get('models')));
  container.setBuilder('priceHistoryRepository', (c) => new PriceHistoryRepository(c.get('models')));
  container.setBuilder('equipmentRepository', (c) => new EquipmentRepository(c.get('models')));
  
  // Register services
  container.setBuilder('roomService', (c) => new RoomService(c.get('roomRepository')));
  // container.register('guestService', new GuestService(container.get('guestRepository'))); // REMOVED
  container.setBuilder('reservationService', (c) => new ReservationService(
    c.get('reservationRepository'),
    c.get('roomRepository'),
    c.get('userRepository') // Added UserRepository
  ));
  container.setBuilder('billService', (c) => new BillService(
    c.get('billRepository'),
    // Pass other repositories or models as needed by BillService constructor
    // For example, if BillService needs Stay model directly (not ideal): c.get('models').Stay
    // Or better, inject repositories for Stay, Reservation, Room, PriceHistory if BillService uses them
    c.get('models').Stay, // Example of direct model injection, review BillService dependencies
    c.get('models').Reservation,
    c.get('models').Room,
    c.get('models').PriceHistory
  ));
  container.setBuilder('userService', (c) => new UserService(c.get('userRepository')));
  container.setBuilder('priceHistoryService', (c) => new PriceHistoryService(c.get('priceHistoryRepository'), c.get('roomRepository')));
  container.setBuilder('equipmentService', (c) => new EquipmentService(c.get('equipmentRepository'), c.get('roomRepository')));
  
  // Register controllers
  container.setBuilder('roomController', (c) => new RoomController(c.get('roomService')));
  // container.register('guestController', new GuestController(container.get('guestService'))); // REMOVED
  container.setBuilder('reservationController', (c) => new ReservationController(c.get('reservationService')));
  container.setBuilder('billController', (c) => new BillController(c.get('billService')));
  container.setBuilder('userController', (c) => new UserController(c.get('userService')));
  container.setBuilder('priceHistoryController', (c) => PriceHistoryControllerFactory(c.get('priceHistoryService')));
  container.setBuilder('equipmentController', (c) => EquipmentControllerFactory(c.get('equipmentService')));
  
  // To actually instantiate them if needed at init (or let them be lazy-loaded via get)
  // For example, if your app.js directly uses container.get('someController')
  // container.get('userController'); // This would build and cache it.

  return container;
}

module.exports = {
  Container,
  initializeContainer
};