import { Test, TestingModule } from '@nestjs/testing';
import { QubeController } from './qube.controller';
import { QubeService } from './qube.service';

describe('QubeController', () => {
  let controller: QubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QubeController],
      providers: [QubeService],
    }).compile();

    controller = module.get<QubeController>(QubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
