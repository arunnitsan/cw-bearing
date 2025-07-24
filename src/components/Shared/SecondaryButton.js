import Link from "next/link";

const SecondaryButton = ({ diffDomain, targetBlank, children = "Button", link, className = "", ...props }) => {
  return (
    <>
      {diffDomain ? (
        <a href={`${process.env.NEXT_PUBLIC_API_URL1}${link}`} className={`btn test btn-red btn-br-red ${className}`} target="_blank" {...props}>
          {children}
        </a>
      ) : (<>
        <Link href={`${new DOMParser().parseFromString(link, "text/html").documentElement.textContent}`} className={`btn test btn-red btn-br-red ${className}`} target={`${targetBlank ? '_blank' : ""}`} {...props}>
          {children}
        </Link>
      </>

      )}
    </>
    // <Link href={`${diffDomain ? '${process.env.NEXT_PUBLIC_API_URL1}/' : ''}${link}`}>
    //   <a className={`btn test btn-red btn-br-red ${className}`} target={`${targetBlank ? '_blank' : ""}`} {...props}>
    //     {children}
    //   </a>
    // </Link>
  );
};

export default SecondaryButton;
