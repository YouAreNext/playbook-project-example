import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * AppController provides base application endpoints.
 */
@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * getStatus exposes the application status endpoint.
   */
  @Get('status')
  @ApiOperation({ summary: 'Retrieve backend service status.' })
  @ApiOkResponse({ description: 'Service status string.', schema: { type: 'string', example: 'Localize backend is running' } })
  getStatus(): string {
    return this.appService.getServiceStatus();
  }

  /**
   * getAdminSmokeTest exposes a smoke test endpoint for monitoring.
   */
  @Get('admin/test')
  @ApiOperation({ summary: 'Execute smoke test for monitoring systems.' })
  @ApiOkResponse({ description: 'Smoke test success response.', schema: { type: 'string', example: 'OK' } })
  getAdminSmokeTest(): string {
    return this.appService.getSmokeTest();
  }
}
