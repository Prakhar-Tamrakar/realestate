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
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { deleteUser } from "../../../api/controllers/user.controller";
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || "");
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    let imageUrl = avatarUrl;

    if (selectedFile) {
      setUploading(true);
      try {
        const authRes = await fetch("/api/imagekit-auth");
        const { signature, expire, token, publicKey } = await authRes.json();

        const uploadResponse = await upload({
          file: selectedFile,
          fileName: `${Date.now()}_${selectedFile.name}`,
          publicKey,
          token,
          expire,
          signature,
        });

        imageUrl = uploadResponse.url;
        setAvatarUrl(imageUrl);
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        let message = "Image upload failed";
        if (error instanceof ImageKitAbortError) message = "Upload aborted";
        else if (error instanceof ImageKitInvalidRequestError)
          message = "Invalid upload request";
        else if (error instanceof ImageKitUploadNetworkError)
          message = "Network error during upload";
        else if (error instanceof ImageKitServerError)
          message = "ImageKit server error";

        alert(message);
        dispatch(updateUserFailure(message));
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          ...(formData.password && { password: formData.password }),
          avatar: imageUrl,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("Update response:", data);

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        alert(data.message);
        return;
      }

      dispatch(
        updateUserSuccess({
          ...currentUser,
          username: formData.username,
          email: formData.email,
          avatar: imageUrl,
        })
      );
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Update error:", error);
      dispatch(updateUserFailure(error.message));
      alert("Something went wrong while updating profile.");
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        // alert(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", { method: "GET" });
      const data = await res.json();
      if (data.success === false) {
        alert(data.message);
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-black text-center text-3xl font-semibold my-3">
        Profile
      </h1>

      <form className="flex flex-col gap-4 mt-5" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileSelect}
        />

        <img
          className="h-24 w-24 rounded-full object-cover self-center mt-2 cursor-pointer"
          src={selectedFile ? URL.createObjectURL(selectedFile) : avatarUrl}
          alt="user"
          onClick={() => fileRef.current.click()}
        />

        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 rounded-lg shadow-md"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg shadow-md"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password (leave blank if unchanged)"
          id="password"
          className="p-3 rounded-lg shadow-md"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update"}
        </button>
        <Link to={"/create-listing"} className="bg-green-700 hover:opacity-90 p-3 rounded-lg text-white uppercase text-center"> create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      {/* <p className="text-red-700">{error ? error : " "}</p> */}
      <p className="text-green-700">
        {updateSuccess ? "User Updated Successfully" : " "}
      </p>
    </div>
  );
}