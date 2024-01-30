import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CareplusController } from './careplus.controller';
import { CareplusService } from './careplus.service';

@Module({
  imports: [HttpModule],
  controllers: [CareplusController],
  providers: [CareplusService],
})
export class CareplusModule {}
