import { Injectable } from '@nestjs/common';

/**
 * AppService exposes core application utilities.
 */
@Injectable()
export class AppService {
  /**
   * getServiceStatus provides a textual application health summary.
   */
  getServiceStatus(): string {
    return 'Localize backend is running';
  }

  /**
   * getSmokeTest delivers a static response for smoke testing.
   */
  getSmokeTest(): string {
    return 'OK';
  }
}
