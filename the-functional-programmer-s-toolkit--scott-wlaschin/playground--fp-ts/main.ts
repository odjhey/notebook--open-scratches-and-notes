import { option, array } from "fp-ts";
import { pipe, flow } from "fp-ts/function";

function main() {
  const adder = (a: number) => a + 1;

  const res = option.map(adder)(option.some(2));
  console.log(res);

  const res2 = array.map(adder)([1, 2, 3]);
  console.log("--", res2);

  class Mon {
    constructor(public val: number | string) {
      this.val = val;
    }
  }

  const unit = (v) => new Mon(v);
  const mapMon = (f) => (m) => new Mon(f(m.val));

  const _bindMon = (fn, mon) => {
    if (typeof mon.val === "string") {
      return fn(parseInt(mon.val));
    }
    return fn(mon.val);
  };

  const bindMon_1 = (fn) => (mon) => {
    if (typeof mon.val === "string") {
      return fn(unit(parseInt(mon.val, 10)));
    }
    return fn(mon);
  };

  const mon3 = flow(
    bindMon_1(mapMon((a) => a + 1)),
    bindMon_1(mapMon((a) => a + 7))
  )(unit("10"));

  console.log(mon3);
}

main();
