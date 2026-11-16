import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "accent" | "outlineLight";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-forest !text-white shadow-[0_12px_30px_rgba(38,63,56,0.18)] hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_18px_40px_rgba(38,63,56,0.28)]",
  secondary:
    "bg-transparent text-forest border border-forest/25 hover:-translate-y-0.5 hover:border-forest hover:bg-white/60 hover:shadow-[0_12px_28px_rgba(38,63,56,0.12)]",
  ghost: "bg-transparent text-forest hover:text-forest-deep",
  inverse:
    "bg-ivory text-forest shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]",
  accent:
    "bg-[var(--accent)] !text-[#1b2e29] shadow-[0_0_0_0_rgba(201,217,108,0.35)] hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(201,217,108,0.22),0_18px_40px_rgba(201,217,108,0.35)]",
  outlineLight:
    "bg-transparent !text-white border border-white/45 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
