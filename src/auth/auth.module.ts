
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthValidatorFactory } from './factory/auth.factory';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthValidatorFactory],
})
export class AuthModule {}
