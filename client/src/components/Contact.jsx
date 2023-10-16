import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      try {
        const res = await axios.get(`/api/v1/user/${listing.userRef}`);
        const data = await res.data;
        setLandlord(data);
      } catch (err) {
        console.log(err);
      }
    };

    getLandlord();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  //console.log(landlord);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            row="2"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message} `}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
