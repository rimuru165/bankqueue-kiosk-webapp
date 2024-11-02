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
    <Card className="p-8 bg-transparent">
      <div className="flex flex-col items-center mb-12">
        <img src="/logo.svg" alt="Fontain Bank Logo" className="w-24 h-24 mb-6" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
          Fontain Bank Inc.
        </h1>
        <p className="text-cyan-100/80">Digital Banking Solutions</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-3 text-lg 
                     bg-white/5 hover:bg-white/10 border-cyan-500/20 hover:border-cyan-400/30
                     text-cyan-100 transition-all duration-300 group"
            onClick={() => onSelectOption(option.id)}
          >
            <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
              {option.icon}
            </div>
            <span className="font-medium">{option.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default KioskMenu;