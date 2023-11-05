import { Test, TestingModule } from '@nestjs/testing';
import { QubeService } from './qube.service';

describe('QubeService', () => {
  let service: QubeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QubeService],
    }).compile();

    service = module.get<QubeService>(QubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
