import PointData from "./point-data";
import imageTemplate from "./templates/image-template.html";
import textTemplate from "./templates/text-template.html";

export default class Panel {
  public static render(panel: Panel): void {
    const test = document.createElement('div');
    test.innerHTML = panel.renderedTemplate;

    document.body.appendChild(test);

    const closeButton: HTMLElement = document.querySelector('.panel-close');

    closeButton.addEventListener('mousedown', (event) => {
      this.remove();
    });
    window.setTimeout(() => {
      document.querySelector('.panel').className += ' panel--show';
    });
  }

  public static remove(): void {
    const panel = document.querySelector('.panel');

    panel.className = panel.className.substring(0, panel.className.length - 12);
    window.setTimeout(() => {
      document.body.removeChild(document.querySelector('.panel').parentNode);
    }, 600);
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
    let template;

    switch (data.type) {
      case 'painting':
      case 'image':
        template = imageTemplate;
        break;
        case 'text':
        template = textTemplate;
        break;
    
      default:
        template = textTemplate;
        break;
    }

    return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable): string => {
      return (data[variable]) ? data[variable].toString() : '';
    });
  }

}