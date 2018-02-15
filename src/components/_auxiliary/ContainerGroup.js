export default class ContainerGroup {
  constructor (arg) {
    let { title } = arg;

    this.title = title;

    this.children = []; // levellist
  }

  get (field) { return this[field] }
  set (field, value) { this[field] = value }
  add (field, value) { this[field] += value }

}
