import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LoanTypeSelectionProps {
  onSelect: (type: "open" | "pay") => void;
  onBack: () => void;
}

export const LoanTypeSelection = ({ onSelect, onBack }: LoanTypeSelectionProps) => {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-md border border-cyan-500/20">
      <Button 
        variant="ghost" 
        className="mb-4 text-cyan-100 hover:text-cyan-300 hover:bg-white/5" 
        onClick={onBack}
      >
        ← Back
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text">
        Select Loan Type
      </h2>

      <div className="space-y-4">
        <Button 
          onClick={() => onSelect("open")} 
          className="w-full h-32 text-lg bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-500/50"
        >
          Open New Loan
        </Button>
        <Button 
          onClick={() => onSelect("pay")} 
          className="w-full h-32 text-lg bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-500/50"
        >
          Pay Existing Loan
        </Button>
      </div>
    </Card>
  );
};