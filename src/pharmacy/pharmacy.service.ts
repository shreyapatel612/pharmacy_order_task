import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PharmacyService {
  constructor(private readonly http: HttpService) {}

  // To get all Data of Pharmacy
  async findAll() {
    const url = `${process.env.BASE_URL}/pharmacy`;
    const { data } = await firstValueFrom(this.http.get(url));

    return data;
  }
}
