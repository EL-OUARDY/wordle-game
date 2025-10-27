import { db } from "@/lib/firebase";
import { collection, addDoc, doc, getDoc, Timestamp } from "firebase/firestore";

const customWordsRef = collection(db, "customWordles");

export interface CustomWord {
  word: string;
  creator?: string | null;
  createdAt: Timestamp;
}

const CreateService = {
  createCustomWord: async (word: string, creator?: string) => {
    const docData: CustomWord = {
      word: word.toLowerCase(),
      creator: creator || null,
      createdAt: Timestamp.now(),
    };
    const docRef = await addDoc(customWordsRef, docData);
    return docRef.id;
  },

  getCustomWord: async (id: string): Promise<CustomWord | null> => {
    const docRef = doc(db, "customWordles", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as CustomWord;
  },
};

export default CreateService;
