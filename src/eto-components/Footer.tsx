/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { ArrowForward, SettingsBackupRestore } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { css } from "@emotion/react";
import Brand from "./Brand";
import TextFieldStyled from "./TextFieldStyled";
import ButtonStyled from "./ButtonStyled";
import CSETLogo from "../assets/images/cset_logo.svg";
import breakpoints from "../util/breakpoints";

const wrapperStyles = css`
  background-color: white;
  border-top: 1px solid var(--dark-blue);
  display: grid;
  font-family: "IBM Plex Sans", Arial, sans-serif;
    font-weight: 300;
  font-size: 14px;
  gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, 1fr);
  padding: 1rem 15px 1rem;
  position: relative;
  ${breakpoints.small} {
    padding: 2rem 45px 1rem;
  }
  ${breakpoints.medium} {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
  a,
  a:visited {
    color: var(--dark-blue);
    text-decoration: underline;
  }
  a:focus,
  a:hover {
    color: var(--bright-blue);
  }
  h3 {
    text-transform: uppercase;
    color: var(--bright-blue);
    font-family: "IBM Plex Sans", Arial, sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0 0 0.5rem;
  }
  label {
    font-family: 'IBM Plex Sans, Arial, sans-serif',;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
  p {
    margin-top: 0;
  }
`;
const brandStyles = css`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 20px;
  text-align: center;
  ${breakpoints.medium} {
    grid-column: 1/4;
    text-align: left;
  }
`;

const logoStyles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${breakpoints.smaller} {
    flex-direction: row;
  }
  a {
    flex-grow: 1;
    position: relative;
    ${breakpoints.smaller} {
      flex-grow: unset;
    }
    img {
      object-fit: contain;
      width: 100%;
      ${breakpoints.smaller} {
        object-fit: fill;
        width: unset;
      }
    }
  }
  .cset-logo {
    border-left: none;
    margin-top: 0px;
    ${breakpoints.smaller} {
      padding-left: 20px;
    }
    ${breakpoints.medium} {
      border-left: 1px solid var(--dark-blue);
      margin: 1rem 1.5rem 1rem 0;
    }
  }
`;

const textBlurbStyles = css`
  color: var(--dark-blue);
  margin-top: 20px;
  padding: 0 20px;
  text-align: center;
  ${breakpoints.smaller} {
    margin-top: 0px;
  }
