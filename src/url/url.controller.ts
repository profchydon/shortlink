import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UrlService } from './url.service';
import * as validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import { UrlDto } from './dto/url.dto';
import { Validator } from 'class-validator';
import { Url } from './url.entity';
import { GlobalExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('url')
export class UrlController {
  readonly validator = new Validator();
  constructor(private readonly urlService: UrlService) {}

  @Post('encode')
  @UsePipes(new ValidationPipe())
  @UseFilters(GlobalExceptionFilter)
  async encode(@Body() body: UrlDto) {
    try {
      const data = await this.encodeUrl(body.url);
      const response = this.urlService.create(data);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('decode')
  async decode(@Body() body) {
    const url: any = await this.decodeUrl(body.shortUrl);
    const response = {
      url: url.url,
      encodedUrl: url.encodedUrl,
      urlCode: url.urlCode,
      clickCount: url.clickCount,
      lastVisited: url.lastVisited,
    };
    return response;
  }

  async encodeUrl(url: string): Promise<any> {
    const baseUrl = process.env.baseURL;
    if (!validUrl.isUri(baseUrl) || !validUrl.isUri(url)) {
      throw new BadRequestException('Invalid URL');
    }
    const urlCode = await nanoid(6);
    const encodedUrl = `${baseUrl}/${urlCode}`;
    return { url, urlCode, encodedUrl };
  }

  async decodeUrl(shortUrl: string): Promise<Url> {
    if (!validUrl.isUri(shortUrl)) {
      throw new BadRequestException('Invalid URL');
    }
    const url = this.urlService.find(shortUrl);
    return url;
  }
}
