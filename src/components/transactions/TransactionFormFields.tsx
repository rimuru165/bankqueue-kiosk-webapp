import { Input } from "@/components/ui/input";
import { FormData } from "@/types/transactions";

const inputStyle = {
  WebkitAppearance: "none" as const,
  MozAppearance: "none" as const,
  appearance: "none" as const,
};

interface TransactionFormFieldsProps {
  type: string;
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  loanType?: "open" | "pay";
  monthlyInterest?: number;
}

export const TransactionFormFields = ({
  type,
  formData,
  onChange,
  loanType,
  monthlyInterest,
}: TransactionFormFieldsProps) => {
  if (type === "openAccount") {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          First Name
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className="mt-1"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Last Name
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className="mt-1"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Initial Balance
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={formData.amount}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              onChange({ amount: value });
            }}
            className="mt-1"
            required
            style={inputStyle}
          />
        </label>
      </div>
    );
  }

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
            const value = e.target.value.replace(/\D/g, "");
            onChange({ accountNumber: value });
          }}
          className="mt-1"
          required
          style={inputStyle}
        />
      </label>
      {type !== "closeAccount" && (
        <label className="block text-sm font-medium">
          {type === "loan"
            ? loanType === "open"
              ? "Loan Amount"
              : "Payment Amount"
            : "Amount"}
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={formData.amount}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              onChange({ amount: value });
            }}
            className="mt-1"
            required
            style={inputStyle}
          />
        </label>
      )}
      {type === "loan" && loanType === "open" && monthlyInterest && (
        <label className="block text-sm font-medium">
          Monthly Interest Rate (%)
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              onChange({ amount: value });
            }}
            value={monthlyInterest}
            className="mt-1 bg-gray-100"
            disabled
            style={inputStyle}
          />
        </label>
      )}
    </div>
  );
};
