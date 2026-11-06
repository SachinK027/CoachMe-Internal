import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-forest text-ivory hover:bg-forest-deep shadow-[0_12px_30px_rgba(38,63,56,0.18)]",
  secondary:
    "bg-transparent text-forest border border-forest/25 hover:border-forest hover:bg-white/50",
  ghost: "bg-transparent text-forest hover:text-forest-deep",
  inverse:
    "bg-ivory text-forest hover:bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]",
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
