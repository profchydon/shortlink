import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { UrlDto } from './url.dto';

export class UpdateUrlDto extends PartialType(UrlDto) {

  @IsNumber()
  readonly clickCount: number;

  @IsString()
  readonly lastVisited: string;
}
