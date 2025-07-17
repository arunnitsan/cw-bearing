import Link from "next/link";

const SafeLink = ({ href, children, ...props }) => {
  // If href is an object with linkText property, use that
  if (href && typeof href === 'object' && href.linkText) {
    return (
      <Link href={href.linkText} {...props}>
        {children}
      </Link>
    );
  }

  // If href is an object with href property, use that
  if (href && typeof href === 'object' && href.href) {
    return (
      <Link href={href.href} {...props}>
        {children}
      </Link>
    );
  }

  // If href is a string, use it directly
  if (href && typeof href === 'string') {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // Fallback: render as a span if href is invalid
  console.warn('SafeLink: Invalid href provided:', href);
  return <span {...props}>{children}</span>;
};

export default SafeLink;
