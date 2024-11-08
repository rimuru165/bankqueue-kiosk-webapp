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
  const inputClasses = "bg-white/10 border-cyan-500/30 text-cyan-100 placeholder-cyan-100/50 focus:border-cyan-400/50 focus:ring-cyan-400/20";

  const handleAmountChange = (value: string) => {
    // Allow only numbers and one decimal point
    const sanitizedValue = value.replace(/[^\d.]/g, "");
    // Ensure only one decimal point
    const decimalCount = (sanitizedValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      const parts = sanitizedValue.split('.');
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    onChange({ amount: value });
  };

  if (type === "openAccount") {
    return (
      <div className="space-y-4">
        <label className="block">
          <span className="text-cyan-100">First Name</span>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={inputClasses}
            required
          />
        </label>
        <label className="block">
          <span className="text-cyan-100">Last Name</span>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={inputClasses}
            required
          />
        </label>
        <label className="block">
          <span className="text-cyan-100">Initial Balance</span>
          <Input
            type="text"
            inputMode="decimal"
            value={formData.amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={inputClasses}
            required
            style={inputStyle}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-cyan-100">Account Number</span>
        <Input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          value={formData.accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            onChange({ accountNumber: value });
          }}
          className={inputClasses}
          required
          style={inputStyle}
        />
      </label>
      {type !== "closeAccount" && (
        <label className="block">
          <span className="text-cyan-100">
            {type === "loan"
              ? loanType === "open"
                ? "Loan Amount"
                : "Payment Amount"
              : "Amount"}
          </span>
          <Input
            type="text"
            inputMode="decimal"
            value={formData.amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={inputClasses}
            required
            style={inputStyle}
          />
        </label>
      )}
      {type === "loan" && loanType === "open" && monthlyInterest && (
        <label className="block">
          <span className="text-cyan-100">Monthly Interest Rate (%)</span>
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              onChange({ amount: value });
            }}
            value={monthlyInterest}
            className={`${inputClasses} bg-white/5`}
            disabled
            style={inputStyle}
          />
        </label>
      )}
    </div>
  );
};