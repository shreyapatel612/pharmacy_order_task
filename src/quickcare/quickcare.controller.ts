import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuickcareService } from './quickcare.service';
import { CreateQuickcareDto } from './dto/quickcare.req.dto';

@Controller('quickcare')
@ApiTags('Quickcare')
export class QuickcareController {
  constructor(private quickcareService: QuickcareService) {}

  // To get all Data of Quickcare
  @Get()
  async findAll() {
    const data = this.quickcareService.findAll();
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To fetch data of pass in params order_id
  @Get('/:orderId')
  @ApiParam({
    name: 'orderId',
    description: 'Gets the Action orderId',
  })
  async findOne(@Param('orderId') orderId: number) {
    const data = this.quickcareService.findOne(orderId);
    return { status: 'SUCCEESS', message: 'Successfully Fetched!', data };
  }

  // To create order of Quickcare
  @Post()
  async create(@Body() createQuickcare: CreateQuickcareDto) {
    const data = this.quickcareService.create(createQuickcare);
    return { status: 'SUCCEESS', message: 'Successfully Inserted!', data };
  }
}
