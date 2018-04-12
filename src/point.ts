import { IPoint } from "./types";

export default class Point {
  public x: number;
  public y: number;
  private delay: number;
  private speed: number;
  private minimumRadius = 1;

  constructor(data: IPoint) {
    this.x = data.position.x;
    this.y = data.position.y;
    this.delay = Math.random() * 10000;
    this.speed = Math.random() * 100;
  }
  
  public draw(ctx: CanvasRenderingContext2D) {
    const radgrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 20);
    radgrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    // radgrad.addColorStop(0., 'rgba(255, 255, 255, 1)');
    radgrad.addColorStop(0.4, 'rgba(255,255, 255, .5)');
    radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = radgrad;
    ctx.beginPath();
    
    ctx.arc(
      this.x, 
      this.y, 
      this.calculateRadius(), 
      0, 
      360
    );
    ctx.stroke();
  }

  private calculateRadius(): number {
    const time: number = new Date().getTime();
    // console.log(Math.sin((time + this.delay) / (1000 - this.speed)));
    return this.minimumRadius + 
           (Math.cos((time + this.delay) / (1500 - this.speed)) + 1) 
           * 10;
  }
}