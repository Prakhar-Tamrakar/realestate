import { auth, provider, signInWithPopup } from "../firebase"; // Correct import
import {useDispatch} from 'react-redux';
import { signInSuccess  } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook to navigate to the home page after signing in.
  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log("Successfully signed in with Google", result);
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      });
      const data = await res.json();
      console.log(data); // Check the response from the API server to see if the user was created successfully. If so, log the user in. If not, display an error message.
      dispatch(signInSuccess(data)); // Dispatch the user sign in action to Redux store.
      navigate("/"); // Navigate to the home page after signing in.
    } catch (error) {
      console.error("Could not sign in with Google", error);
    }
  };
  
  return (
    <button 
      onClick={handleGoogleClick} 
      type="button" 
     className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5 group"
              >
      Continue with Google
    </button>
  );
}
