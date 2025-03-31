import { Layout } from "plotly.js";

const PlotlyDefaults = (maxY?: number) => {
  const plotlyDefaults: {
    layout: Partial<Layout>;
    config: Partial<Plotly.Config>;
  } = {
    layout: {
      autosize: true,
      xaxis: {
        fixedrange: true
      },
      yaxis: {
        fixedrange: true
      },
      font: {
        family: "'IBM Plex Sans', Arial, sans-serif"
      },
      legend: {
        orientation: "h",
        yanchor: "top",
        xanchor: "center",
        y: 1.15,
        x: 0.5
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)"
    },
    config: {
      displayModeBar: false,
      responsive: true
    }
  };

  if (maxY !== undefined && maxY <= 10) {
    plotlyDefaults.layout.yaxis = {
      ...plotlyDefaults.layout.yaxis,
      dtick: 1
    };
  }

  return plotlyDefaults;
};

export default PlotlyDefaults;
