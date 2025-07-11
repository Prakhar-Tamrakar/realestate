
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import React, { useState } from "react";

const CreateListing = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile.length) {
      alert("Please select at least one image.");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    for (let i = 0; i < selectedFile.length; i++) {
      const file = selectedFile[i];
      try {
        const authRes = await fetch("/api/imagekit-auth");
        const { signature, expire, token, publicKey } = await authRes.json();

        const uploadResponse = await upload({
          file,
          fileName: `${Date.now()}_${file.name}`,
          publicKey,
          token,
          expire,
          signature,
        });

        uploadedUrls.push(uploadResponse.url);
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
        setUploading(false);
        return;
      }
    }

    setUrlList((prev) => [...prev, ...uploadedUrls]); // ✅ add all URLs
    setUploading(false);
    };

  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center mt-2 mb-5">
        Create a Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row  border p-3 rounded-lg shadow-lg">
        <div className=" flex flex-col gap-4 flex-1   ">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3 "
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            className="border rounded-lg p-3 "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="Address"
            required
          />

          <div className=" flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className=" flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="100000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className=" flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images
            <span className="font-normal text-gray-600 ml-2">
              Upload up to 6 images (jpg, png, jpeg) - max size 5MB each
            </span>
          </p>
          <div className=" flex mt-2 gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className=" border border-gray-300 rounded w-full p-3"
              onChange={(e) => setSelectedFile(e.target.files)}
            />
            <button
              type="button"
              onClick={handleUpload}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 mt-4 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
