import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import * as validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import { UrlDto } from './dto/url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('encode')
  async create(@Body() body: UrlDto) {
    const data = await this.encodeUrl(body.url);
    const saveUrl = this.urlService.create(data);
    return saveUrl;
  }


  async encodeUrl(url: string): Promise<any> {
    const baseUrl = process.env.baseURL;
    if (!validUrl.isUri(baseUrl) || !validUrl.isUri(url)) {
      return false;
    }
    const urlCode = await nanoid(8);
    const encodedUrl = `${baseUrl}/${urlCode}`;
    return { url, urlCode, encodedUrl };
  }
}
