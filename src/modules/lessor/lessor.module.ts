import { LessorService } from './services/lessor.service';
import { LessorRepository } from './repositories/lessor.repository';
import { Module } from '@nestjs/common';
import { LessorController } from './controllers/lessor.controller';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  controllers: [LessorController],
  imports: [UserModule, AdminModule],
  exports: [LessorService],
  providers: [LessorService, LessorRepository],
})
export class LessorModule {}
