export default class Container {
  constructor (arg) {
    let { carrying, length, width, height } = arg;

    this.title = 'Container';

    this.carrying = carrying;
    this.width = width;
    this.length = length;
    this.height = height;
    this.children = []; // levellist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }

}
