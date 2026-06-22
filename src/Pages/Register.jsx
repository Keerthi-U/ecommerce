// src/pages/Register.jsx
import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "../Component/FormInput";
import SubmitBtn from "../Component/SubmitBtn";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; // 👈 use setDoc, not addDoc

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // ✅ Create Firebase Auth User
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // ✅ Update Auth Profile with Username
    await updateProfile(user, {
      displayName: data.username,
    });

    // ✅ Save User Info to Firestore at `/users/{uid}`
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: data.email,
      username: data.username,
      createdAt: new Date(),
    });

    toast.success("Registration successful");
    return { success: "Registration successful" };
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Registration failed: " + error.message);
    return { error: error.message };
  }
};

const Register = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <Form method="POST" className="w-96 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl text-center font-bold mb-6">Register</h1>

        <FormInput label="Username" name="username" type="text" size="w-full" required />
        <FormInput label="Email" name="email" type="email" size="w-full" required />
        <FormInput label="Password" name="password" type="password" size="w-full" required minLength={6} />

        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>

        <p className="text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
