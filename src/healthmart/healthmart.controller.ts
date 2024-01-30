import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { HealthmartService } from './healthmart.service';
import { CreateHealthmartDto } from './dto/healthmart.req.dto';

@Controller('healthmart')
@ApiTags('Healthmart')
export class HealthmartController {
  constructor(private healthmartService: HealthmartService) {}

  // To get all Data of Healthcare
  @Get()
  async findAll() {
    const data = await this.healthmartService.findAll();
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To fetch data of pass in params order_id
  @Get('/:orderId')
  @ApiParam({
    name: 'orderId',
    description: 'Gets the Action orderId',
  })
  async findOne(@Param('orderId') orderId: number) {
    const data = await this.healthmartService.findOne(orderId);
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To create order of Healthmart
  @Post()
  async create(@Body() createHealthmart: CreateHealthmartDto) {
    const data = await this.healthmartService.create(createHealthmart);
    return { status: 'SUCCEESS', message: 'Successfully Inserted!', data };
  }
}
