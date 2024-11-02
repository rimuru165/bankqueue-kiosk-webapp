import { TransactionCard } from "./transactions/TransactionCard";
import { TransactionButton } from "./transactions/TransactionButton";
import { ServerResponse } from "@/types/transactions";

interface DigitalReceiptProps {
  data: ServerResponse;
  onClose: () => void;
}

const DigitalReceipt = ({ data, onClose }: DigitalReceiptProps) => {
  return (
    <TransactionCard>
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text animate-pulse shadow-glow">
          Digital Queue Receipt
        </h2>
        
        <div className="space-y-4 py-6 border-y border-cyan-400/20">
          <div>
            <p className="text-sm text-cyan-100/80">Queue Number</p>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text animate-pulse shadow-glow">
              {data.queue_number}
            </p>
          </div>
          
          <div className="space-y-2">
            {data.firstname && data.lastname ? (
              <>
                <div>
                  <p className="text-sm text-cyan-100/80">Name</p>
                  <p className="font-medium text-cyan-100">{data.firstname} {data.lastname}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-100/80">Initial Balance</p>
                  <p className="font-medium text-cyan-100">₱{data.amount?.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <>
                {data.account_ID && (
                  <div>
                    <p className="text-sm text-cyan-100/80">Account Number</p>
                    <p className="font-medium text-cyan-100">{data.account_ID}</p>
                  </div>
                )}
                {data.amount !== undefined && (
                  <div>
                    <p className="text-sm text-cyan-100/80">Amount</p>
                    <p className="font-medium text-cyan-100">₱{data.amount.toFixed(2)}</p>
                  </div>
                )}
                {data.monthly_interest !== undefined && (
                  <div>
                    <p className="text-sm text-cyan-100/80">Monthly Interest Rate</p>
                    <p className="font-medium text-cyan-100">{data.monthly_interest}%</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-cyan-100/80 text-shadow-neon">
          Please wait for your number to be called
        </p>
        
        <TransactionButton onClick={onClose} className="w-full">
          Done
        </TransactionButton>
      </div>
    </TransactionCard>
  );
};

export default DigitalReceipt;