import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('returns service status indicator', () => {
    expect(appController.getStatus()).toBe('Localize backend is running');
  });

  it('returns admin smoke test response', () => {
    expect(appController.getAdminSmokeTest()).toBe('OK');
  });
});
