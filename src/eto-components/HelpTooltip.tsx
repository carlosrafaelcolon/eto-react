/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ReactNode, CSSProperties, isValidElement, ReactElement } from "react";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { fontRegular } from "../themes/eto_theme";

const HELP = "help";
const MORE_INFO = "more-info";

const tooltipStyles = css`
  ${fontRegular};
  font-size: 14px;
  line-height: 1.2;
  padding: 5px;

  a,
  a:visited {
    color: var(--dark-blue);
  }

  a:focus,
  a:hover {
    color: var(--bright-blue);
  }
`;

const defaultIconStyle: CSSProperties = {
  height: "20px",
  width: "20px",
  verticalAlign: "top",
  cursor: "pointer",
  fill: "var(--bright-blue)",
};

const popperSxStyles = {
  "& .MuiTooltip-tooltip": {
    backgroundColor: "var(--bright-blue-lighter)",
    borderRadius: 0,
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
  },
};


type IconType = typeof HELP | typeof MORE_INFO;

interface HelpTooltipProps {
  children?: ReactNode;
  className?: string;
  css?: any;
  iconStyle?: CSSProperties;
  iconType?: IconType;
  style?: CSSProperties;
  text?: ReactNode;
  [key: string]: any;
}


const HelpTooltip = ({
  children,
  className: appliedClassName,
  css: appliedCss,
  iconStyle,
  iconType = HELP,
  style = {},
  text,
  ...otherProps
}: HelpTooltipProps) => {
  if (style && Object.keys(style).length > 0) {
    console.warn(
      "The `style` prop of `<HelpTooltip>` is ambiguous and has been replaced by `iconStyle`."
    );
  }

  const mergedIconStyle: CSSProperties = {
    ...defaultIconStyle,
    ...style,
    ...iconStyle,
  };

 
  const idToIcon: Record<IconType, ReactElement> = {
    [HELP]: <HelpRoundedIcon style={mergedIconStyle} />,
    [MORE_INFO]: <MoreHorizIcon style={mergedIconStyle} />,
  };

  const tooltipContent =
    typeof text === "string" ? (
      <div dangerouslySetInnerHTML={{ __html: text }} />
    ) : (
      <div>{text}</div>
    );

  return (
    <span className="helptooltip">
      {!text ? (
        children ?? <span />
      ) : (
        <Tooltip
          classes={{
            popper: appliedClassName,
            tooltip: "helptooltip--content",
          }}
          css={appliedCss}
          slotProps={{
            popper: {
              sx: popperSxStyles,
            },
          }}
          enterTouchDelay={0}
          title={
            <div className="help-tooltip" css={tooltipStyles}>
              {tooltipContent}
            </div>
          }
          {...otherProps}
        >
          {children ? (
            typeof children === "string" || typeof children === "number" ? (
              <span>{children}</span> 
            ) : isValidElement(children) ? (
              children 
            ) : (
              <span />
            )
          ) : (
            idToIcon[iconType] 
          )}
        </Tooltip>
      )}
    </span>
  );
};


export default HelpTooltip;