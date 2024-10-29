import { Banknote, UserPlus, Wallet, Receipt, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface KioskMenuProps {
  onSelectOption: (option: string) => void;
}

const KioskMenu = ({ onSelectOption }: KioskMenuProps) => {
  const menuOptions = [
    { id: "deposit", label: "Deposit", icon: <Banknote className="w-6 h-6" /> },
    { id: "withdraw", label: "Withdraw", icon: <Wallet className="w-6 h-6" /> },
    { id: "openAccount", label: "Open Account", icon: <UserPlus className="w-6 h-6" /> },
    { id: "loan", label: "Loan", icon: <Receipt className="w-6 h-6" /> },
    { id: "closeAccount", label: "Close Account", icon: <UserMinus className="w-6 h-6" /> },
  ];

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-primary">Welcome to Digital Banking</h2>
      <div className="grid grid-cols-2 gap-4">
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 text-lg hover:bg-secondary transition-colors"
            onClick={() => onSelectOption(option.id)}
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default KioskMenu;