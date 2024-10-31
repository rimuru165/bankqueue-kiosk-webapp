import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LoanTypeSelectionProps {
  onSelect: (type: "open" | "pay") => void;
  onBack: () => void;
}

export const LoanTypeSelection = ({ onSelect, onBack }: LoanTypeSelectionProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg animate-slideIn">
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        ← Back
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Select Loan Type
      </h2>

      <div className="space-y-4">
        <Button 
          onClick={() => onSelect("open")} 
          className="w-full h-32 text-lg"
        >
          Open New Loan
        </Button>
        <Button 
          onClick={() => onSelect("pay")} 
          className="w-full h-32 text-lg"
        >
          Pay Existing Loan
        </Button>
      </div>
    </Card>
  );
};