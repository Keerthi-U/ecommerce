import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import About from "./Pages/About";
import CartPage from "./Pages/Cart";
import ProductContainer from "./Pages/ProductContainer";
import NotFound from "./Pages/NotFound";
import CheckoutPage from "./Pages/Checkout";
import ProductDetails from "./Component/ProductDetails";
import ThankYou from "./Pages/ThankYou";
import { action as registerAction } from  "./Pages/Register"
import { action as loginAction } from "./Pages/Login"
import Layout from "./Layout";

const router = createBrowserRouter([
 {
   path: '/',
    element: <Layout><Home /></Layout>,
    errorElement: <Error />,
 },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
    
  },
  {
 path: '/login',
 element:<Login />,
  errorElement: <Error />,
 action: loginAction,
  },
   {
    path: "/about",
    element: <Layout><About /></Layout>,  
    errorElement: <Error />,
  },
     {
    path: "/product",
    element: <Layout><ProductContainer /></Layout>,  
    errorElement: <Error />,
  },
  {
    path: "/cart",
    element: <Layout><CartPage /></Layout>,  
    errorElement: <Error />,
  },
  {
    path: "/product/:id", // NEW ROUTE for Single Product
    element: <Layout><ProductDetails /></Layout>,  
    errorElement: <Error />,
  },
    {
    path: "/checkout",
    element: <Layout><CheckoutPage /></Layout>,  
    errorElement: <Error />,
  },
    {
    path: "/thankyou",
    element: <Layout><ThankYou /></Layout>,  
    errorElement: <Error />,
  },
      {
    path: "*",
    element: <Layout><NotFound /></Layout>,  
    errorElement: <Error />,
  },

]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
