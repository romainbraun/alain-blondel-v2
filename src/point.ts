import { IPoint } from "./types";

export default class Point {
  public x: number;
  public y: number;
  private delay: number;
  private speed: number;
  private gradient: CanvasGradient;
  private minimumRadius = 1;

  constructor(data: IPoint) {
    this.x = data.position.x;
    this.y = data.position.y;
    this.delay = Math.random() * 10000;
    this.speed = Math.random() * 100;
  }
  
  public draw(ctx: CanvasRenderingContext2D) {
    this.setGradient(ctx);
    
    ctx.beginPath();
    ctx.arc(
      this.x, 
      this.y, 
      this.pulse(), 
      0, 
      360
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      this.x, 
      this.y, 
      this.breathe(), 
      0, 
      360
    );
    ctx.stroke();
  }

  private setGradient(ctx: CanvasRenderingContext2D) {
    this.gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 30);
    this.gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    this.gradient.addColorStop(0.4, 'rgba(255,255, 255, .5)');
    this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = this.gradient;
  }

  private pulse(): number {
    const time: number = new Date().getTime();
    return this.minimumRadius + 
          (time + this.delay) / (2000 - this.speed) % 6
           * 15;
  }

  private breathe(): number {
    const time: number = new Date().getTime();
    return this.minimumRadius + 
           (Math.cos((time + this.delay) / (1000 - this.speed)) + 1)
           * 15;
  }
}