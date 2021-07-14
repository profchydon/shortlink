import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUrlDto } from './dto/update-url.dto';
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

  async findOne(shortUrl: string): Promise<Url> {
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

  async findByCode(urlCode: string): Promise<Url | null> {
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

  async update(id: string, urlDto: UpdateUrlDto): Promise<Url | null> {
    const url = await this.urlRepository.findOneOrFail(id);
    if (!url) {
      throw new NotFoundException(`URL #${id} not found`);
    }
    await this.urlRepository.update(id, urlDto);
    return await this.urlRepository.findOne(id);
  }
}
