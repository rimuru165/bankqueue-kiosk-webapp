import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DigitalReceiptProps {
  data: {
    accountNumber?: string;
    amount?: string;
    queueNumber: string;
    firstName?: string;
    lastName?: string;
  };
  onClose: () => void;
}

const DigitalReceipt = ({ data, onClose }: DigitalReceiptProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg animate-slideIn">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-primary">Digital Queue Receipt</h2>
        
        <div className="space-y-4 py-6 border-y">
          <div>
            <p className="text-sm text-gray-600">Queue Number</p>
            <p className="text-3xl font-bold text-primary">{data.queueNumber}</p>
          </div>
          
          <div className="space-y-2">
            {data.firstName && data.lastName ? (
              <>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{data.firstName} {data.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Initial Balance</p>
                  <p className="font-medium">₱{parseFloat(data.amount || "0").toFixed(2)}</p>
                </div>
              </>
            ) : (
              <>
                {data.accountNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="font-medium">{data.accountNumber}</p>
                  </div>
                )}
                {data.amount && (
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-medium">₱{parseFloat(data.amount).toFixed(2)}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Please wait for your number to be called
        </p>
        
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </Card>
  );
};

export default DigitalReceipt;