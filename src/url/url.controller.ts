import {
    BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';
import * as validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import { UrlDto } from './dto/url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('encode')
  async encode(@Body() body: UrlDto) {
    const data = await this.encodeUrl(body.url);
    const saveUrl = this.urlService.create(data);
    return saveUrl;
  }

  @Get('decode')
  async decode(@Body() body) {
    const { url } = await this.decodeUrl(body.shortUrl);
    return url;
  }

  @Get(':')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
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

  async decodeUrl(shortUrl: string): Promise<any> {
    if (!validUrl.isUri(shortUrl)) {
        throw new BadRequestException('Invalid URL');
    }
    const url = this.urlService.find(shortUrl);
    return url;
  }
}
