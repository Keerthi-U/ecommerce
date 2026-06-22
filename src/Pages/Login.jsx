import React from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import FormInput from "../Component/FormInput";
import SubmitBtn from "../Component/SubmitBtn";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Attempt login with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    return { success: "Login successful" };
  } catch (error) {
    let errorMessage = "Login failed. Please try again.";

    if (error.code === "auth/user-not-found") {
      errorMessage = "User not found. Please register first.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    }

    return { error: errorMessage };
  }
};

const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success);
      setTimeout(() => navigate("/"), 2000); 
    }
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 shadow-md	">
      <ToastContainer position="top-center" autoClose={3000} />
      <Form method="POST" className="w-96 bg-white p-6 rounded-lg ">
        <h1 className="text-center text-3xl font-bold mb-6">Login</h1>
        <label class="block mb-2">
      <span class="text-gray-700">Email</span>
        <FormInput type="email"  name="email" required />
        </label>
        <label class="block mb-2">
      <span class="text-gray-700">Password</span>
        <FormInput type="password"  name="password" required minLength={6} />
</label>
        <div className="mt-4">
          <SubmitBtn text="Login"   />
        </div>

        <p className="text-center mt-4">
          Not a member yet?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
