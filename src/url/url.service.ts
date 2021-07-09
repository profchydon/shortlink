import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
