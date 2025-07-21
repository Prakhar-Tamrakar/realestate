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
import { Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { set } from "mongoose";

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
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // ✅ Move these inside the component
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteListingConfirm, setShowDeleteListingConfirm] =
    useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  console.log(selectedListingId);

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
          folder: "ProfileImages",
          publicKey,
          token,
          expire,
          signature,
        });

        imageUrl = uploadResponse.url;
        setAvatarUrl(imageUrl);
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

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message));
        alert(data.message || "Failed to update user.");
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
      if (!res.ok || data.success === false) {
        dispatch(deleteUserFailure(data.message));
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
      dispatch(signOutUserFailure(error));
    }
  };

  const handleShowListing = async () => {
    // If already fetched once, just toggle visibility
    if (hasFetched) {
      setOpen(!open);
      return;
    }

    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) {
        alert(data.message || "Failed to fetch listings.");
        return;
      }

      setListings(data.data);
      setHasFetched(true);
      setOpen(true);
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  const handleDeleteListing = (listingId) => async () => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        alert(data.message || "Failed to delete listing.");
        return;
      }
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      alert("Something went wrong while deleting the listing.");
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

        <Link
          to={"/create-listing"}
          className="bg-green-700 hover:opacity-90 p-3 rounded-lg text-white uppercase text-center"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-3">
        <span
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={() => setShowSignOutConfirm(true)}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      {showDeleteConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete your account?"
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDeleteUser();
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showSignOutConfirm && (
        <ConfirmationModal
          message="Are you sure you want to sign out?"
          onConfirm={() => {
            setShowSignOutConfirm(false);
            handleSignOut();
          }}
          onCancel={() => setShowSignOutConfirm(false)}
        />
      )}

      <p className="text-green-700 mt-2">
        {updateSuccess ? "User Updated Successfully" : ""}
      </p>

      <button
        onClick={handleShowListing}
        className="bg-gray-300 text-center font-bold text-black rounded p-1 w-full"
      >
        {open ? "Hide Listing" : "Show Listing"}
      </button>

      {open && (
        <>
          <p className="font-bold text-center mt-4 text-2xl">Your Listings</p>
          <ul>
            {listings.map((listing) => (
              <li
                key={listing._id}
                className="flex justify-between gap-4 h-15 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 my-2 rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="rounded"
                    src={listing.imageUrls[0]}
                    width={80}
                    height={80}
                    alt="no image"
                  />
                  <div>
                    <h3 className="font-bold">Name: {listing.name}</h3>
                    <p className="text-gray-500">
                      Price: ${listing.regularPrice}
                    </p>
                  </div>
                </div>
                <div>
                  <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-500 block">Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedListingId(listing._id);
                      setShowDeleteListingConfirm(true);
                    }}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {showDeleteListingConfirm && selectedListingId && (
        <ConfirmationModal
          message="Are you sure you want to delete this listing?"
          onConfirm={() => {
            handleDeleteListing(selectedListingId)();
            setShowDeleteListingConfirm(false);
            setSelectedListingId(null);
          }}
          onCancel={() => {
            setShowDeleteListingConfirm(false);
            setSelectedListingId(null);
          }}
        />
      )}
    </div>
  );
}
