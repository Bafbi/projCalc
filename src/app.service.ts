import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private times: Map<string, number[]> = new Map();

  postTime(calcule: string, time: number): number {
    this.times.set(calcule, [...(this.times.get(calcule) || []), time]);
    console.log(this.times.get(calcule));

    // return the poucentage of time faster than input
    return (
      this.times.get(calcule).filter((t) => t < time).length /
      this.times.get(calcule).length
    );
  }

  getTime(calcule: string): number[] {
    console.log(calcule);

    console.log(this.times.get(calcule));

    return this.times.get(calcule) || [];
  }

  getHello(): string {
    return 'Hello World!';
  }
}
