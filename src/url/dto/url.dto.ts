import { IsNotEmpty, IsString } from 'class-validator';

export class UrlDto {

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly encodedUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly urlCode: string;

}
