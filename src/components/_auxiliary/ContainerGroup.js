export default class ContainerGroup {
  constructor (arg) {
    let { name } = arg;
    this.name = name;

    this.title = name;
    this.children = []; // containerlist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }

  addContainer (container) {
    this.children.push(container);
  }

  setTitle () {
    this.title = `${this.name} (${this.children.length} containers)`;
  }

}
