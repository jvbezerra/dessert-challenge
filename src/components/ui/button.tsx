import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variants = "white" | "filled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variants;
  children?: ReactNode;
}

const styleByVariant: Record<Variants, string> = {
  white:
    "min-w-[160px] bg-white text-foreground text-sm p-3 border border-secondary hover:border-primary hover:text-primary",
  filled:
    "min-w-[138px] bg-primary text-white text-base leading-5 p-4 hover:brightness-90",
};

const Button = ({
  children,
  className,
  variant = "white",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={cn(
        styleByVariant[variant],
        "rounded-full flex items-center text-center justify-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
