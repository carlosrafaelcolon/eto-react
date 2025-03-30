/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from "@emotion/react";
import { TextField, TextFieldProps as MuiTextFieldProps  } from "@mui/material";

type TextFieldStyledProps = MuiTextFieldProps & {
    themeColor?: string;
    css?: Interpolation<Theme>;
  };


const baseStyles = css`
  background-color: var(--bright-blue-lighter);
  border: none;
  border-top: 1px solid var(--bright-blue);
  padding: 4px 8px;

  &:focus-within {
    outline: 3px solid var(--bright-blue);
  }
`;

const TextFieldStyled = ({
  className: appliedClassName,
  themeColor = "bright-blue",
  css: appliedCss,
  id,
  onChange,
  placeholder,
  style: appliedStyle,
  value,
  variant = "standard",
  slotProps = {},
  ...otherProps
}: TextFieldStyledProps) => {
  const customColorStyles = css`
    background-color: var(--${themeColor}-lighter);
    border-top-color: var(--${themeColor});
  `;

  return (
    <TextField
      className={appliedClassName}
      css={[baseStyles, customColorStyles, appliedCss]}
      id={id}
      placeholder={placeholder}
      style={appliedStyle}
      value={value}
      variant={variant}
      onChange={onChange}
      slotProps={{
        ...slotProps,
        input: {
          disableUnderline: true,
          ...(slotProps.input || {}) 
        }
      }}
      {...otherProps}
    />
  );
};

export default TextFieldStyled;
