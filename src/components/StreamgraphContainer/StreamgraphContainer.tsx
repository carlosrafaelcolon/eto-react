/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import Streamgraph from "./Streamgraph";
import { HelpTooltip } from "../../eto-components";
import { css } from "@emotion/react";
interface StreamgraphData {
  risk_factors: {
    date: string;
    category: string;
    value: number;
  }[];
  harms: {
    date: string;
    category: string;
    value: number;
  }[];
  applications: {
    date: string;
    category: string;
    value: number;
  }[];
}
const styles = {
  radioGroup: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    .MuiRadio-root.Mui-checked {
      color: var(--purple);
    }
    .MuiFormControlLabel-label {
      font-size: 14px;
    }
  `,
  chartContainer: css`
    margin-bottom: 1.5rem;
    .chart-title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      font-weight: 400;
      color: #858181;
    }
  `,
};

const StreamgraphContainer = ({ data }: { data: StreamgraphData }) => {
  const [selectedOption, setSelectedOption] =
    useState<keyof typeof data>("risk_factors");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as keyof typeof data);
  };
  return (
    <div css={styles.chartContainer}>
      <RadioGroup
        value={selectedOption}
        onChange={handleRadioChange}
        css={styles.radioGroup}
      >
        <FormControlLabel
          value="risk_factors"
          control={<Radio />}
          label={
            <span>
              Risk Factors Governed{" "}
              <HelpTooltip
                text={`Risk Factors Governed refers to the types of risks or risk factors that policies explicitly address to make AI systems more or less risky. Examples include bias, reliability, safety, and security. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.9c8kxeh48q5i" target="_blank" rel="noopener noreferrer">Learn more</a>`}
              />
            </span>
          }
        />
        <FormControlLabel
          value="harms"
          control={<Radio />}
          label={
            <span>
              Harms Addressed{" "}
              <HelpTooltip
                text={`Harms Addressed refers to the real-world consequences of AI use or development that policies aim to prevent, such as harm to health, property, or infrastructure. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.1modprt4477t" target="_blank" rel="noopener noreferrer">Learn more</a>`}
              />
            </span>
          }
        />
        <FormControlLabel
          value="applications"
          control={<Radio />}
          label={
            <span>
              Applications{" "}
              <HelpTooltip
                text={`Applications refer to the real-world domains where AI is explicitly used, such as medicine, transportation, and finance. <a href="https://docs.google.com/document/d/1A9z0EwSr2sOizAEAm4-M8B8YXLoHonnFT57yfi0q7cw/edit?tab=t.0#heading=h.gss87so62q7v" target="_blank" rel="noopener noreferrer">Learn more</a>`}
              />
            </span>
          }
        />
      </RadioGroup>
      <h1 className="chart-title">
        {selectedOption === "risk_factors"
          ? "AI Risk Factors Governed Over Time"
          : selectedOption === "harms"
          ? "AI-Related Harms Addressed Over Time"
          : selectedOption === "applications"
          ? "AI Application Domains Addressed Over Time"
          : "AI Policy Trends Over Time"}
      </h1>
      <Streamgraph
        data={data[selectedOption]}
        selectedCategory={selectedOption}
        xLabel="Most Recent Activity Date"
        yLabel="Number of Documents"
      />
    </div>
  );
};

export default StreamgraphContainer;
