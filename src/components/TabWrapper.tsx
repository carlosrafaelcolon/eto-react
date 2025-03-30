/** @jsxImportSource @emotion/react */
import {ReactNode} from 'react';
import { Link } from 'react-router-dom';
import { css, Interpolation, Theme } from '@emotion/react';
import { Tab, Tabs } from '@mui/material';
import { fontRegular } from '../themes/eto_theme';
import { classes } from '../util';


const styles = {
  tabWrapper: css`
    background-color: white;
    width:100%;
    max-width: 1500px;
    margin:0 auto;
  `,
  tabs: css`
    .MuiTab-root {
      ${fontRegular}

      &:not(.Mui-selected):hover {
        background-color: var(--bright-blue-lightest);
      }
    }

    .Mui-selected {
      background-color: var(--bright-blue-lighter);
    }
  `,
  childWrapper: css`
    border: 1px solid var(--grey);
    padding: 0.5rem;
    width:100%;
  `,
};

interface TabWrapperProps {
    activeTab: number;
    children: ReactNode;
    className?: string;
    css?: Interpolation<Theme>;
  }
  
const TabWrapper = ({
  activeTab,
  children,
  className: appliedClassName,
  css: appliedCss,
}: TabWrapperProps) => {
  return (
    <div
      className={classes("pagewrapper", appliedClassName)}
      css={[styles.tabWrapper, appliedCss]}
      id="tabs"
    >
      <div css={styles.tabs}>
        <Tabs value={activeTab}>
          <Tab component={Link} label="Overview" to="/" />
          <Tab component={Link} label="Browse Collection" to="/list" />
        </Tabs>
      </div>
      <div className="tabwrapper--contents" css={styles.childWrapper}>
        {children}
      </div>
    </div>
  );
};

export default TabWrapper;
