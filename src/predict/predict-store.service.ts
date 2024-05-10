import { Firestore } from "@google-cloud/firestore";

export class PredictStoreService {


  async store(id: string, data: any) {
    const db = new Firestore();
   
    const predictCollection = db.collection('Predictions');
    return predictCollection.doc(id).set(data);
  }

  async histories() {
    const db = new Firestore();

    const predictCollection = db.collection('Predictions');
    const snapshots = await predictCollection.get()
    const docs = snapshots.docs.map((doc) => ({id: doc.id, history: doc.data()}))

    return docs
  }
}