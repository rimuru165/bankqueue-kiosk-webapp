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
      className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/underwater-bg.jpg")' }}
    >
      <div className="w-full max-w-2xl backdrop-blur-sm">
        {currentView === "menu" && (
          <div className="bg-white/80 rounded-lg shadow-lg">
            <KioskMenu onSelectOption={handleOptionSelect} />
          </div>
        )}
        {currentView === "transaction" && (
          <div className="bg-white/80 rounded-lg shadow-lg">
            <TransactionFlow
              type={selectedOption}
              onComplete={handleTransactionComplete}
              onBack={handleBack}
            />
          </div>
        )}
        {currentView === "receipt" && receiptData && (
          <div className="bg-white/80 rounded-lg shadow-lg">
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