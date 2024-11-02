import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface TransactionCardProps {
  children: ReactNode;
  className?: string;
}

export const TransactionCard = ({ children, className = "" }: TransactionCardProps) => {
  return (
    <Card className={`p-6 bg-transparent backdrop-blur-md border-cyan-500/20 
                     shadow-[0_0_15px_rgba(0,255,255,0.2)] 
                     hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] 
                     transition-all duration-300 ${className}`}>
      {children}
    </Card>
  );
};