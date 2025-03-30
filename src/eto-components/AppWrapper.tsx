/** @jsxImportSource @emotion/react */
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Header from "./Header";
import Footer from "./Footer";
import BackgroundImage from "../assets/images/grid.png";

interface AppWrapperProps {
  children: ReactNode;
  fromPlatform?: boolean;
  className?: string;
  style?: CSSProperties;
}

const wrapperStyles = css`
  background-image: url(${BackgroundImage});
`;

const AppWrapper = ({ children, fromPlatform = false, className, style }: AppWrapperProps) => {

  const [windowSize, setWindowSize] = useState(800);


  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
        window.removeEventListener("resize", handleResize);
      };
  }, []);
  
  return (
    <div
      className={["app-wrapper", className].join(" ")}
      css={wrapperStyles}
      style={style}
    >
      <Header fromPlatform={fromPlatform} windowSize={windowSize} />
        <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
        <Footer fromPlatform={fromPlatform} windowSize={windowSize}/>
    </div>
  );
};
export default AppWrapper;