`;

const subscribeStyles = css`
  display: flex;
  flex-direction: column;
  grid-column: 1;
  grid-row: 2;
  text-align: center;
  h3 {
    margin-bottom: 0.75rem;
  }
  label {
    color: var(--dark-blue);
    font-family: 'IBM Plex Sans, Arial, sans-serif';
    font-weight:300;
    font-size: 14px;
    font-style: initial;
    margin: 0 0 1em;
    text-transform: initial;
  }
  .email-form {
    display: flex;
    font-size: 110%;
    min-height: 40px;
  }
  .subscribe-inner {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  ${breakpoints.medium} {
    grid-column: 4/-2;
    grid-row: 1;
    text-align: left;
  }
`;

const contactStyles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-column: 1;
  grid-row: 3;
  text-align: center;
  ${breakpoints.medium} {
    grid-column: -2;
    grid-row: 1;
    text-align: left;
  }
  & > * {
    margin-bottom: 0.5rem;
  }
`;

const lineStyles = css`
  grid-column: 1/-1;
  grid-row: 4;
  ${breakpoints.medium} {
    grid-row: 2;
  }
  .line-internal {
    border-bottom: 0.5px solid var(--dark-blue);
    margin-top: auto;
  }
`;
const linksStyles = css`
  align-items: center;
  display: grid;
  grid-column: 1/-1;
  grid-row: 5;
  grid-template-columns: 1fr 1fr;
  & > * {
    padding: 0 0.75rem;
  }
  ${breakpoints.small} {
    & > * {
      padding: 0 1.5rem;
    }
  }
  ${breakpoints.medium} {
    grid-row: 3;
  }
`;
const copyrightNoticeStyles = css`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  & > * {
    text-align: right;
  }
  .divider {
    display: none;
  }
  @media (min-width: 535px) {
    flex-direction: row;
    & > * {
      margin-left: unset;
    }
    .divider {
      display: block;
      margin: 0 0.5rem;
    }
  }
`;
interface FooterProps {
  fromPlatform?: boolean;
  windowSize?: number;
}
const Footer = (props: FooterProps) => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleEmailUpdate = (providedEmail: string) => {
    setEmail(providedEmail);
  };
  const { fromPlatform } = props;
  const prefix = fromPlatform ? "/" : "https://eto.tech/";
  const surveyUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScXAkm03LIaXKVKRIRYlxm25xiIPWBffilJ9rD0YdwEcPsjpg/formResponse?usp=pp_url";
  const links: { href: string; label: string }[] = [
    { href: "https://twitter.com/EmergingTechObs", label: "Twitter" },
    {
      href: "https://www.linkedin.com/company/emerging-technology-observatory",
      label: "LinkedIn",
    },
    { href: "https://etoblog.substack.com/", label: "Substack" },
    { href: "mailto:cset_eto@georgetown.edu", label: "Email" },
    { href: `${prefix}rss.xml`, label: "RSS" },
  ];
  const submitEmail = () => {
    setEmailSubmitted(true);
    if (email === "") {
      setError("Please provide an email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please provide a valid email address");
      return;
    }
    const domain = encodeURIComponent(window.location.origin);
    const page = encodeURIComponent(window.location.href);
    const surveyHref =
      typeof window !== "undefined"
        ? `${surveyUrl}&entry.303207172=${email}&entry.1828059043=${domain}&entry.180676009=${page}&submit=Submit`
        : "";
    fetch(surveyHref, {
      method: "POST",
      mode: "no-cors",
    });
    // NOTE: Due to CORS, we are unable to determine if the request succeeded
    // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)

    setEmailSubmitted(true);
    setError("");
  };
  const resetEmail = () => {
    setEmail("");
    setError("");
    setEmailSubmitted(false);
  };
  return (
    <footer className="eto-footer" css={wrapperStyles}>
      <div css={brandStyles}>
        <div css={logoStyles}>
          <a href={prefix}>
            <Brand height={90} />
          </a>
          <a href="https://cset.georgetown.edu">
            <img
              className="cset-logo"
              src={CSETLogo}
              alt="Center for Security and Emerging Technology logo"
            />
          </a>
        </div>
        <div css={textBlurbStyles}>
          ETO is a project of the{" "}
          <a href="https://cset.georgetown.edu/" target="_blank" rel="noopener">
            Center for Security and Emerging Technology
          </a>{" "}
          at{" "}
          <a href="https://www.georgetown.edu/" target="_blank" rel="noopener">
            Georgetown University
          </a>
          .
        </div>
      </div>
      <div className="subscribe" css={subscribeStyles}>
        <div className="subscribe-inner">
          <h3>Subscribe for updates</h3>
          <label htmlFor="subscriptionInput">
            Sign up for our newsletter to receive the latest news and
            announcements.
          </label>
          <div className="email-form">
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
              data-testid="email-form-result"
            >
              {emailSubmitted ? (
                error ? (
                  `Error: ${error}`
                ) : (
                  "Thank you for subscribing!"
                )
              ) : (
                <TextFieldStyled
                  id="subscriptionInput"
                  onChange={(e) => handleEmailUpdate(e.target.value)}
                  placeholder="you@example.com"
                  style={{ marginRight: "0.5rem", width: "100%" }}
                />
              )}
            </div>
            {!emailSubmitted && (
              <ButtonStyled onClick={submitEmail} title="Submit email">
                <ArrowForward />
              </ButtonStyled>
            )}
            {emailSubmitted && error && (
              <ButtonStyled onClick={resetEmail} title="Reset email form">
                <SettingsBackupRestore />
              </ButtonStyled>
            )}
          </div>
        </div>
      </div>
      <div className="contact" css={contactStyles}>
        <h3>Keep in touch</h3>
        {links.map((link) => (
          <div key={link.href}>
            <Link href={link.href} target="_blank" rel="noopener">
              {link.label}
            </Link>
          </div>
        ))}
      </div>
      <div css={lineStyles}>
        <div className="line-internal" />
      </div>
      <div className="links" css={linksStyles}>
        <Link href={prefix + "tou"}>Terms of Use and Privacy Policy</Link>
        <div css={copyrightNoticeStyles}>
          <div>ETO, 2024</div>
          <div className="divider">|</div>
          <div>
            Designed by{" "}
            <a
              href="https://and-now.co.uk/"
              target="_blank"
              rel="noopener"
              style={{ whiteSpace: "nowrap" }}
            >
              And-Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
