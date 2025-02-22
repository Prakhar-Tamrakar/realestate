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
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
