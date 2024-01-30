import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateHealthmartDto } from './dto/healthmart.req.dto';

@Injectable()
export class HealthmartService {
  constructor(private readonly http: HttpService) {}

  // To get all Data of Healthcare
  async findAll() {
    const url = `${process.env.BASE_URL}/healthmart/orders`;
    const { data } = await firstValueFrom(this.http.get(url));

    return data;
  }

  // To fetch data of pass in params order_id
  async findOne(orderId: number) {
    const url = `${process.env.BASE_URL}/healthmart/orders/${orderId}`;
    const { data } = await firstValueFrom(this.http.get(url));
    return data;
  }

  // To create order of Healthmart
  async create(createHealthmart: CreateHealthmartDto) {
    const url = `${process.env.BASE_URL}/healthmart/orders`;
    const { data } = await firstValueFrom(
      this.http.post(url, createHealthmart),
    );
    return data;
  }
}
