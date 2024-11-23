/* eslint-disable prettier/prettier */
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('daily')
  async getDailyReport(@Query('date') date: string) {
    if (!date) {
      throw new HttpException('Date is required', HttpStatus.BAD_REQUEST);
    }
    return await this.reportsService.generateDailyReport(date);
  }
}
