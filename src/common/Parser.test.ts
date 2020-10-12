import ParserImpl from "./Parser";

test("Simple number 467801", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("467801")).toBe(parseInt("467801"));
});

test("Evaluate: 467+35", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("467+35")).toBe(parseInt("502"));
});

test("With spaces: 467  +   35", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("467 + 35")).toBe(parseInt("502"));
});

test("Evaluate: 1 + 2 + 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1 + 2 + 3")).toBe(parseInt("6"));
});

test("Evaluate: 11 + 23 + 345 +67", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("11 + 23 + 345 +67")).toBe(parseInt("446"));
});

test("Evaluate: 2*3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("2*3")).toBe(parseInt("6"));
});

test("Evaluate: 2*3*4", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("2*3*4")).toBe(parseInt("24"));
});

test("Evaluate: 2*3 + 4", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("2*3 + 4")).toBe(parseInt("10"));
});

test("Evaluate: 2*3 + 4*5", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("2*3 + 4*5")).toBe(parseInt("26"));
});

test("Evaluate: 12 + 3 * 14 +55", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("12 + 3 * 14 +55")).toBe(parseInt("109"));
});

test("Evaluate: 467-35", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("467-35")).toBe(parseInt("432"));
});

test("Evaluate: 467-35 - 56", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("467-35 - 56")).toBe(parseInt("376"));
});

test("Evaluate: 2*3 - 4", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("2*3 - 4")).toBe(parseInt("2"));
});

test("Evaluate: 4/2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4/2")).toBe(parseInt("2"));
});

test("Evaluate: 4/2 + 45", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4/2 + 45")).toBe(parseInt("47"));
});

test("Evaluate: 4%2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4%2")).toBe(parseInt("0"));
});

test("Evaluate: 4%2 + 10%8/2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4%2 + 10%8/2")).toBe(parseInt("1"));
});

test("Evaluate: 4^2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4^2")).toBe(parseInt("16"));
});

test("Evaluate: 4^2 + 50^4", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4^2 + 50^4")).toBe(parseInt("6250016"));
});

test("Evaluate: 4.2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4.2")).toBe(parseFloat("4.2"));
});

test("Evaluate: -1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("-1")).toBe(parseFloat("-1"));
});

test("Evaluate: (456)", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("(456)")).toBe(parseFloat("456"));
});

test("Evaluate: 1-(-1)", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1-(-1)")).toBe(parseFloat("2"));
});

test("Evaluate: 1--1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1--1")).toBe(parseFloat("2"));
});

test("Evaluate: --1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("--1")).toBe(parseFloat("1"));
});

test("Evaluate: 4 * (5 - 2)", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4 * (5 - 2)")).toBe(parseFloat("12"));
});

test("Evaluate: 4 * (5 - 2) + 56", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("4 * (5 - 2) + 56")).toBe(parseFloat("68"));
});

test("Evaluate: (4 * (5 - 2) + 56)", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("(4 * (5 - 2) + 56)")).toBe(parseFloat("68"));
});

test("Evaluate: 1024/(256-16*8) + (35 * (2+6))", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1024/(256-16*8) + (35 * (2+6))")).toBe(parseFloat("288"));
});

test("Evaluate: x, x = 123", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("x", [{ name: "x", value: 123 }])).toBe(parseFloat("123"));
});

test("Evaluate: -x, x = 1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("-x", [{ name: "x", value: 1 }])).toBe(parseFloat("-1"));
});

test("Evaluate: 1-x, x = -1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1-x", [{ name: "x", value: -1 }])).toBe(parseFloat("2"));
});

test("Evaluate: -x, x = -1", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("-x", [{ name: "x", value: -1 }])).toBe(parseFloat("1"));
});

test("Evaluate: (x), x = 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("(x)", [{ name: "x", value: 3 }])).toBe(parseFloat("3"));
});

test("Evaluate: -(x), x = 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("-(x)", [{ name: "x", value: 3 }])).toBe(parseFloat("-3"));
});

test("Evaluate: -(-x), x = 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("-(-x)", [{ name: "x", value: 3 }])).toBe(parseFloat("3"));
});

test("Evaluate: 1 / x, x = 2", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1 / x", [{ name: "x", value: 2 }])).toBe(parseFloat("0.5"));
});

test("Evaluate: 1 / x, x = 0", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("1 / x", [{ name: "x", value: 0 }])).toBe(parseFloat("Infinity"));
});

test("Evaluate: (x + 34) * 10 - 45, x = 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(calc.evaluate("(x + 34) * 10 - 45", [{ name: "x", value: 3 }])).toBe(parseFloat("325"));
});

test("Evaluate: a + b + c, a = 1, b = 2, c = 3", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(
    calc.evaluate("a + b + c", [
      { name: "a", value: 1 },
      { name: "b", value: 2 },
      { name: "c", value: 3 },
    ])
  ).toBe(parseFloat("6"));
});

test("Evaluate: (x^2 + 34*y) * 10 - 45, x = 3, y = 4", () => {
  const calc: ParserImpl = new ParserImpl();
  expect(
    calc.evaluate("(x^2 + 34*y) * 10 - 45", [
      { name: "x", value: 3 },
      { name: "y", value: 4 },
    ])
  ).toBe(parseFloat("1405"));
});
