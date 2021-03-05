class Anchor {
  constructor({ lt = {}, rt = {}, rb = {}, lb = {} } = {}) {
    this.lt = lt;
    this.rt = rt;
    this.rb = rb;
    this.lb = lb;
  }
  setLTRB({ lt = {}, rt = {}, rb = {}, lb = {} } = {}) {
    this.lt = lt;
    this.rt = rt;
    this.rb = rb;
    this.lb = lb;
  }
  updateL(pos = { x: 0, y: 0 }) {
    this.lt = pos;
  }
  updateT(pos = { x: 0, y: 0 }) {
    this.lt = pos;
  }
  updateR(pos = { x: 0, y: 0 }) {
    this.lt = pos;
  }
  updateB(pos = { x: 0, y: 0 }) {
    this.lt = pos;
  }
}

export default Anchor;
