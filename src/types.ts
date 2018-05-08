export interface IPoint {
  title: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
  content?: string;
  asset?: string;
  size?: string;
  [key: string]: string | object;
}