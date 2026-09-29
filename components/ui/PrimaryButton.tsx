import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const baseClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/[0.14] bg-[var(--nv-red)] px-6 text-[15px] font-bold text-[var(--nv-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.4),0_6px_16px_rgba(225,6,19,0.28)] transition-[background-color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.4),0_3px_10px_rgba(225,6,19,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nv-red-bright)] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100 [@media(hover:hover)]:hover:bg-[var(--nv-red-bright)]";

type AsLink = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type AsButton = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton(props: AsLink | AsButton) {
  if ("href" in props && props.href) {
    const { href, className, ...rest } = props;
    return (
      <Link href={href} className={`${baseClasses} ${className ?? ""}`} {...rest}>
        {props.children}
      </Link>
    );
  }
  const { className, type = "button", ...rest } = props as AsButton;
  return <button type={type} className={`${baseClasses} ${className ?? ""}`} {...rest} />;
}
