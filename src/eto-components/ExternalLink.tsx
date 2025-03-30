import React from "react";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const ExternalLink = ({ children, href, ...props }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener" {...props}>
      {children}
    </a>
  );
};

export default ExternalLink;