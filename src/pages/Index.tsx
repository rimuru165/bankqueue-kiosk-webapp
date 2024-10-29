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
    <div className="min-h-screen bg-secondary p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {currentView === "menu" && (
          <KioskMenu onSelectOption={handleOptionSelect} />
        )}
        {currentView === "transaction" && (
          <TransactionFlow
            type={selectedOption}
            onComplete={handleTransactionComplete}
            onBack={handleBack}
          />
        )}
        {currentView === "receipt" && receiptData && (
          <DigitalReceipt
            data={receiptData}
            onClose={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Index;