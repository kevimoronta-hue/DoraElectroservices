import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const baseClasses =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--nv-border)] bg-[var(--nv-bg)] px-6 text-[15px] font-bold text-[var(--nv-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.35)] transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nv-red-bright)] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100 [@media(hover:hover)]:hover:border-[var(--nv-text-secondary)] [@media(hover:hover)]:hover:bg-white/[0.03]";

type AsLink = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type AsButton = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function SecondaryButton(props: AsLink | AsButton) {
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
