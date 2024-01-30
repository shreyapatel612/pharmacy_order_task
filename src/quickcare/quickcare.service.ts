import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateQuickcareDto } from './dto/quickcare.req.dto';

@Injectable()
export class QuickcareService {
  constructor(private readonly http: HttpService) {}

  // To get all Data of Quickcare
  async findAll(): Promise<any> {
    const url = `${process.env.BASE_URL}/quickcare/orders`;
    const { data } = await firstValueFrom(this.http.get(url));

    return data;
  }

  // To fetch data of pass in params order_id
  async findOne(orderId: number) {
    const url = `${process.env.BASE_URL}/quickcare/orders/${orderId}`;
    const { data } = await firstValueFrom(this.http.get(url));
    return data;
  }

  // To create order of Quickcare
  async create(createQuickcare: CreateQuickcareDto) {
    const url = `${process.env.BASE_URL}/quickcare/orders`;
    const { data } = await firstValueFrom(this.http.post(url, createQuickcare));
    return data;
  }
}
