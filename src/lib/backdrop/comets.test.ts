import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { cometOpacity, emission, stepHead, wrapIndex } from "./comets.ts";

describe("wrapIndex() and stepHead()", () => {
  test("wrap around a closed ring in both directions", () => {
    assert.equal(wrapIndex(402, 400), 2);
    assert.equal(wrapIndex(-3, 400), 397);
    assert.equal(stepHead(399, 0.5, 4, 400), 1);
    assert.equal(stepHead(1, -0.5, 4, 400), 399);
  });
});

describe("cometOpacity()", () => {
  test("is invisible before birth and after death, full in mid-life", () => {
    assert.equal(cometOpacity(0, 1000), 0);
    assert.equal(cometOpacity(1000, 1000), 0);
    assert.equal(cometOpacity(300, 1000), 1);
  });

  test("fades in quickly and out slowly", () => {
    assert.ok(cometOpacity(40, 1000) > 0 && cometOpacity(40, 1000) < 1);
    assert.ok(cometOpacity(800, 1000) > cometOpacity(900, 1000));
  });
});

describe("emission()", () => {
  test("a resting or slow cursor launches nothing", () => {
    assert.deepEqual(emission(0, 16, 0), { count: 0, carry: 0 });
    assert.equal(emission(0.1, 16, 0).count, 0);
  });

  test("faster movement launches more, up to a ceiling", () => {
    const slow = emission(0.5, 1000, 0).count;
    const fast = emission(2, 1000, 0).count;
    const frantic = emission(50, 1000, 0).count;
    assert.ok(fast > slow);
    assert.equal(frantic, 30);
  });

  test("fractions carry over between frames", () => {
    let carry = 0;
    let launched = 0;
    for (let frame = 0; frame < 60; frame++) {
      const result = emission(0.5, 16, carry);
      launched += result.count;
      carry = result.carry;
    }
    // 0.35 px/ms above the minimum × 0.012 × 960 ms ≈ 4 comets.
    assert.equal(launched, 4);
  });
});
