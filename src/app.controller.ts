import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/time')
  postTime(
    @Body('calcule') calcule: string,
    @Body('time') time: number,
  ): number {
    return this.appService.postTime(calcule, time);
  }

  @Get('/time')
  getTime(@Query('calcule') calcule: string): number[] {
    return this.appService.getTime(calcule);
  }
}
