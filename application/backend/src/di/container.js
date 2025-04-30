// src/di/container.js
const models = require('../data/models');

// Import repositories
const RoomRepository = require('../data/repositories/roomRepository');
const GuestRepository = require('../data/repositories/guestRepository');
const ReservationRepository = require('../data/repositories/reservationRepository');
// Import other repositories as needed

// Import services
const RoomService = require('../services/roomService');
const GuestService = require('../services/guestService');
const ReservationService = require('../services/reservationService');
// Import other services as needed

// Import controllers
const RoomController = require('../controllers/room.controller');
const GuestController = require('../controllers/guest.controller');
const ReservationController = require('../controllers/reservation.controller');
// Import other controllers as needed

/**
 * Simple dependency injection container
 * Manages the creation and injection of all application dependencies
 */
class Container {
  constructor() {
    this.instances = {};
  }

  /**
   * Register an instance in the container
   * @param {string} name - Name of the instance
   * @param {any} instance - The instance to register
   */
  register(name, instance) {
    this.instances[name] = instance;
  }

  /**
   * Retrieve an instance from the container
   * @param {string} name - Name of the instance
   * @returns {any} The requested instance
   * @throws {Error} If instance not found
   */
  get(name) {
    if (!this.instances[name]) {
      throw new Error(`Instance not found: ${name}`);
    }
    return this.instances[name];
  }

  /**
   * Check if an instance exists in the container
   * @param {string} name - Name of the instance
   * @returns {boolean} True if instance exists
   */
  has(name) {
    return !!this.instances[name];
  }
}

/**
 * Initialize the container with all application dependencies
 * @returns {Container} Initialized container
 */
function initializeContainer() {
  const container = new Container();
  
  // Register database models
  container.register('models', models);
  
  // Register repositories
  container.register('roomRepository', new RoomRepository(models));
  container.register('guestRepository', new GuestRepository(models));
  container.register('reservationRepository', new ReservationRepository(models));
  // Register other repositories as needed
  
  // Register services
  container.register('roomService', new RoomService(container.get('roomRepository')));
  container.register('guestService', new GuestService(container.get('guestRepository')));
  container.register('reservationService', new ReservationService(
    container.get('reservationRepository'),
    container.get('roomService'),
    container.get('guestService')
  ));
  // Register other services as needed
  
  // Register controllers
  container.register('roomController', new RoomController(container.get('roomService')));
  container.register('guestController', new GuestController(container.get('guestService')));
  container.register('reservationController', new ReservationController(container.get('reservationService')));
  // Register other controllers as needed
  
  return container;
}

module.exports = {
  Container,
  initializeContainer
};