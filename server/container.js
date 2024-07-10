import awilix from 'awilix';
import { UserRepository, UserController, UserService } from './users/index.js';
import {
  AttendanceRepository,
  AttendanceService,
  AttendanceController,
} from './attendance/index.js';

import { GalleryController, GalleryService, GalleryRepository } from './gallery/index.js';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  userRepository: awilix.asClass(UserRepository),
  userService: awilix.asClass(UserService),
  userController: awilix.asClass(UserController),

  attendanceRepository: awilix.asClass(AttendanceRepository),
  attendanceService: awilix.asClass(AttendanceService),
  attendanceController: awilix.asClass(AttendanceController),

  galleryRepository: awilix.asClass(GalleryRepository),
  galleryService: awilix.asClass(GalleryService),
  galleryController: awilix.asClass(GalleryController),
});

export { container };
