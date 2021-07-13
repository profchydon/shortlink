import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UrlDto {

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly encodedUrl: string;

  @IsOptional()
  @IsString()
  readonly urlCode: string;

}
