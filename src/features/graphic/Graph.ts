import ParserImpl from "../../common/Parser";

export default class Graph {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeigth: number;
  graphWidth: number;
  graphHeigth: number;
  scaleX: number = 1;
  scaleY: number = 1;

  constructor(width: number, heigth: number) {
    this.canvasWidth = width;
    this.canvasHeigth = heigth;
    this.graphWidth = width * 0.8;
    this.graphHeigth = heigth * 0.8;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "#000000";
    this._drawAxis();
  }

  _convertXY(x: number, y: number): [number, number] {
    const canvasX = this.canvasWidth / 2 + x * this.scaleX;
    const canvasY = this.canvasHeigth / 2 - y * this.scaleY;
    return [canvasX, canvasY];
  }

  _drawAxis(min?, max?) {
    // X
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasHeigth / 2);
    this.ctx.lineTo(this.canvasWidth, this.canvasHeigth / 2);
    this.ctx.stroke();

    const markerLength = 3;
    this.ctx.font = "14px serif";

    let rigthMarkerX = this.canvasWidth / 2 + this.graphWidth / 2;
    let leftMarkerX = this.canvasWidth / 2 - this.graphWidth / 2;
    const rigthMarkerY = this.canvasHeigth / 2;
    const leftMarkerY = this.canvasHeigth / 2;
    let leftMarkerText = min;
    let rightMarkerText = max;

    if (Math.abs(min) < Math.abs(max)) {
      rigthMarkerX = this.canvasWidth / 2 + (this.graphWidth / 2) * (min / max);
      leftMarkerX = this.canvasWidth / 2 + this.graphWidth / 2;
      leftMarkerText = max;
      rightMarkerText = min;
    } else if (Math.abs(min) > Math.abs(max)) {
      rigthMarkerX = this.canvasWidth / 2 - (this.graphWidth / 2) * (max / min);
      leftMarkerX = this.canvasWidth / 2 - this.graphWidth / 2;
    }

    // right marker
    this.ctx.beginPath();
    this.ctx.moveTo(rigthMarkerX, rigthMarkerY - markerLength);
    this.ctx.lineTo(rigthMarkerX, rigthMarkerY + markerLength);
    this.ctx.stroke();

    this.ctx.fillText(rightMarkerText, rigthMarkerX + 2, rigthMarkerY + 15);

    // left marker
    this.ctx.beginPath();
    this.ctx.moveTo(leftMarkerX, leftMarkerY - markerLength);
    this.ctx.lineTo(leftMarkerX, leftMarkerY + markerLength);
    this.ctx.stroke();

    this.ctx.fillText(leftMarkerText, leftMarkerX + 2, leftMarkerY + 15);

    // Y
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvasWidth / 2, 0);
    this.ctx.lineTo(this.canvasWidth / 2, this.canvasHeigth);
    this.ctx.stroke();
  }

  plot(expression: string, min: number, max: number) {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);

    const parser: ParserImpl = new ParserImpl();
    const maxX = Math.max(Math.abs(min), Math.abs(max));
    const step: number = maxX / this.graphWidth;
    this.scaleX = this.graphWidth / 2 / maxX;

    // calculate points
    const coordinates = [];

    let maxY = 0;
    for (let x: number = min; x <= max; x = x + step) {
      const y = parser.evaluate(expression, [{ name: "x", value: x }]);
      coordinates.push({ x, y });
      maxY = Math.max(maxY, Math.abs(y));
    }

    const newCoordinates = this._cutBreakpoint(coordinates, maxY);

    maxY = 0;
    newCoordinates.forEach((value) => {
      if (value.y !== undefined) {
        maxY = Math.max(maxY, Math.abs(value.y));
      }
    });

    this.scaleY = this.scaleX;

    // draw
    this.ctx.beginPath();

    newCoordinates.forEach((value) => {
      if (value.y !== undefined) {
        const [canvasX, canvasY] = this._convertXY(value.x, value.y);
        this.ctx.lineTo(canvasX, canvasY);
      } else {
        this.ctx.stroke();
        this.ctx.beginPath();
      }
    });

    this.ctx.stroke();

    this._drawAxis(min, max);
  }

  _cutBreakpoint(coordinates: Array<{ x: number; y: number }>, maxY): Array<{ x; y }> {
    const newCoordinates = coordinates.slice();

    for (let index = 0; index < coordinates.length; index++) {
      if (maxY === Math.abs(coordinates[index].y)) {
        for (let i = 0; i < 5; i++) {
          if (coordinates[index + i]) {
            coordinates[index + i].y = undefined;
          }
          if (coordinates[index - i]) {
            coordinates[index - i].y = undefined;
          }
        }
        break;
      }
    }

    return newCoordinates;
  }
}
