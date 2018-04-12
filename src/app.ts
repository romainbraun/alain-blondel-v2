import Background from './painting.jpg';
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
  private width: number;
  private ratio: number;
  private background : HTMLImageElement;
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
    // this.importBackground();
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
    this.ctx.lineWidth = 3;
  }

  /**
   * Load the painting for the background
   * 
   * @private
   * @memberof App
   */
  private importBackground(): void {
    this.background = new Image();
    this.background.src = Background;

    this.background.onload = () => {
      this.animate();
    };
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.forEach((point) => { point.draw(this.ctx); });

    window.requestAnimationFrame(this.animate.bind(this));
  }

  private drawPoints(): void {
    PointsData.forEach((pointData: IPoint) => {
      const point = new Point(pointData);
      this.points.push(point);
    });
  }

  private setupListeners() {
    this.canvas.addEventListener('mousedown', (event) => {
      this.ratio =  this.width / this.canvas.getBoundingClientRect().width;
      const hit = this.points.some((point) => {
        return Math.abs(point.x - event.pageX * this.ratio) < 10 && 
               Math.abs(point.y - event.pageY * this.ratio) < 10;
      });
    });
  }
}