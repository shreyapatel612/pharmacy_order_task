import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  quickCareUserName: string;

  @ApiProperty()
  @IsString()
  quickCareUserAddress: string;

  @ApiProperty()
  @IsString()
  quickCareUserCity: string;

  @ApiProperty()
  @IsString()
  quickCareUserState: string;

  @ApiProperty()
  @IsString()
  quickCareUserZipcode: string;

  @ApiProperty()
  @IsString()
  quickCareUserCountry: string;
}

export class CreateQuickcareDto {
  @ApiProperty()
  @IsString()
  quickCareProduct: string;

  @ApiProperty()
  @IsNumber()
  quickCareQuantity: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  quickCareUserData: UserDto;
}
