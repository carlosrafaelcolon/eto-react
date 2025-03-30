/** @jsxImportSource @emotion/react */
import {ReactNode, CSSProperties, ElementType} from "react";
import breakpoints from "../util/breakpoints";
import { css, Interpolation, Theme } from "@emotion/react";
import ButtonStyled from "./ButtonStyled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExternalLink from "./ExternalLink";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { fontRegular, fontMedium, fontLight } from "../themes/eto_theme";
import { classes } from "../util";
const styles = {
  infocardWrapper: css`
    --infocard-color: var(--bright-blue);
    --infocard-color-light: var(--bright-blue-light);
    --infocard-color-lighter: var(--bright-blue-lighter);
    --infocard-color-lightest: var(--bright-blue-lightest);
    --infocard-content-padding: 25px;
    background-color: white;
    border-left: 1px solid var(--infocard-color);
    display: grid;
    ${fontLight};
    grid-template-columns: 10px 10px 1fr;
    grid-template-rows: fit-content(60px) min-content min-content min-content;
    grid-template-areas: "accent bottomborder maintitle" ". . contents" ". . sidebartitle" ". . sidebar" ". . button" ". . children";
    line-height: 1.4;
    margin: 50px 15px;
    ${breakpoints.small} {
      grid-template-columns: 10px 15px 1fr fit-content(360px);
      grid-template-rows: fit-content(60px) 1fr min-content auto;
      grid-template-areas: "accent bottomborder maintitle sidebartitle" ". . contents sidebar" ". . button sidebar" ". . children children";
      margin: 75px 65px;
    }
  `,

  accent: css`
    background-color: var(--infocard-color);
    grid-area: accent;
  `,

  bottomBorderGridArea: css`
    grid-area: bottomborder;
  `,
  topAreaBottomBorder: css`
    border-bottom: 1px solid var(--infocard-color);
  `,

  titleWrapper: css`
    display: flex;
    grid-area: maintitle;
    justify-content: space-between;
    padding-right: var(--infocard-content-padding);
    flex-direction: column;

    ${breakpoints.medium} {
      flex-direction: row;
    }
  `,
  titleStyle: css`
    color: var(--dark-blue);
    ${fontMedium};
    font-size: 1.8rem;
    padding: 5px 0;

    ${breakpoints.small} {
      font-size: 2.4rem;
    }

    ${breakpoints.medium} {
      width: calc(100% - 140px);
    }
  `,
  documentationLink: css`
    align-items: center;
    display: flex;
    margin-bottom: 10px;

    a {
      color: var(--infocard-color);
      ${fontRegular};
      font-size: 90%;
      text-decoration: none;
    }

    a:focus,
    a:hover {
      text-decoration: underline;
    }

    ${breakpoints.medium} {
      margin-bottom: 0px;
    }
  `,
  descriptionWrapper: css`
    color: var(--dark-blue);
    display: flex;
    flex-direction: column;
    grid-area: contents;
    justify-content: space-between;
    margin-right: 10px;
    margin-top: 20px;
    padding: 0;

    ${breakpoints.small} {
      flex-direction: row;
      margin-right: 0px;
      padding: unset;
    }
  `,
  descriptionStyle: css`
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.0075em;
    padding-right: 0px;

    ${breakpoints.small} {
      padding-right: 50px;
    }

    & * {
      margin: 0;
    }
    *:not(script) + * {
      margin-top: 1em;
    }

    &.emphasize-first p:first-of-type {
      font-size: 1.4rem;
      font-weight: bold;
      ${breakpoints.small} {
        font-size: 1.8rem;
      }
    }
  `,
  descriptionRight: css`
    margin-top: 20px;

    ${breakpoints.small} {
      margin-top: 0px;
    }
  `,
  sidebarCommon: css`
    background-color: var(--infocard-color-light);
    color: var(--dark-blue);

    &.desktop {
      display: none;
    }

    ${breakpoints.small} {
      &.desktop {
        display: flex;
      }
    }
  `,
  sidebarTitle: css`
    align-items: center;
    display: flex;
    ${fontRegular};
    font-size: 115%;
    grid-area: sidebartitle;
    padding: 10px calc(var(--infocard-content-padding) / 2);

    ${breakpoints.small} {
      padding: 0 var(--infocard-content-padding);
    }
  `,
  sidebarMobile: css`
    grid-area: sidebar;
    &,
    &.Mui-expanded {
      margin: var(--infocard-content-padding) 0 0 0;
    }
    .MuiAccordionSummary-content,
    .MuiAccordionSummary-root.Mui-expanded {
      margin: 0;
    }
    .MuiAccordionSummary-root {
      background-color: var(--infocard-color-light);
      border-bottom: 1px solid var(--infocard-color);
      min-height: 38px;
      .sidebar-title {
        border: none;
      }
    }
    .MuiAccordionSummary-root,
    .MuiAccordionDetails-root {
      padding: 0;
    }
    ${breakpoints.small} {
      display: none;
    }
  `,
  sidebarContent: css`
    ${fontLight};
    grid-area: sidebar;
    padding: calc(var(--infocard-content-padding) / 2);

    ${breakpoints.small} {
      padding: var(--infocard-content-padding);
    }
  `,
  buttonContainer: css`
    grid-area: button;
    margin-top: var(--infocard-content-padding);
  `,
  callToActionButton: css`
    background-color: var(--bright-blue-light);
    color: var(--dark-blue);
    ${fontMedium};
    padding: 1rem 2.5rem;
  `,
  childrenStyle: css`
    ${fontLight};
    grid-area: children;
    margin: var(--infocard-content-padding) 10px var(--infocard-content-padding)
      0;

    ${breakpoints.small} {
      margin-right: 0;
    }

    & p {
      margin: 0;
    }
    & p + p {
      margin-top: 1rem;
    }
  `,
  simpleWrapper: css`
    background-color: var(--bright-blue-lighter);
  `,
  simpleTitle: css`
    border-bottom: 1px solid var(--bright-blue);
    border-left: 10px solid var(--bright-blue);
    ${fontMedium};
    padding: 16px;
  `,
};
interface InfoCardProps {
    bottomButtonLink?: string | null;
    bottomButtonText?: string | null;
    children?: ReactNode;
    className?: string;
    css?: Interpolation<Theme>;
    description?: ReactNode;
    descriptionRight?: ReactNode;
    documentationLink?: string | null;
    emphasizeFirstParagraph?: boolean;
    headingComponent?: ElementType;
    id?: string | undefined | null;
    sidebarContent?: ReactNode;
    sidebarTitle?: ReactNode;
    simple?: boolean;
    style?: CSSProperties;
    title: ReactNode;
  }
  
