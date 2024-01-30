import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCareplusDto } from './dto/careplus.req.dto';

@Injectable()
export class CareplusService {
  constructor(private readonly http: HttpService) {}

  // To get all Data of Careplus
  async findAll() {
    const url = `${process.env.BASE_URL}/careplus/orders`;
    const { data } = await firstValueFrom(this.http.get(url));
    return data;
  }

  // To fetch data of pass in params order_id
  async findOne(orderId: number): Promise<any> {
    const url = `${process.env.BASE_URL}/careplus/orders/${orderId}`;
    const { data } = await firstValueFrom(this.http.get(url));
    return data;
  }

  // To create order of Careplus
  async create(createCareplus: CreateCareplusDto) {
    const url = `${process.env.BASE_URL}/careplus/orders`;
    const { data } = await firstValueFrom(this.http.post(url, createCareplus));
    return data;
  }
}
