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
    <Card className="p-6 bg-transparent shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.svg" alt="Fontain Bank Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold text-primary mb-2">Fontain Bank Inc.</h1>
        <p className="text-sm text-gray-400">Digital Banking Solutions</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 text-lg hover:bg-secondary/80 transition-colors border-2 border-primary/20 bg-secondary/40"
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