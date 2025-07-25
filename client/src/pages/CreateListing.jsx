import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import imageCompression from "browser-image-compression";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountedPrice: 0,
    imageUrls: [],
    bathrooms: "",
    bedrooms: "",
    furnished: false,
    parking: false,
    type: "",
    offer: false,
  });
  console.log(formData);

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const[imageUploadError, setImageUploadError] = useState("");
  const [loading, setLoading] = useState(false);

  // ! This function handles the change in form fields
  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  //! This function compresses the image before uploading it to ImageKit (used in handleUpload function)
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 5, // Target max size (MB)
      maxWidthOrHeight: 1024, // Resize to max width/height
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Compression failed:", error);
      return file; // fallback
    }
  };

  //! this function handles the image upload to ImageKit
  //! It uses the ImageKit SDK to upload images and returns the uploaded URLs.
  const handleUpload = async () => {
    if (!selectedFile.length) {
      alert("Please select at least one image.");
      return;
    }
    setUploading(true);
    const uploadedUrls = [];

    for (let i = 0; i < selectedFile.length; i++) {
      const compressedFile = await compressImage(selectedFile[i]);
      // const file = selectedFile[i];
      try {
        const authRes = await fetch("/api/imagekit-auth");
        const { signature, expire, token, publicKey } = await authRes.json();

        const uploadResponse = await upload({
          file: compressedFile,
          // file,
          fileName: `${Date.now()}_${compressedFile.name}`,
          // fileName: `${Date.now()}_${file.name}`,
          folder: "PropertyImages",
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
    setFormData((prev) => ({ ...prev, imageUrls: uploadedUrls }));
    setUploading(false);
  };

  //! This function handles the form submission for creating a new listing.
  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (formData.regularPrice <= formData.discountedPrice) {
      setError("Discounted price cannot be greater than regular price.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      if (data.success == false) {
        alert(data.message);
        return;
      }
      setLoading(false);
      console.log("Listing created successfully:", data);
      alert("Listing created successfully!");
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError("Failed to create listing. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center mt-2 mb-5">
        Create a Listing
      </h1>
      <form
        onSubmit={handleCreateListing}
        className="flex flex-col w-full gap-4 sm:flex-row  p-5 rounded-lg shadow-[0px_5px_13px_5px_rgba(0,_0,_0,_0.1)]"
      >
        <div className=" flex flex-col gap-4 flex-1   ">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3 "
            id="name"
            maxLength="62"
            minLength="1"
            required
            value={formData.name}
            onChange={handleOnChange}
          />

          {/* // * description field  */}
          <textarea
            type="text"
            placeholder="description"
            className="border rounded-lg p-3 "
            id="description"
            required
            value={formData.description}
            onChange={handleOnChange}
          />

          {/* // * Address field  */}
          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="address"
            required
            value={formData.address}
            onChange={handleOnChange}
          />

          {/* // * sell and rent field  */}
          <div className=" flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input
                type="radio"
                id="type"
                name="type" // ✅ same name groups them
                value="sell"
                className="w-5"
                checked={formData.type === "sell"}
                onChange={handleOnChange}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="type"
                name="type" // ✅ same name groups them
                value="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleOnChange}
              />
              <span>Rent</span>
            </div>

            {/* // * parking , furnished, offer field */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleOnChange}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleOnChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleOnChange}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* // * bedrooms, bathrooms, regularPrice, discountedPrice fields */}
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleOnChange}
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
                onChange={handleOnChange}
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
                onChange={handleOnChange}
              />
              <div className=" flex flex-col items-center">
                <p>Regular price</p>
                <span
                  className={`text-xs ${
                    formData.type === "rent" ? " flex " : "hidden"
                  }`}
                >
                  ($ / month)
                </span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  min="1"
                  max="100000"
                  required
                  value={formData.discountedPrice}
                  onChange={handleOnChange}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className=" flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span
                    className={`text-xs ${
                      formData.type === "rent" ? " flex " : "hidden"
                    }`}
                  >
                    ($ / month)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images
            <span className="font-normal text-gray-600 ml-2">
              Upload up to 6 images (jpg, png, jpeg) - max size 5MB each
            </span>
          </p>

          {/* // * Image upload section */}
          <div className=" flex mt-2 gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border border-gray-300 rounded w-full p-3"
              onChange={(e) => {
                const files = e.target.files;
                const maxImages = 6;
                const minImages = 1;

                if (files.length < minImages) {
                  setImageUploadError(`Please select at least ${minImages} image${minImages > 1 ? "s" : ""}.`);
                  e.target.value = null; // reset input
                  return;
                }

                if (files.length > maxImages) {
                  setImageUploadError(`You can upload a maximum of ${maxImages} images.`);
                  e.target.value = null; // reset input
                  return;
                }
                if(files.length + formData.imageUrls.length > minImages && files.length + formData.imageUrls.length < maxImages) setImageUploadError("");
                setSelectedFile(files);
              }}
            />

            <button
              type="button"
              onClick={handleUpload} // * this button handles the image upload
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              {Array.from(selectedFile).map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-2 bg-gray-100 mt-2 p-2 rounded"
                >
                  <img
                    className="h-10 w-10 object-cover rounded"
                    src={URL.createObjectURL(file)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedFile((prev) =>
                        Array.from(prev).filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-500  hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {imageUploadError && <p className="text-red-500 mt-2">{imageUploadError}</p>}
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 mt-4 disabled:opacity-80"
            disabled={formData.imageUrls.length < 1 || uploading || loading}
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
