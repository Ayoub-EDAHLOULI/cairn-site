import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  approach,
  cubicPoint,
  falloff,
  hexToRgb,
  parseCubicPath,
  sliceTransform,
} from "./math.ts";

describe("falloff()", () => {
  test("is 1 at the centre and 0 at the radius and beyond", () => {
    assert.equal(falloff(0, 200), 1);
    assert.equal(falloff(200, 200), 0);
    assert.equal(falloff(500, 200), 0);
  });

  test("decreases with distance", () => {
    assert.ok(falloff(50, 200) > falloff(100, 200));
    assert.ok(falloff(100, 200) > falloff(150, 200));
  });
});

describe("approach()", () => {
  test("moves the given fraction of the way", () => {
    assert.equal(approach(0, 10, 0.25), 2.5);
    assert.equal(approach(10, 10, 0.5), 10);
  });
});

describe("sliceTransform()", () => {
  test("covers the canvas in both directions, centred", () => {
    const wide = sliceTransform(2800, 900, 1400, 900);
    assert.equal(wide.scale, 2);
    assert.equal(wide.offsetX, 0);
    assert.equal(wide.offsetY, -450);

    const tall = sliceTransform(390, 900, 1400, 900);
    assert.equal(tall.scale, 1);
    assert.equal(tall.offsetX, -505);
    assert.equal(tall.offsetY, 0);
  });
});

describe("parseCubicPath() and cubicPoint()", () => {
  test("parses the start point and every cubic segment", () => {
    const path = parseCubicPath("M0,-225 C180,-235 320,-145 330,-15 C340,125 200,215 10,225Z");
    assert.deepEqual(path.start, [0, -225]);
    assert.equal(path.segments.length, 2);
    assert.deepEqual(path.segments[1], [340, 125, 200, 215, 10, 225]);
  });

  test("a cubic starts at p0 and ends at p3", () => {
    assert.equal(cubicPoint(1, 5, 9, 4, 0), 1);
    assert.equal(cubicPoint(1, 5, 9, 4, 1), 4);
  });
});

describe("hexToRgb()", () => {
  test("converts the accent color", () => {
    assert.deepEqual(hexToRgb("#6050dc"), [96, 80, 220]);
  });
});
