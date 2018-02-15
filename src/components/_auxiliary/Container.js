export default class Container {
  constructor (arg) {
    let { title, carrying, length, width, height } = arg;

    this.carrying = carrying;
    this.width = width;
    this.length = length;
    this.height = height;
    this.title = `${title} ${length}x${width}x${height} mm ${carrying} kg`;
    this.children = []; // levellist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }

}
