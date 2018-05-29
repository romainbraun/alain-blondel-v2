import Background from './painting.jpg';
import Panel from './panel';
import Point from "./point";
import PointsData from './points.json';
import { IPoint } from "./types";

/**
 * Main App
 *
 * @export
 * @class App
 */
export default class App {
  private height: number;
  private width : number;
  private ratio : number;
  private canvas: HTMLCanvasElement;
  private points: Point[] = [];
  private ctx   : CanvasRenderingContext2D;

  /**
   * Creates an instance of App.
   * @param {number} height Canvas height
   * @param {number} width Canvas width
   * @memberof App
   */
  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;

    this.createCanvas();
    this.animate();
    this.setupListeners();
    this.drawPoints();
  }

  /**
   * Create the canvas element and stores the context
   * 
   * @private
   * @memberof App
   */
  private createCanvas(): void {
    this.canvas = document.getElementById('app') as HTMLCanvasElement;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'xor';
    this.ctx.lineWidth = 3;
  }

  /**
   * Clears the canvas and updates each point
   * 
   * @private
   * @memberof App
   */
  private animate(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.forEach((point) => { point.draw(this.ctx); });

    window.requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Creates points at their respective positions
   * and stores them
   * 
   * @private
   * @memberof App
   */
  private drawPoints(): void {
    PointsData.forEach((pointData: IPoint) => {
      const point = new Point(pointData);
      this.points.push(point);
    });
  }

  /**
   * Creates mousedown listeners
   * 
   * @private
   * @memberof App
   */
  private setupListeners(): void {
    this.canvas.addEventListener('mousedown', this.clickHandler.bind(this));
  }

  /**
   * Checks for collision with existing points
   * 
   * @private
   * @param {MouseEvent} event 
   * @memberof App
   */
  private clickHandler(event: MouseEvent): void {
    const canvasTop: number = (event.target as HTMLElement).getBoundingClientRect().top;
    this.ratio = this.width / this.canvas.getBoundingClientRect().width;

    const hit = this.points.find((point: Point) => {
      return Math.abs(point.x - event.pageX * this.ratio) < 20 && 
             Math.abs(point.y - (event.pageY - canvasTop) * this.ratio) < 20;
    });

    if (hit) {
      const test = new Panel(hit.data);
      Panel.render(test);
    }
  }
}