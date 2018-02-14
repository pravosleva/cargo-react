export default class Level_algorithm1 {
  constructor (arg) {
    let { widthLimit, title } = arg;
    this.widthLimit = widthLimit;
    this.title = title;

    this.width = 0.0;
    this.length = 0.0;
    this.weight = 0.0;
    this.children = []; // cargolist
  }
  _getRemainedFreeWidth () {
    let _sw = 0;
    this.children.map((e, i, a) => {
      _sw += e.width + e.addSize;
    });
    return (this.widthLimit - _sw);
  }
  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }
  tryToSaveCargo (cargo) {
    cargo.title = cargo.name;
    let { width } = cargo;
    if (this._getRemainedFreeWidth() > width) {
      this.children.push(cargo);
      if (this.length < cargo.length) { this.set('length', cargo.length) }
      if (this.width < cargo.width) { this.set('width', cargo.width) }
      this.add('weight', cargo.weight);
      return true;
    } else {
      return false;
    }
  }
}
