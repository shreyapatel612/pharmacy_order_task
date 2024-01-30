import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CareplusService } from './careplus.service';
import { CreateCareplusDto } from './dto/careplus.req.dto';

@Controller('careplus')
@ApiTags('Careplus')
export class CareplusController {
  constructor(private careplusService: CareplusService) {}

  // To get all Data of Careplus
  @Get('/')
  async findAll() {
    const data = this.careplusService.findAll();
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To fetch data of pass in params order_id
  @Get('/:orderId')
  @ApiParam({
    name: 'orderId',
    description: 'Gets the Action orderId',
  })
  async findOne(@Param('orderId') orderId: number): Promise<any> {
    const data = this.careplusService.findOne(orderId);
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To create order of Careplus
  @Post()
  async create(@Body() createCareplus: CreateCareplusDto) {
    const data = this.careplusService.create(createCareplus);
    return { status: 'SUCCEESS', message: 'Successfully Inserted!', data };
  }
}
