import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Url } from './url.entity';
import { UrlService } from './url.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockUrlRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('UrlService', () => {
  let service: UrlService;
  let urlRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Url), useValue: mockUrlRepository() },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    urlRepository = module.get<MockRepository>(getRepositoryToken(Url));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('it creates a url record', () => {
      it('should return the url object', async () => {

        const createUrlData = {
          url: 'https://indicina.co/',
          urlCode: 'yRM-Rn',
          encodedUrl: 'http://localhost:5000/BSCLwV',
        };

        const expectedUrl = {
          url: 'https://indicina.co/',
          encodedUrl: 'http://localhost:5000/BSCLwV',
          urlCode: 'BSCLwV',
          lastVisited: null,
          id: '86bd3b06-6d55-4fde-8524-69350edc5da2',
          clickCount: 0,
          createdAt: '2021-07-13T08:30:21.477Z',
          updatedAt: '2021-07-13T08:30:21.477Z',
        };

        urlRepository.create.mockReturnValue(expectedUrl);
        const value = await service.create(createUrlData);

        urlRepository.save.mockReturnValue(expectedUrl);
        const savedUrl = await urlRepository.save(value);

        expect(savedUrl).toEqual(expectedUrl);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const urlCode = 'yDjw-N';
        urlRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(urlCode);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`URL: #${urlCode} not found`);
        }
      });
    });
  });

  describe('findOne', () => {
    describe('when record with shortUrl exists', () => {
      it('should return the url object', async () => {
        const shortUrl = 'http://localhost:5000/yDjw-N';
        const expectedUrl = {};

        urlRepository.findOne.mockReturnValue(expectedUrl);
        const url = await service.findOne(shortUrl);
        expect(url).toEqual(expectedUrl);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const shortUrl = 'http://localhost:5000/yDjw-N';
        urlRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(shortUrl);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`URL: #${shortUrl} not found`);
        }
      });
    });
  });

  describe('findByCode', () => {
    describe('when record with UrlCode exists', () => {
      it('should return the url object', async () => {
        const urlCode = 'yDjw-N';
        const expectedUrl = {};

        urlRepository.findOne.mockReturnValue(expectedUrl);
        const url = await service.findByCode(urlCode);
        expect(url).toEqual(expectedUrl);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const urlCode = 'yDjw-N';
        urlRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(urlCode);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`URL: #${urlCode} not found`);
        }
      });
    });
  });
});
