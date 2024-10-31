import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { TransactionFormFields } from "./transactions/TransactionFormFields";
import { LoanTypeSelection } from "./transactions/LoanTypeSelection";
import { FormData, TransactionData } from "@/types/transactions";

interface TransactionFlowProps {
  type: string;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const DEFAULT_MONTHLY_INTEREST = 2.5;

const TransactionFlow = ({ type, onComplete, onBack }: TransactionFlowProps) => {
  const [step, setStep] = useState(type === "loan" ? 0 : 1);
  const [formData, setFormData] = useState<FormData>({
    accountNumber: "",
    amount: "",
    firstName: "",
    lastName: "",
    loanType: "open",
    monthlyInterest: DEFAULT_MONTHLY_INTEREST.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      const transactionData: TransactionData = prepareTransactionData();
      console.log("Transaction Data:", transactionData);
      onComplete(formData);
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
          monthly_interest: parseFloat(formData.monthlyInterest),
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
    }
    return type === "openAccount" ? "open_account" : type;
  };

  const formatName = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  if (step === 0) {
    return (
      <LoanTypeSelection
        onSelect={(loanType) => {
          setFormData(prev => ({ ...prev, loanType }));
          setStep(1);
        }}
        onBack={onBack}
      />
    );
  }

  return (
    <Card className="p-6 bg-white shadow-lg animate-slideIn">
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        ← Back
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <TransactionFormFields
            type={type}
            formData={formData}
            onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
            loanType={formData.loanType}
          />
        ) : (
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
                    <>
                      <p className="text-sm text-gray-600">Loan Type:</p>
                      <p className="font-medium">
                        {formData.loanType === "open" ? "Open Loan" : "Pay Loan"}
                      </p>
                      {formData.loanType === "open" && (
                        <>
                          <p className="text-sm text-gray-600">Monthly Interest Rate:</p>
                          <p className="font-medium">{formData.monthlyInterest}%</p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
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