import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { FormData } from "@/types/transactions";

interface TransactionConfirmationProps {
  type: string;
  formData: FormData;
  onSubmit: (e: React.FormEvent) => void;
  formatName: (name: string) => string;
  isLoading: boolean;
}

export const TransactionConfirmation = ({
  type,
  formData,
  onSubmit,
  formatName,
  isLoading,
}: TransactionConfirmationProps) => {
  const MONTHLY_INTEREST_RATE = 3.5;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-6 text-cyan-100">
        <div className="space-y-2">
          {type === "openAccount" ? (
            <>
              <p className="text-sm text-cyan-100/60">First Name:</p>
              <p className="font-medium">{formatName(formData.firstName)}</p>
              <p className="text-sm text-cyan-100/60">Last Name:</p>
              <p className="font-medium">{formatName(formData.lastName)}</p>
              <p className="text-sm text-cyan-100/60">Initial Balance:</p>
              <p className="font-medium">₱{parseFloat(formData.amount).toFixed(2)}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-cyan-100/60">Account Number:</p>
              <p className="font-medium">{formData.accountNumber}</p>
              {type !== "closeAccount" && (
                <>
                  <p className="text-sm text-cyan-100/60">Amount:</p>
                  <p className="font-medium">₱{parseFloat(formData.amount).toFixed(2)}</p>
                  {type === "loan" && formData.loanType === "open" && (
                    <>
                      <p className="text-sm text-cyan-100/60">Monthly Interest Rate:</p>
                      <p className="font-medium">{MONTHLY_INTEREST_RATE}%</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-500/50"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Check className="w-4 h-4 mr-2" />
            Confirm
          </>
        )}
      </Button>
    </form>
  );
};