/** @jsxImportSource @emotion/react */
import {
  MouseEvent,
  useState,
} from "react";
import { css } from "@emotion/react";

import { IconButton, Link, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { breakpointStops } from "../util/breakpoints";
import Brand from "./Brand";

interface HeaderProps {
  fromPlatform?: boolean;
  windowSize: number;
}

const wrapperStyles = css`
    border-bottom:1px solid var(--dark-blue);
    display:flex;
    justify-content:space-between;
    background-color:white;
`;

const linkStyles = css`
  align-items: center;
  display: flex;
  a {
    font-family: "IBM Plex Sans", Arial, sans-serif;
    font-weight: 300;
    padding: 1rem 2rem;
    text-decoration: none;
  }
  a:focus,
  a:hover {
    text-decoration: underline;
  }
`;

const menuStyles = css`
  .MuiPaper-root.MuiMenu-paper.MuiPopover-paper {
    background-color: var(--bright-blue-lightest);
    border-radius: 0;
    border-top: 1px solid var(--bright-blue);
    color: var(--dark-blue);
    max-width: 100%;
    width: 100%;
    @media (min-width: 440px) {
      border-bottom: 1px solid var(--bright-blue);
      border-left: 1px solid var(--bright-blue);
      height: 320px;
      width: 240px;
    }
    & a:focus,
    & a:hover {
      font-weight: 700;
    }
  }
`;

  
const Header = (props: HeaderProps) => {
  const { fromPlatform, windowSize } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const prefix = fromPlatform ? "/" : "https://eto.tech/";
  const links: { [key: string]: string } = {
    Resources: prefix + "resources",
    Blog: prefix + "blog",
    Support: prefix + "support",
    "Submit feedback": prefix + "feedback",
  };
  const brandHeight = windowSize > breakpointStops.tablet_regular ? 120 : 90;

  return (
    <header className="eto-header" css={wrapperStyles}>
      <a href={prefix} style={{ display: "flex" }}>
        <Brand height={brandHeight} />
      </a>

      {windowSize > breakpointStops.tablet_regular ? (
        // Desktop mode
        <div className="header-links" css={linkStyles}>
          {Object.keys(links).map((link) => (
            <Link href={links[link]} key={link}>
              {link}
            </Link>
          ))}
        </div>
      ) : (
        // Mobile mode
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            id="header-menu-button"
            aria-controls={open ? "navbar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
            style={{
              color: "var(--bright-blue)",
              verticalAlign: "middle",
              marginRight: "20px",
            }}
            title="Open ETO menu"
          >
            {open ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </IconButton>

          <Menu
            css={menuStyles}
            id="navbar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            //'MenuListProps' is deprecated. Use slotProps.list instead.
            slotProps={{
              list: {
                "aria-labelledby": "header-menu-button",
                autoFocus: true,
                sx: [
                  {
                    "& a.MuiButtonBase-root.MuiMenuItem-root": {
                      fontFamily: "'IBM Plex Sans', Arial, sans-serif;",
                      fontWeight: 300,
                      justifyContent: "right",
                      padding: "10px 32px",
                      textDecoration: "none",
                      "&:focus, &:hover": {
                        backgroundColor: "var(--dark-blue)",
                        color: "var(--bright-blue-light)",
                      },
                    },
                  },
                ],
              },
              paper: {
                style: {
                    inset: `${brandHeight}px 0 0 auto`,
                }
              },
            }}
            anchorReference="anchorPosition"
            anchorPosition={{
              top: Math.max(
                brandHeight -
                  (typeof window !== "undefined" ? window.scrollY : 0),
                0
              ),
              left: "auto" as unknown as number,
            }}
            // anchorOrigin={{
            //     vertical: "bottom",
            //     horizontal: "right"
            //   }}
            // marginThreshold={0}
            // transformOrigin={{
            //   horizontal: "right",
            //   vertical: "top",
            // }}
          >
            {Object.keys(links).map((link) => (
              <MenuItem key={link} onClick={handleMenuClose} component="a" href={links[link]}>
                {link}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </header>
  );
};

export default Header;
