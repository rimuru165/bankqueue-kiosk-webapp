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
    firstName: "",
    lastName: "",
    loanType: "open", // Default loan type
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (type === "loan" && formData.loanType === "") {
        return;
      }
      setStep(2);
    } else {
      // Format the data before sending
      const formattedData = {
        ...formData,
        firstName: formatName(formData.firstName),
        lastName: formatName(formData.lastName),
        amount: formData.amount ? parseFloat(formData.amount).toFixed(2) : "",
      };
      
      // Prepare transaction data for server
      const transactionData = {
        type,
        data: formattedData,
        timestamp: new Date().toISOString(),
      };
      
      console.log("Transaction Data:", transactionData);
      onComplete(formattedData);
    }
  };

  const formatName = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const renderFormFields = () => {
    if (step === 1) {
      if (type === "openAccount") {
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              First Name
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1"
                required
              />
            </label>
            <label className="block text-sm font-medium">
              Last Name
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1"
                required
              />
            </label>
            <label className="block text-sm font-medium">
              Initial Balance
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-1"
                required
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </label>
          </div>
        );
      } else if (type === "loan") {
        return (
          <div className="space-y-4">
            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={formData.loanType === "open" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFormData({ ...formData, loanType: "open" })}
              >
                Open Loan
              </Button>
              <Button
                type="button"
                variant={formData.loanType === "pay" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFormData({ ...formData, loanType: "pay" })}
              >
                Pay Loan
              </Button>
            </div>
            <label className="block text-sm font-medium">
              Account Number
              <Input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={formData.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, accountNumber: value });
                }}
                className="mt-1"
                required
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </label>
            <label className="block text-sm font-medium">
              {formData.loanType === "open" ? "Loan Amount" : "Payment Amount"}
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-1"
                required
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </label>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Account Number
              <Input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={formData.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, accountNumber: value });
                }}
                className="mt-1"
                required
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              />
            </label>
            {type !== "closeAccount" && (
              <label className="block text-sm font-medium">
                Amount
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-1"
                  required
                  style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                />
              </label>
            )}
          </div>
        );
      }
    } else {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            {type === "openAccount" ? (
              <>
                <p className="text-sm text-gray-600">First Name:</p>
                <p className="font-medium">{formatName(formData.firstName)}</p>
                <p className="text-sm text-gray-600">Last Name:</p>
                <p className="font-medium">{formatName(formData.lastName)}</p>
                <p className="text-sm text-gray-600">Initial Balance:</p>
                <p className="font-medium">₱{parseFloat(formData.amount).toFixed(2)}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">Account Number:</p>
                <p className="font-medium">{formData.accountNumber}</p>
                {type !== "closeAccount" && (
                  <>
                    <p className="text-sm text-gray-600">Amount:</p>
                    <p className="font-medium">₱{parseFloat(formData.amount).toFixed(2)}</p>
                  </>
                )}
                {type === "loan" && (
                  <p className="font-medium">Type: {formData.loanType === "open" ? "Open Loan" : "Pay Loan"}</p>
                )}
              </>
            )}
          </div>
        </div>
      );
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
        {renderFormFields()}
        <Button 
          type="submit" 
          className={`w-full ${step === 2 ? "bg-success hover:bg-success/90" : ""}`}
        >
          {step === 2 && <Check className="w-4 h-4 mr-2" />}
          {step === 1 ? "Continue" : "Confirm"}
        </Button>
      </form>
    </Card>
  );
};

export default TransactionFlow;