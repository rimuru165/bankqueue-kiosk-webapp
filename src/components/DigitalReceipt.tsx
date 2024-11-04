import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerResponse } from "@/types/transactions";

interface DigitalReceiptProps {
  data: ServerResponse;
  onClose: () => void;
}

const DigitalReceipt = ({ data, onClose }: DigitalReceiptProps) => {
  return (
    <Card className="p-6 bg-secondary/30 backdrop-blur-md border border-cyan-500/20">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text">
          Digital Queue Receipt
        </h2>
        
        <div className="space-y-4 py-6 border-y border-cyan-500/20">
          <div>
            <p className="text-cyan-100/80">Queue Number</p>
            <p className="text-3xl font-bold text-cyan-300">{data.queue_number}</p>
          </div>
          
          <div className="space-y-2">
            {data.firstname && data.lastname ? (
              <>
                <div>
                  <p className="text-cyan-100/80">Name</p>
                  <p className="text-cyan-100">{data.firstname} {data.lastname}</p>
                </div>
                <div>
                  <p className="text-cyan-100/80">Initial Balance</p>
                  <p className="text-cyan-100">₱{data.amount?.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <>
                {data.account_ID && (
                  <div>
                    <p className="text-cyan-100/80">Account Number</p>
                    <p className="text-cyan-100">{data.account_ID}</p>
                  </div>
                )}
                {data.amount !== undefined && (
                  <div>
                    <p className="text-cyan-100/80">Amount</p>
                    <p className="text-cyan-100">₱{data.amount.toFixed(2)}</p>
                  </div>
                )}
                {data.monthly_interest !== undefined && (
                  <div>
                    <p className="text-cyan-100/80">Monthly Interest Rate</p>
                    <p className="text-cyan-100">{data.monthly_interest}%</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-cyan-100/80">
          Please wait for your number to be called
        </p>
        
        <Button 
          onClick={onClose} 
          className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-100 border border-cyan-500/50"
        >
          Done
        </Button>
      </div>
    </Card>
  );
};

export default DigitalReceipt;