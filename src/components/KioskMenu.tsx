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
    <Card className="p-4 sm:p-8 bg-transparent">
      <div className="flex flex-col items-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text 
                     animate-pulse mb-2">
          Fontaine Bank Inc.
        </h1>
        <p className="text-cyan-100/80">Digital Banking Solutions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="h-24 sm:h-32 flex flex-col items-center justify-center gap-3 text-base sm:text-lg 
                     bg-white/5 hover:bg-white/10 border-cyan-500/20 hover:border-cyan-400 
                     text-cyan-100 transition-all duration-300 group"
            onClick={() => onSelectOption(option.id)}
          >
            <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors 
                          transform group-hover:scale-110 duration-300">
              {option.icon}
            </div>
            <span className="font-medium group-hover:text-cyan-300">{option.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default KioskMenu;