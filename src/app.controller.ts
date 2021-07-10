import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { version } from 'os';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':urlCode')
  @Redirect('', 302)
  async handleRedirect(@Param('urlCode') urlCode: string) {
    const { url } = await this.urlService.findByCode(urlCode);
    if (url) {
      return { url };
    }
  }
}
