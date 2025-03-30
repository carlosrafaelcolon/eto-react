/** @jsxImportSource @emotion/react */
import { Component, ReactNode, CSSProperties } from "react";
import { css, Interpolation, Theme } from "@emotion/react";
import { Typography } from "@mui/material";


const styles = {
  wrapper: css`
    margin-top: 20px;
  `,
};


interface ErrorBoundaryProps {
  children: ReactNode;
  className?: string;
  css?: Interpolation<Theme>;
  id?: string;
  style?: CSSProperties;
}


interface ErrorBoundaryState {
  hasError: boolean;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("With info:", info.componentStack);
  }


  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className={this.props.className}
          css={[styles.wrapper, this.props.css]}
          id={this.props.id}
          style={this.props.style}
        >
          <Typography component="div" variant="h5" style={{ textAlign: "center" }}>
            Something went wrong, please return to the{" "}
            <a href="/">main page</a> and report an issue or email{" "}
            <a href="mailto:cset_eto@georgetown.edu">cset_eto@georgetown.edu</a>.
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;