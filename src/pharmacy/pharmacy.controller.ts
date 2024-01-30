import { Controller, Get } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('pharmacy')
@ApiTags('Pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  // To get all Data of Pharmacy
  @Get()
  async findAll() {
    return this.pharmacyService.findAll();
  }
}
