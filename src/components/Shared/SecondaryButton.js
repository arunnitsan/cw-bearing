import Link from "next/link";
import { extractTextFromHtml } from "../../utils/htmlUtils";

const SecondaryButton = ({ diffDomain, targetBlank, children, link, className, ...props }) => {
  return (
    <>
      {diffDomain ? (
        <a href={`${process.env.NEXT_PUBLIC_API_URL1}${link}`} className={`btn test btn-red btn-br-red ${className}`} target="_blank" {...props}>
          {children}
        </a>
      ) : (
        <Link href={extractTextFromHtml(link)} className={`btn test btn-red btn-br-red ${className}`} target={`${targetBlank ? '_blank' : ""}`} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

SecondaryButton.defaultProps = {
  children: "Button",
  className: "",
};

export default SecondaryButton;
