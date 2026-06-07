import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

// Email validation regex - RFC 5322 simplified
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Trim and validate length
  const trimmedEmail = email.trim();
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) {
    return false;
  }
  
  // Check format
  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }
  
  // Prevent common injection patterns
  if (trimmedEmail.includes('<') || trimmedEmail.includes('>') || trimmedEmail.includes('"')) {
    return false;
  }
  
  return true;
}

export default async function subscribeNewsletter(email: string) {
  try {
    // Server-side validation - CRITICAL SECURITY
    if (!validateEmail(email)) {
      console.warn("Invalid email format attempted");
      throw new Error("Invalid email format");
    }

    console.log("Preparing subscription...");

    const ref = collection(db, "subscribers");

    // Use the trimmed email for consistency
    const normalizedEmail = email.trim().toLowerCase();

    await addDoc(ref, {
      email: normalizedEmail,
      addedOn: serverTimestamp(),
      status: "active"
    });

    console.log("Successfully subscribed:", normalizedEmail);
    return { success: true };

  } catch (err) {
    console.error("Subscription error:", err);
    throw new Error("Failed to subscribe. Please try again.");
  }
}