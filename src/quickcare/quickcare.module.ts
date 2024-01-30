import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuickcareController } from './quickcare.controller';
import { QuickcareService } from './quickcare.service';

@Module({
  imports: [HttpModule],
  controllers: [QuickcareController],
  providers: [QuickcareService],
})
export class QuickcareModule {}
