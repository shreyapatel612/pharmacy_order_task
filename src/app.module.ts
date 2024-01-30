import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { HealthmartModule } from './healthmart/healthmart.module';
import { CareplusModule } from './careplus/careplus.module';
import { QuickcareModule } from './quickcare/quickcare.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PharmacyModule,
    HealthmartModule,
    CareplusModule,
    QuickcareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
