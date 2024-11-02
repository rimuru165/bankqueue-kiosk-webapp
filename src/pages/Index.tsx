import { useState } from "react";
import KioskMenu from "@/components/KioskMenu";
import TransactionFlow from "@/components/TransactionFlow";
import DigitalReceipt from "@/components/DigitalReceipt";

const Index = () => {
  const [currentView, setCurrentView] = useState("menu");
  const [selectedOption, setSelectedOption] = useState("");
  const [receiptData, setReceiptData] = useState(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCurrentView("transaction");
  };

  const handleTransactionComplete = (data: any) => {
    const queueNumber = Math.random().toString(36).substring(2, 7).toUpperCase();
    setReceiptData({
      ...data,
      queueNumber,
    });
    setCurrentView("receipt");
  };

  const handleBack = () => {
    setCurrentView("menu");
    setSelectedOption("");
    setReceiptData(null);
  };

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
      style={{ 
        backgroundImage: 'url("/underwater-bg.jpg")',
        backgroundColor: '#001a33',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse -bottom-48 -right-48"></div>
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
      </div>

      <div className="w-full max-w-2xl relative">
        {currentView === "menu" && (
          <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <KioskMenu onSelectOption={handleOptionSelect} />
          </div>
        )}
        {currentView === "transaction" && (
          <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <TransactionFlow
              type={selectedOption}
              onComplete={handleTransactionComplete}
              onBack={handleBack}
            />
          </div>
        )}
        {currentView === "receipt" && receiptData && (
          <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <DigitalReceipt
              data={receiptData}
              onClose={handleBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;