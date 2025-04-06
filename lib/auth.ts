import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { deleteCookie, setCookie } from "cookies-next";

// Register with email & password
export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login with email & password
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Set the authentication token in cookies
    setCookie("authToken", userCredential.user?.uid, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    console.log("Auth token set:", userCredential.user?.uid); // Debug log
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with Google
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Set the authentication token in cookies
    setCookie("authToken", result.user?.uid, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    console.log("Auth token set:", result.user?.uid); // Debug log
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    deleteCookie("authToken", { path: "/" }); // Ensure the cookie is deleted
    console.log("Auth token deleted"); // Debug log
  } catch (error: any) {
    throw new Error(error.message);
  }
};
