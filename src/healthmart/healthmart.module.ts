import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HealthmartController } from './healthmart.controller';
import { HealthmartService } from './healthmart.service';

@Module({
  imports: [HttpModule],
  controllers: [HealthmartController],
  providers: [HealthmartService],
})
export class HealthmartModule {}
