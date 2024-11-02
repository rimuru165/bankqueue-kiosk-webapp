import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TransactionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
}

export const TransactionButton = ({ 
  children, 
  className, 
  variant = "default",
  ...props 
}: TransactionButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(
        "text-cyan-100 transition-all duration-300",
        variant === "ghost" && "hover:text-cyan-300 hover:bg-white/5",
        variant === "default" && "bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/30 hover:border-cyan-400/50",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};