import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustDto {
  @ApiProperty()
  @IsString()
  healthMartCustName: string;

  @ApiProperty()
  @IsString()
  healthMartCustAddress: string;

  @ApiProperty()
  @IsString()
  healthMartCustCity: string;

  @ApiProperty()
  @IsString()
  healthMartCustState: string;

  @ApiProperty()
  @IsString()
  healthMartCustZipcode: string;

  @ApiProperty()
  @IsString()
  healthMartCustCountry: string;
}

export class CreateHealthmartDto {
  @ApiProperty()
  @IsString()
  healthMartProduct: string;

  @ApiProperty()
  @IsNumber()
  healthMartQuantity: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CustDto)
  healthMartCustomerInfo: CustDto;
}
