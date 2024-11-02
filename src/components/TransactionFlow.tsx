import { useState } from "react";
import { Check } from "lucide-react";
import { TransactionFormFields } from "./transactions/TransactionFormFields";
import { LoanTypeSelection } from "./transactions/LoanTypeSelection";
import { TransactionCard } from "./transactions/TransactionCard";
import { TransactionButton } from "./transactions/TransactionButton";
import {
  FormData,
  TransactionData,
  ServerResponse,
} from "@/types/transactions";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface TransactionFlowProps {
  type: string;
  onComplete: (data: ServerResponse) => void;
  onBack: () => void;
}

const MONTHLY_INTEREST_RATE = 3.5;

const TransactionFlow = ({ type, onComplete, onBack }: TransactionFlowProps) => {
  const [step, setStep] = useState(type === "loan" ? 0 : 1);
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
      const transactionData: TransactionData = prepareTransactionData();
      console.log("Transaction Data:", transactionData);

      try {
        const response = await axios.post(
          "http://localhost:6543/queue/create-receipt",
          transactionData
        );
        onComplete(response.data);
      } catch (error: any) {
        console.error("Error creating receipt:", error);
        toast({
          variant: "destructive",
          title: "Server Error",
          description:
            error.response?.data?.message ||
            "Unable to connect to the server. Please ensure the server is running at http://localhost:6543",
        });
      }
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
    return type; // applies to deposit and withdrawal transaction types
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
        onBack={onBack}
      />
    );
  }

  return (
    <TransactionCard>
      <TransactionButton variant="ghost" className="mb-4" onClick={onBack}>
        ← Back
      </TransactionButton>

      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text animate-pulse shadow-glow">
        {type === "loan"
          ? `${formData.loanType === "open" ? "Open Loan" : "Pay Loan"}`
          : type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <TransactionFormFields
            type={type}
            formData={formData}
            onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            loanType={formData.loanType}
            monthlyInterest={MONTHLY_INTEREST_RATE}
          />
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 text-cyan-100">
              {type === "openAccount" ? (
                <>
                  <p className="text-sm text-gray-600">First Name:</p>
                  <p className="font-medium">
                    {formatName(formData.firstName)}
                  </p>
                  <p className="text-sm text-gray-600">Last Name:</p>
                  <p className="font-medium">{formatName(formData.lastName)}</p>
                  <p className="text-sm text-gray-600">Initial Balance:</p>
                  <p className="font-medium">
                    ₱{parseFloat(formData.amount).toFixed(2)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Account Number:</p>
                  <p className="font-medium">{formData.accountNumber}</p>
                  {type !== "closeAccount" && (
                    <>
                      <p className="text-sm text-gray-600">Amount:</p>
                      <p className="font-medium">
                        ₱{parseFloat(formData.amount).toFixed(2)}
                      </p>
                      {type === "loan" && formData.loanType === "open" && (
                        <>
                          <p className="text-sm text-gray-600">
                            Monthly Interest Rate:
                          </p>
                          <p className="font-medium">
                            {MONTHLY_INTEREST_RATE}%
                          </p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <TransactionButton
          type="submit"
          className={step === 2 ? "bg-success/20 hover:bg-success/30 w-full" : "w-full"}
        >
          {step === 2 && <Check className="w-4 h-4 mr-2" />}
          {step === 1 ? "Continue" : "Confirm"}
        </TransactionButton>
      </form>
    </TransactionCard>
  );
};

export default TransactionFlow;
