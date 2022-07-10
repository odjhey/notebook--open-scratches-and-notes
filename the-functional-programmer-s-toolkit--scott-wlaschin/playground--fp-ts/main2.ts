import { option, array } from "fp-ts";
import { pipe, flow } from "fp-ts/function";
import { z } from "zod";

function main() {
  const val1 = (x: number) => {
    return z.number().min(1).max(10).safeParse(x);
  };
  const val2 = (x: number) => {
    return z.number().min(5).max(5).safeParse(x);
  };

  type A = z.SafeParseReturnType<number, number>;

  const unit = (v) => z.number().safeParse(v);

  const valBind_1 = (fn) => (x: A) => {
    if (x.success) {
      return fn(x.data);
    }

    return x;
  };

  const result = flow(valBind_1(val1), valBind_1(val2))(unit(11));

  console.log(result);
}

main();
