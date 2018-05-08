import PointData from "./point-data";
import imageTemplate from "./templates/image-template.html";

export default class Panel {
  public static render(panel: Panel): void {
    const test = document.createElement('div');
    test.innerHTML = panel.renderedTemplate;

    document.body.appendChild(test);
  }

  public title: string;
  public asset: string;
  public content: string;
  public renderedTemplate: string;

  constructor(data: PointData) {
    this.title = data.title;
    this.asset = data.asset;
    this.content = data.content;
    this.renderedTemplate = this.template(data);
  }

  private template(data: PointData): string {
    return imageTemplate.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable): string => {
      return data[variable].toString() || '';
    });
  }

}