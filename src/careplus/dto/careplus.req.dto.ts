import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  @IsString()
  carePlusClientName: string;

  @ApiProperty()
  @IsString()
  carePlusClientAddress: string;

  @ApiProperty()
  @IsString()
  carePlusClientCity: string;

  @ApiProperty()
  @IsString()
  carePlusClientState: string;

  @ApiProperty()
  @IsString()
  carePlusClientZipcode: string;

  @ApiProperty()
  @IsString()
  carePlusClientCountry: string;
}

export class CreateCareplusDto {
  @ApiProperty()
  @IsString()
  carePlusProduct: string;

  @ApiProperty()
  @IsNumber()
  carePlusQuantity: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => ClientDto)
  carePlusClientInfo: ClientDto;
}
