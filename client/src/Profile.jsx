// import React, { useRef } from "react";
// import { useSelector } from "react-redux";

// export default function Profile() {
//   const { currentUser } = useSelector((state) => state.user);
//   const fileRef = useRef(null);
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-black text-center text-3xl font-semibold my-3 ">Profile</h1>
//       <form className="flex flex-col gap-4 mt-5 max-w-lg mx-auto">
//         <input type="file" ref = {fileRef} hidden accept="image/*"/>
//         <img
//           className="h-24 w-24  rounded-full object-cover self-center mt-2 cursor-pointer"
//           src={currentUser.avatar}
//           alt="userImage"
//           onClick={() => fileRef.current.click()}
//         />
//         <input type="text" placeholder="username" id="username" className=" p-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)]" />
//         <input type="email" placeholder="email" id="email" className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg" />
//         <input type="text" placeholder="password" id= "password" className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg" />
//         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">update</button>
//       </form>
//       <div className="flex justify-between mt-3">
//         <span className="text-red-700 cursor-pointer ">Delete Account</span>
//         <span className="text-red-700 cursor-pointer">Sign Out</span>
//       </div>
//     </div>
//   );
// }
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { updateUserSuccess } from "./redux/user/userSlice";
// import { toast } from "react-toastify";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageUrl = currentUser.avatar;

    if (selectedFile) {
      setUploading(true);
      try {
        const response = await fetch("/api/imagekit-auth");
        const { signature, expire, token, publicKey } = await response.json();

        const uploadResponse = await upload({
          file: selectedFile,
          fileName: selectedFile.name,
          publicKey,
          token,
          expire,
          signature,
        });

        imageUrl = uploadResponse.url;
        console.log("Image uploaded successfully:", imageUrl);
        // toast.success("Image uploaded successfully!");
      } catch (error) {
        if (error instanceof ImageKitAbortError) {
          alert("Upload aborted");
        } else if (error instanceof ImageKitInvalidRequestError) {
          alert("Invalid request");
        } else if (error instanceof ImageKitUploadNetworkError) {
          alert("Network error");
        } else if (error instanceof ImageKitServerError) {
          alert("Server error");
        } else {
          alert("Image upload failed");
        }
        console.error("Image upload error:", error);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    // Dispatch or send updated user info to backend
    const updatedUser = {
      ...currentUser,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      avatar: imageUrl,
    };

    dispatch(updateUserSuccess(updatedUser));
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-black text-center text-3xl font-semibold my-3">Profile</h1>

      <form className="flex flex-col gap-4 mt-5 max-w-lg mx-auto" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileSelect}
        />
        <img
          className="h-24 w-24 rounded-full object-cover self-center mt-2 cursor-pointer"
          src={selectedFile ? URL.createObjectURL(selectedFile) : currentUser.avatar}
          alt="user"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)]"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="shadow-[0px_0px_2px_0px_rgba(59,_130,_246,_0.5)] p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">
          {uploading ? "Uploading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

