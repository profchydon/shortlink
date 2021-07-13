import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validator } from 'class-validator';
import { Repository } from 'typeorm';
import { UrlDto } from './dto/url.dto';
import { Url } from './url.entity';

@Injectable()
export class UrlService {

  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async create(urlDto: UrlDto) {
    const url = this.urlRepository.create(urlDto);
    return this.urlRepository.save(url);
  }

  async find(shortUrl: string): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: {
        encodedUrl: shortUrl,
      },
    });
    if (!url) {
      throw new NotFoundException(`URL: #${shortUrl} not found`);
    }
    return url;
  }

  async findByCode(urlCode: string): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: {
        urlCode: urlCode,
      },
    });
    if (!url) {
      throw new NotFoundException(`URL: #${urlCode} not found`);
    }
    return url;
  }
}
