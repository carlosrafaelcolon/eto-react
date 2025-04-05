import { render, screen } from "@testing-library/react";
import { scaleLinear, scaleBand } from "d3-scale";

import Axis from "./Axis";
import Chart from "../Chart";
import { Dimensions } from "../utils";

const dummyDimensions: Dimensions = {
  width: 500,
  height: 500,
  marginTop: 10,
  marginRight: 20,
  marginBottom: 20,
  marginLeft: 10,
  boundedWidth: 470,
  boundedHeight: 470,
};

describe("AxisHorizontal", () => {
  it("renders the correct number of ticks for a continuous scale", () => {
    const linearScale = scaleLinear()
      .domain([0, 100])
      .range([0, dummyDimensions.boundedWidth ?? 470]);

    render(
      <Chart dimensions={dummyDimensions}>
        <Axis
          direction="x"
          scale={linearScale}
          formatTick={(d) => d.toString()}
        />
      </Chart>
    );

    const tickTexts = screen.getAllByText(/^\d+$/);

    expect(tickTexts.length).toBeGreaterThanOrEqual(2);
    expect(tickTexts.length).toBeLessThanOrEqual(7);
  });
  it("respects a custom maxTicks", () => {
    const linearScale = scaleLinear()
      .domain([0, 100])
      .range([0, dummyDimensions.boundedWidth ?? 470]);

    render(
      <Chart dimensions={{ boundedWidth: 470, boundedHeight: 300 }}>
        <Axis
          direction="x"
          scale={linearScale}
          formatTick={(d) => d.toString()}
          maxTicks={5}
        />
      </Chart>
    );

    const tickTexts = screen.getAllByText(/^\d+$/);
    expect(tickTexts.length).toBeLessThanOrEqual(6);
  });

  it("rotates tick labels when spacing is too small", () => {
    const smallDimensions = { ...dummyDimensions, boundedWidth: 200 };
    const linearScale = scaleLinear()
      .domain([0, 100])
      .range([0, smallDimensions.boundedWidth]);

    render(
      <Chart dimensions={smallDimensions}>
        <Axis
          direction="x"
          scale={linearScale}
          formatTick={(d) => d.toString()}
          rotateThreshold={40}
        />
      </Chart>
    );

    const tickTexts = screen.getAllByText(/^\d+$/);
    tickTexts.forEach((textElement) => {
      expect(textElement.getAttribute("transform")).toContain("rotate(-45)");
    });
  });

  it("renders band scale ticks without using ticks", () => {
    const categories = ["A", "B", "C"];
    const bandScale = scaleBand()
      .domain(categories)
      .range([0, dummyDimensions.boundedWidth ?? 470])
      .padding(0.1);

    render(
      <Chart dimensions={dummyDimensions}>
        <Axis direction="x" scale={bandScale} formatTick={(d) => d} />
      </Chart>
    );

    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });
  it("updates tick count on resize", () => {
    const largeDimensions = {
      ...dummyDimensions,
      width: 1000,
      boundedWidth: 970,
    };
    const { rerender } = render(
      <Chart dimensions={largeDimensions}>
        <Axis
          direction="x"
          scale={scaleLinear()
            .domain([0, 100])
            .range([0, dummyDimensions.boundedWidth ?? 470])}
          formatTick={(d) => d.toString()}
        />
      </Chart>
    );

    let tickTexts = screen.getAllByText(/^\d+$/);
    const initialCount = tickTexts.length;

    const smallerDimensions = { ...dummyDimensions, boundedWidth: 200 };
    rerender(
      <Chart dimensions={smallerDimensions}>
        <Axis
          direction="x"
          scale={scaleLinear()
            .domain([0, 100])
            .range([0, smallerDimensions.boundedWidth])}
          formatTick={(d) => d.toString()}
        />
      </Chart>
    );

    tickTexts = screen.getAllByText(/^\d+$/);
    expect(tickTexts.length).toBeLessThan(initialCount);
  });
});

describe("AxisVertical", () => {
  it("renders the correct number of ticks for a continuous vertical scale", () => {
    const linearScale = scaleLinear()
      .domain([0, 100])
      .range([dummyDimensions.boundedHeight ?? 470, 0]);

    render(
      <Chart dimensions={dummyDimensions}>
        <Axis
          direction="y"
          scale={linearScale}
          formatTick={(d) => d.toString()}
        />
      </Chart>
    );

    const tickTexts = screen.getAllByText(/^\d+$/);
    expect(tickTexts.length).toBeGreaterThanOrEqual(2);
    expect(tickTexts.length).toBeLessThanOrEqual(11);
  });
  it("logs an error and renders nothing if passed a scale without `ticks()` (e.g., scaleBand)", () => {
    const bandScale = scaleBand().domain(["A", "B", "C"]).range([0, 300]);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <Chart dimensions={{ boundedWidth: 300, boundedHeight: 300 }}>
        <Axis
          direction="y"
          scale={bandScale}
          formatTick={(d) => d.toString()}
        />
      </Chart>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "The provided scale does not support the 'ticks' method."
    );

    expect(screen.queryAllByText(/^\d+$/)).toHaveLength(0);

    consoleErrorSpy.mockRestore();
  });
});
