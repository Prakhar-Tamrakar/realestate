import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

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
  const [urlList, setUrlList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setFormData((prev) => ({ ...prev, imageUrls: uploadedUrls }));

    // setUrlList((prev) => [...prev, ...uploadedUrls]);
    // setFormData((prev) => ({
    //   ...prev,
    //   imageUrls: uploadedUrls,
    // }));
    setUploading(false);
  };

  // todo : this method will handle the creation of the listing

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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* // * description field  */}
          <textarea
            type="text"
            placeholder="description"
            className="border rounded-lg p-3 "
            id="description"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* // * Address field  */}
          <input
            type="text"
            placeholder="Address"
            className="border rounded-lg p-3"
            id="Address"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />

          {/* // * sell and rent field  */}
          <div className=" flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input
                type="radio"
                id="sell"
                name="type" // ✅ same name groups them
                value="sell"
                className="w-5"
                checked={formData.type === "sell"}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }));
                }}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="rent"
                name="type" // ✅ same name groups them
                value="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }));
                }}
              />
              <span>Rent</span>
            </div>

            {/* // * parking , furnished, offer field */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    parking: e.target.checked,
                  }));
                }}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    furnished: e.target.checked,
                  }));
                }}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    offer: e.target.checked,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bedrooms: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    bathrooms: e.target.value,
                  }));
                }}
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    regularPrice: e.target.value,
                  }));
                }}
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discountedPrice: e.target.value,
                    }))
                  }
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
              className=" border border-gray-300 rounded w-full p-3"
              onChange={(e) => setSelectedFile(e.target.files)}
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
