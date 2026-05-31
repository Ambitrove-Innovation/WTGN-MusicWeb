import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

export default async function subscribeNewsletter(email: string) {

    try {

        console.log("Preparing...")

        const ref = doc(db, "subscribers", "emails");

        await setDoc(ref, {
            batch: arrayUnion(email)
        }, { merge: true})

        console.log("Successfully subscribed");


    } catch (err) {

        console.log("Error occured");
        console.error(err);

    }
}