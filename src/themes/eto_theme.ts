import { createTheme } from "@mui/material/styles";
import { css } from "@emotion/react";
import IBMRegular from "./fonts/IBMPlexSans-Regular.ttf";
import IBMBold from "./fonts/IBMPlexSans-Bold.ttf";
import IBMMedium from "./fonts/IBMPlexSans-Medium.ttf";
import IBMLight from "./fonts/IBMPlexSans-Light.ttf";
import IBMLightItalic from "./fonts/IBMPlexSans-LightItalic.ttf";
const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Sans, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url(${IBMLight}) format('truetype');
        }
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: italic;
          font-weight: 300;
          font-display: swap;
          src: url(${IBMLightItalic}) format('truetype');
        }
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(${IBMRegular}) format('truetype');
        }
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(${IBMMedium}) format('truetype');
        }
        @font-face {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(${IBMBold}) format('truetype');
        }
      `,
    },
  },
});

export const fontRegular = css`
  font-family: "IBM Plex Sans", Arial, sans-serif;
  font-weight: 400;
`;

export const fontMedium = css`
  font-family: "IBM Plex Sans", Arial, sans-serif;
  font-weight: 500;
`;
export const fontBold = css`
  font-family: "IBM Plex Sans", Arial, sans-serif;
  font-weight: 700;
`;
export const fontLight = css`
  font-family: "IBM Plex Sans", Arial, sans-serif;
  font-weight: 300;
`;
export const fontLightItalic = css`
  font-family: "IBM Plex Sans", Arial, sans-serif;
  font-weight: 300;
  font-style: italic;
`;
export default theme;
