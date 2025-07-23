import React, { useEffect, useState } from "react";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleOnchange = (e) => {
    setMessage(e.target.value);
  };

  const openCenteredPopup = (url, title, w, h) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth || document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;

    const left = (width - w) / 2 + dualScreenLeft;
    const top = (height - h) / 2 + dualScreenTop;

    const popup = window.open(
      url,
      title,
      `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`
    );

    if (popup) {
      popup.focus();

      const timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          setShowSuccess(true); // ✅ show success popup
          setMessage(""); // ✅ clear textarea
        }
      }, 500); // check every 0.5s if the popup is closed
    }
  };

  return (
    <div className="relative">
      {error && (
        <p className="text-red-500 text-lg uppercase">User not Found</p>
      )}

      {landlord && (
        <>
          <p>
            Contact <span className="font-semibold">{landlord.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows="3"
            className="w-full my-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-100/30"
            onChange={handleOnchange}
            value={message}
            placeholder="Enter your message here..."
          />

          <button
            onClick={() => {
              const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${
                landlord.email
              }&su=Regarding ${listing.name}&body=${encodeURIComponent(message)}`;
              openCenteredPopup(gmailUrl, "Gmail", 600, 500);
            }}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 block mt-2"
          >
            Send via Gmail
          </button>
        </>
      )}

      {/* ✅ Custom success popup */}
      {showSuccess && (
        <div className="fixed bottom-8 right-1/2 translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-bounce">
           Message sent successfully!
          <button
            className="ml-4 text-sm underline"
            onClick={() => setShowSuccess(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
