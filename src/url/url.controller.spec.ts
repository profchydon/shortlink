import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UrlController } from './url.controller';
import { Url } from './url.entity';
import { UrlService } from './url.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockUrlRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('UrlController', () => {
  let urlController: UrlController;
  let spyService: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        UrlService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Url), useValue: mockUrlRepository() },
      ],
    }).compile();

    urlController = module.get<UrlController>(UrlController);
    spyService = module.get<UrlService>(UrlService);
    process.env.baseURL = 'http://localhost:5000';
  });

  it('should be defined', () => {
    expect(urlController).toBeDefined();
  });

  describe('encodeUrl', () => {
    it('should encode provided url', async () => {
      const baseUrl = process.env.baseURL;
      const url = 'https://indicina.co/';
      const encodedurl = await urlController.encodeUrl(url);

      const encodedurlData = {
        url: 'https://indicina.co/',
        urlCode: encodedurl.urlCode,
        encodedUrl: `${baseUrl}/${encodedurl.urlCode}`,
      };

      expect(encodedurl).toEqual(encodedurlData);
    });
  });

  // describe('decodeUrl', () => {
  //   it('should decode provided short url', async () => {
  //     const baseUrl = process.env.baseURL;
  //     const shortUrl = `${baseUrl}/YBN-BD`;

  //     const decodedurl = await urlController.decodeUrl(shortUrl);
  //     expect(spyService.findOne).toHaveBeenCalled();

  //     const message = 'URL: #http://localhost:5000/YBN-BD not found';

  //     expect(decodedurl).toEqual(message);
  //   });
  // });

});
