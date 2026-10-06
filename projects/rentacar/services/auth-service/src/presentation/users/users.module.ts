import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [{ provide: USER_REPOSITORY, useClass: UserRepository }],
})
export class UsersModule {}
