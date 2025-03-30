/** @jsxImportSource @emotion/react */
import { css , Interpolation, Theme } from "@emotion/react";
import { Button, ButtonProps as MuiButtonProps } from "@mui/material";
import { fontRegular } from "../themes/eto_theme";
type ButtonStyledProps = MuiButtonProps & {
  css?: Interpolation<Theme>;
  target?: string;
};

const styles = css`
  background-color: var(--bright-blue);
  border-radius: 0;
  color: white;
  ${fontRegular}
  &:focus {
    outline: 3px solid var(--bright-blue);
  }
  &:hover {
    background-color: var(--dark-blue);
    color: var(--bright-blue-light);
  }
`;

const ButtonStyled = ({
    children,
    className: appliedClassName,
    css: appliedCss,
    disableElevation = false,
    href,
    id,
    onClick = undefined,
    rel,
    style: appliedStyle,
    target,
    title,
    variant,
    ...props
  }: ButtonStyledProps) => {
    return <Button 
    component={href ? "a" : undefined}
    className={appliedClassName}
    css={[styles, appliedCss]}
    disableElevation={disableElevation}
    href={href}
    id={id}
    onClick={onClick}
    style={appliedStyle}
    title={title}
    variant={variant}
    {...(href ? { target, rel } : {})}

    {...props}
    >{children}</Button>;
};

export default ButtonStyled;
