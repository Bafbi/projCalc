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
  ): [number, number] {
    console.log(`POST /time ${calcule} ${time}`);
    return this.appService.postTime(calcule, time);
  }

  @Get('/time')
  getTime(@Query('calcule') calcule: string): number[] {
    console.log(`GET /time ${calcule}`);
    return this.appService.getTime(calcule);
  }

  @Post('/error')
  postError(): [number, number] {
    console.log(`POST /error`);
    return this.appService.postError();
  }
}
