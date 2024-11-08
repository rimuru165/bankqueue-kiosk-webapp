import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionFormFields } from "./transactions/TransactionFormFields";
import { LoanTypeSelection } from "./transactions/LoanTypeSelection";
import { TransactionConfirmation } from "./transactions/TransactionConfirmation";
import { FormData, TransactionData, ServerResponse } from "@/types/transactions";
import { useToast } from "@/components/ui/use-toast";
import { createReceipt } from "@/services/transactionService";
import { Loader2 } from "lucide-react";

interface TransactionFlowProps {
  type: string;
  onComplete: (data: ServerResponse) => void;
  onBack: () => void;
}

const MONTHLY_INTEREST_RATE = 3.5;

const TransactionFlow = ({ type, onComplete, onBack }: TransactionFlowProps) => {
  const [step, setStep] = useState(type === "loan" ? 0 : 1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    accountNumber: "",
    amount: "",
    firstName: "",
    lastName: "",
    loanType: "open",
    monthlyInterest: MONTHLY_INTEREST_RATE.toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);
      const transactionData: TransactionData = prepareTransactionData();
      try {
        const response = await createReceipt(transactionData);
        onComplete(response);
      } catch (error: any) {
        console.error("Error creating receipt:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to process your transaction. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 1) {
      if (type === "loan") {
        setStep(0);
      } else {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const prepareTransactionData = (): TransactionData => {
    const baseData: TransactionData = { type: getTransactionType() };

    if (type === "openAccount") {
      return {
        ...baseData,
        firstname: formatName(formData.firstName),
        lastname: formatName(formData.lastName),
        amount: parseFloat(formData.amount),
      };
    }

    if (type === "closeAccount") {
      return {
        ...baseData,
        account_ID: formData.accountNumber,
      };
    }

    if (type === "loan") {
      return {
        ...baseData,
        account_ID: formData.accountNumber,
        amount: parseFloat(formData.amount),
        ...(formData.loanType === "open" && {
          monthly_interest: MONTHLY_INTEREST_RATE,
        }),
      };
    }

    return {
      ...baseData,
      account_ID: formData.accountNumber,
      amount: parseFloat(formData.amount),
    };
  };

  const getTransactionType = (): string => {
    if (type === "loan") {
      return formData.loanType === "open" ? "open_loan" : "pay_loan";
    } else if (type === "openAccount") {
      return "open_account";
    } else if (type === "closeAccount") {
      return "close_account";
    }
    return type;
  };

  const formatName = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  if (step === 0) {
    return (
      <LoanTypeSelection
        onSelect={(loanType) => {
          setFormData((prev) => ({ ...prev, loanType }));
          setStep(1);
        }}
        onBack={handleBack}
      />
    );
  }

  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-md border border-cyan-500/20">
      <Button 
        variant="ghost" 
        className="mb-4 text-cyan-100 hover:text-cyan-300 hover:bg-white/5" 
        onClick={handleBack}
        disabled={isLoading}
      >
        ← Back
      </Button>

      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text">
        {type === "loan"
          ? `${formData.loanType === "open" ? "Open Loan" : "Pay Loan"}`
          : type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>

      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <TransactionFormFields
            type={type}
            formData={formData}
            onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            loanType={formData.loanType}
            monthlyInterest={MONTHLY_INTEREST_RATE}
          />
          <Button
            type="submit"
            className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-500/50"
            disabled={isLoading}
          >
            Continue
          </Button>
        </form>
      ) : (
        <TransactionConfirmation
          type={type}
          formData={formData}
          onSubmit={handleSubmit}
          formatName={formatName}
          isLoading={isLoading}
        />
      )}
    </Card>
  );
};

export default TransactionFlow;