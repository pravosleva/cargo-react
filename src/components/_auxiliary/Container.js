export default class Container {
  constructor (arg) {
    let { name, carrying, length, width, height } = arg;
    this.carrying = carrying;
    this.width = width;
    this.length = length;
    this.height = height;
    this.name = name;

    this.title = name; // basic title
    this.children = []; // productlist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }
  getFreeCarrying () {
    let { children: productlist } = this,
      currentTotalWeight = 0, free = 0;
    productlist.map((e, i, a) => currentTotalWeight += e.weight);
    free = this.carrying - currentTotalWeight;
    return free;
  }

  tryToAdd (newProd) {
    if (this.getFreeCarrying() > newProd.weight) { // TMP: критерий - только грузоподъемность
      this.children.push(newProd);
      return true
    } else {
      return false
    }
  }

  setTitle () {
    this.title = `${this.name} (${this.children.length} products, free= ${this.getFreeCarrying()} kg)`;
  }

}
