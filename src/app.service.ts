import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private times: Map<string, number[]> = new Map();
  private errors: number[] = [];

  postTime(calcule: string, time: number): [number, number] {
    console.log(calcule);

    this.times.set(calcule, [...(this.times.get(calcule) || []), time]);
    console.log(this.times.get(calcule));

    // return the poucentage of time slower than input and the mean time
    return [
      this.times.get(calcule).filter((t) => t > time).length /
        this.times.get(calcule).length,
      this.times.get(calcule).reduce((a, b) => a + b, 0) /
        this.times.get(calcule).length,
    ];
  }

  getTime(calcule: string): number[] {
    console.log(calcule);

    console.log(this.times.get(calcule));

    return this.times.get(calcule) || [];
  }

  postError(): [number, number] {
    const lastError = this.errors[this.errors.length - 1];
    this.errors.push(Date.now());
    return [this.errors.length, lastError];
  }

  getHello(): string {
    return 'Hello World!';
  }
}
