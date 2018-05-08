import { IPoint } from "./types";

interface IndexSignature {
  [key: string]: string;
  title: string;
  size: string;
  asset: string;
  content: string;
  type: string;
}
export default class PointData implements IndexSignature {
  [key: string]: string;
  public title: string;
  public size: string;
  public asset: string;
  public content: string;
  public type: string;

  constructor(data: IPoint) {
    this.title   = data.title;
    this.size    = data.size;
    this.asset   = data.asset;
    this.content = data.content;
    this.type    = data.type;
  }
}