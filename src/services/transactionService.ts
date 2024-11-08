import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TransactionData, ServerResponse } from "@/types/transactions";

interface ReceiptDocument extends DocumentData {
  queue_number: string;
  queue_prefix: string;
  timestamp: Date;
}

const getQueuePrefix = (type: string): string => {
  switch (type) {
    case "deposit":
      return "D";
    case "withdraw":
      return "W";
    case "open_account":
      return "OA";
    case "open_loan":
      return "OL";
    case "pay_loan":
      return "PL";
    case "close_account":
      return "CA";
    default:
      return "X";
  }
};

const getLastQueueNumber = async (prefix: string): Promise<number> => {
  try {
    // For loans, we need to check both OL and PL prefixes
    const receiptsRef = collection(db, "receipts");
    let q;
    
    if (prefix === "OL" || prefix === "PL") {
      // Query for both loan types
      q = query(
        receiptsRef,
        where("queue_prefix", "in", ["OL", "PL"]),
        orderBy("timestamp", "desc"),
        limit(1)
      );
    } else {
      q = query(
        receiptsRef,
        where("queue_prefix", "==", prefix),
        orderBy("timestamp", "desc"),
        limit(1)
      );
    }

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return 0;
    }

    const lastReceipt = querySnapshot.docs[0].data() as ReceiptDocument;
    const lastNumber = parseInt(lastReceipt.queue_number.slice(-2));
    
    return lastNumber;
  } catch (error) {
    console.error("Error getting last queue number:", error);
    return 0;
  }
};

const generateQueueNumber = async (type: string): Promise<string> => {
  const prefix = getQueuePrefix(type);
  const lastNumber = await getLastQueueNumber(prefix);
  const nextNumber = (lastNumber + 1) % 100; // Reset to 0 after 99
  return `${prefix}${nextNumber.toString().padStart(2, '0')}`;
};

export const createReceipt = async (data: TransactionData): Promise<ServerResponse> => {
  try {
    const queueNumber = await generateQueueNumber(data.type);
    const queuePrefix = getQueuePrefix(data.type);
    
    // Create a plain object with only serializable data
    const receipt = {
      ...data,
      queue_number: queueNumber,
      queue_prefix: queuePrefix,
      completed_at: null,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "receipts"), receipt);

    // Return a plain object without any non-serializable data
    return {
      ...receipt,
      queue_number: queueNumber,
    } as ServerResponse;
  } catch (error) {
    console.error("Error creating receipt:", error);
    throw new Error("Failed to create receipt in Firebase");
  }
};