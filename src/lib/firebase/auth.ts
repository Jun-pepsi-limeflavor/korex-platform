import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import type { User } from "@/types";

const BLOCKED_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
  "icloud.com", "aol.com", "protonmail.com", "live.com",
];

export function isBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && !BLOCKED_DOMAINS.includes(domain);
}

export async function signUp(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  country: string;
  jobTitle?: string;
  marketingOptIn: boolean;
}) {
  if (!isBusinessEmail(data.email)) {
    throw new Error("Please use a business email address.");
  }

  const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  await sendEmailVerification(credential.user);

  // Firestore does not accept undefined values — omit optional fields when absent
  const userDoc: Record<string, unknown> = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.company,
    phone: data.phone,
    country: data.country,
    accountStatus: "active",
    role: "user",
    marketingOptIn: data.marketingOptIn,
    createdAt: serverTimestamp(),
  };
  if (data.jobTitle) userDoc.jobTitle = data.jobTitle;

  await setDoc(doc(db, "users", credential.user.uid), userDoc);

  return credential.user;
}

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  return signOut(auth);
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as User;
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
