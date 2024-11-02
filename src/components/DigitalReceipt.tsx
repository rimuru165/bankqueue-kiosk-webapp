import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerResponse } from "@/types/transactions";

interface DigitalReceiptProps {
  data: ServerResponse;
  onClose: () => void;
}

const DigitalReceipt = ({ data, onClose }: DigitalReceiptProps) => {
  return (
    <Card className="p-6 bg-white/80 shadow-lg animate-slideIn">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-primary">Digital Queue Receipt</h2>
        
        <div className="space-y-4 py-6 border-y border-primary/20">
          <div>
            <p className="text-sm text-gray-600">Queue Number</p>
            <p className="text-3xl font-bold text-primary">{data.queue_number}</p>
          </div>
          
          <div className="space-y-2">
            {data.firstname && data.lastname ? (
              <>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{data.firstname} {data.lastname}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Initial Balance</p>
                  <p className="font-medium">₱{data.amount?.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <>
                {data.account_ID && (
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="font-medium">{data.account_ID}</p>
                  </div>
                )}
                {data.amount !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-medium">₱{data.amount.toFixed(2)}</p>
                  </div>
                )}
                {data.monthly_interest !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Monthly Interest Rate</p>
                    <p className="font-medium">{data.monthly_interest}%</p>
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