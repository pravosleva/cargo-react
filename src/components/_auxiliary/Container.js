export default class Container {
  constructor (arg) {
    let { name, carrying, length, width, height, addSize } = arg;
    this.carrying = carrying;
    this.width = width;
    this.length = length;
    this.height = height;
    this.name = name;
    this.addSize = addSize;

    this.title = name; // basic title
    this.children = []; // productlist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }
  _getFree (propName) {
    let { children: productlist, addSize } = this,
      currentTotal = 0, free = 0;
    switch (propName) {
      case 'weight':
        productlist.map((e, i, a) => currentTotal += e[propName]);
        free = this.carrying - currentTotal;
        break;
      case 'length':
        productlist.map((e, i, a) => currentTotal += (e[propName] + e.addSize));
        free = this.length - currentTotal;
        break;
      default: break;
    }
    return free;
  }

  tryToAdd (newProd) {
    if (
      this._getFree('weight') > newProd.weight &&
      this._getFree('length') > newProd.length
    ) {

      // Before add the newProd to clildren...
      /*
        1.  группируем грузы с равными горизонтальными габаритами в один блок >
        2.  запрос на сервер за погонными метрами (ПМ) для каждого блока...
        3.  получаем ответ > суммируем ПМ или добавляем в новый контейнер.
        4.  сортируем по размерам блоков (от большего к меньшему)
      */
      // 1.
      let { children: productlist } = this;
      /*
      let blocklist = [];
      class Block {
        constructor (arg) {
          let { length, width } = arg;
          this.typeLength = length;
          this.typeWidth = width;
          this.elements = [];
        }
        addToBlock (newProd) {
          if (newProd.width === this.typeWidth && newProd.length === this.typeLength) {
            this.elements.push(newProd);
            return true;
          } else { return false }
        }
      };

      let block = new Block({ length:0, width:0 });

      this.children.map((prod, bi, ba) => {
        //let block = new Block({ });
        if (block.addToBlock(prod)) {
          // added to blocklist
        } else {
          console.log('HERE');
          blocklist.push(new Block(prod));
        }
      });
      */

      this.children.push(newProd);
      this.children.sort((p1, p2) => { return (p2.length - p1.length) }) // отсортировать от большего к меньшему by length
      return true;

    } else {
      return false;
    }
  }

  setTitle () {
    this.title = `${this.name} (${this.children.length} prods, free= ${this._getFree('weight')} kg)`;
  }

}
