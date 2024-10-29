import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface TransactionFlowProps {
  type: string;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const TransactionFlow = ({ type, onComplete, onBack }: TransactionFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(formData);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg animate-slideIn">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={onBack}
      >
        ← Back
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <>
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Account Number
                <Input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="mt-1"
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                Amount
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-1"
                  required
                />
              </label>
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Account Number:</p>
              <p className="font-medium">{formData.accountNumber}</p>
              <p className="text-sm text-gray-600">Amount:</p>
              <p className="font-medium">${formData.amount}</p>
            </div>
            <Button type="submit" className="w-full bg-success hover:bg-success/90">
              <Check className="w-4 h-4 mr-2" />
              Confirm
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default TransactionFlow;