const InfoCard = ({
  bottomButtonLink = null,
  bottomButtonText = null,
  children,
  className: appliedClassName,
  css: appliedCss,
  description,
  descriptionRight = null,
  documentationLink: docLink = null,
  emphasizeFirstParagraph = false,
  headingComponent = "div",
  id = null,
  sidebarContent = null, 
  sidebarTitle = null,
  simple = false,
  style: appliedStyle,
  title,
}: InfoCardProps) => {
  if (simple) {
    return (
      <div
        className={classes("info-card-wrapper", appliedClassName)}
        css={[styles.simpleWrapper, appliedCss]}
        id={id || undefined}
      >
        <Typography component="div" variant="h6" css={styles.simpleTitle}>
          {title}
        </Typography>
        {children}
      </div>
    );
  }
  return (
    <div
      className={classes("info-card-wrapper", appliedClassName)}
      css={[styles.infocardWrapper, appliedCss]}
      id={id || undefined}
      style={{ ...appliedStyle }}
    >
 
      <div css={styles.accent} />


      <div css={[styles.bottomBorderGridArea, styles.topAreaBottomBorder]} />


      <div css={[styles.topAreaBottomBorder, styles.titleWrapper]}>
        <Typography component={headingComponent} css={styles.titleStyle} variant="h4">
          {title}
        </Typography>
        {docLink && (
          <div css={styles.documentationLink}>
            <ExternalLink href={docLink} >
              <InfoIcon
                fontSize="small"
                style={{ marginBottom: "-5px", marginRight: "5px" }}
              />
              Documentation
            </ExternalLink>
          </div>
        )}
      </div>


      {(description || descriptionRight) && (
        <div className="description-wrapper" css={styles.descriptionWrapper}>
          <div
            className={`description ${emphasizeFirstParagraph ? "emphasize-first" : ""}`}
            css={styles.descriptionStyle}
          >
            {description}
          </div>
          {descriptionRight && (
            <Typography component="div" variant="body1" css={styles.descriptionRight}>
              {descriptionRight}
            </Typography>
          )}
        </div>
      )}

 
      {bottomButtonText && (
        <div css={styles.buttonContainer}>
          <ButtonStyled
            css={styles.callToActionButton}
            href={bottomButtonLink || undefined}
            rel="noopener"
            target="_blank"
            component="a"
          >
            {bottomButtonText}
          </ButtonStyled>
        </div>
      )}

  
      {sidebarContent && (
        <>
    
          <Typography
            component="div"
            variant="body1"
            className="sidebar-title desktop"
            css={[styles.topAreaBottomBorder, styles.sidebarCommon, styles.sidebarTitle]}
          >
            {sidebarTitle}
          </Typography>
          <Typography
            component="div"
            variant="body1"
            className="sidebar-content desktop"
            css={[styles.sidebarCommon, styles.sidebarContent]}
          >
            {sidebarContent}
          </Typography>
        
          <Accordion className="sidebar-mobile" css={styles.sidebarMobile}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="sidebar-header"
              aria-controls="sidebar-content"
            >
              <Typography
                component="div"
                variant="body1"
                className="sidebar-title"
                css={[styles.topAreaBottomBorder, styles.sidebarCommon, styles.sidebarTitle]}
              >
                {sidebarTitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="div"
                variant="body1"
                className="sidebar-content"
                css={[styles.sidebarCommon, styles.sidebarContent]}
              >
                {sidebarContent}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}


      {children && <div css={styles.childrenStyle}>{children}</div>}
    </div>
  );
};

export default InfoCard;