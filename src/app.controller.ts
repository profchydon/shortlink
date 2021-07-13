import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { version } from 'os';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':urlCode')
  @Redirect('', 302)
  async handleRedirect(@Param('urlCode') urlCode: string) {
    let { id, clickCount, url } = await this.urlService.findByCode(urlCode);

    const data = {
      clickCount: clickCount + 1,
      lastVisited: Date(),
    };

    const update = await this.urlService.update(id, data);

    if (update) {
      return { url };
    }
  }
}
