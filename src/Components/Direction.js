class Direction {
  constructor({ l = false, t = false, r = false, b = false } = {}) {
    this.l = l;
    this.t = t;
    this.r = r;
    this.b = b;
  }
  setLTRB({ l = false, t = false, r = false, b = false } = {}) {
    this.l = l;
    this.t = t;
    this.r = r;
    this.b = b;
    this.setCursorType();
  }
  setCursorType() {
    this.direction = "";
    if (this.l || this.r) {
      this.direction = "ew";
    }
    if (this.t || this.b) {
      this.direction = "ns";
    }
  }
}

export default Direction;
