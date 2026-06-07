import { collection, getDocs } from "firebase/firestore";
import { Event } from "@/types";
import { db } from "../firebase/config";

export default async function getLiveEvents(): Promise<Array<Event>> {
  try {

    const ref = collection(db, "events");
    const snapshot = await getDocs(ref);

    const eventsData = snapshot.docs.map(doc => {
      const raw = doc.data() as any;

      // prefer numeric id from document data, otherwise try to parse the document id
      const numericId = typeof raw.id === 'number'
        ? raw.id
        : (() => {
            const parsed = parseInt(doc.id, 10);
            return Number.isNaN(parsed) ? 0 : parsed;
          })();

      const { id: _docId, ...docData } = raw as Event;

      return {
        id: numericId,
        ...docData,
      } as Event;

    });

    return eventsData;

  } catch (err) {

    return [];

  }
} 
