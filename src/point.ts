import PointData from "./point-data";
import { IPoint } from "./types";

/**
 * Clickable Point
 * 
 * @export
 * @class Point
 */
export default class Point {
  public x: number;
  public y: number;
  public data: PointData;
  
  private delay: number;
  private speed: number;
  private gradient: CanvasGradient;
  private minimumRadius = 1;

  /**
   * Creates an instance of Point.
   * @param {IPoint} data 
   * @memberof Point
   */
  constructor(data: IPoint) {
    this.x = data.position.x;
    this.y = data.position.y;
    this.delay = Math.random() * 10000;
    this.speed = Math.random() * 100;

    this.data = new PointData(data);
  }
  
  /**
   * Updates the Point radius and draws it on the context
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @memberof Point
   */
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

  /**
   * Creates new radial gradient for the Point
   * 
   * @private
   * @param {CanvasRenderingContext2D} ctx 
   * @memberof Point
   */
  private setGradient(ctx: CanvasRenderingContext2D): void {
    this.gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 30);
    this.gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    this.gradient.addColorStop(0.4, 'rgba(255,255, 255, .5)');
    this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = this.gradient;
  }

  /**
   * Calculate the circle radius for the pulse animation
   * 
   * @private
   * @returns {number} 
   * @memberof Point
   */
  private pulse(): number {
    const time: number = new Date().getTime();
    return this.minimumRadius + 
          (time + this.delay) / (2000 - this.speed) % 6
           * 15;
  }

  /**
   * Calculate the circle radius for the breathing animation
   * 
   * @private
   * @returns {number} 
   * @memberof Point
   */
  private breathe(): number {
    const time: number = new Date().getTime();
    return this.minimumRadius + 
           (Math.cos((time + this.delay) / (1000 - this.speed)) + 1)
           * 15;
  }
}