import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TransactionData, ServerResponse } from "@/types/transactions";

export const createReceipt = async (data: TransactionData): Promise<ServerResponse> => {
  try {
    const queueNumber = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const receipt = {
      ...data,
      queue_number: queueNumber,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "receipts"), receipt);

    return {
      ...receipt,
      queue_number: queueNumber,
    } as ServerResponse;
  } catch (error) {
    console.error("Error creating receipt:", error);
    throw new Error("Failed to create receipt in Firebase");
  }
};