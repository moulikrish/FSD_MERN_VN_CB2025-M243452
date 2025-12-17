import React from "react";

const SellerProfile = () => {
  const seller = {
    name: "Mouli Seller",
    email: "seller@example.com",
    phone: "9876543210",
    storeName: "Mouli Books",
    avatar: "/mnt/data/Screenshot 2025-11-20 100521.png",
    createdAt: "2024-01-10T12:00:00Z",
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">
        Seller Profile
      </h4>

      {/* <div className="flex flex-col items-center mb-5">
        <img
          src={seller.avatar}
          alt="Seller Avatar"
          className="w-28 h-28 rounded-full object-cover shadow"
        />
      </div> */}

      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Name: </span>
          {seller.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email: </span>
          {seller.email}
        </p>
        {/* <p className="text-gray-700">
          <span className="font-semibold">Phone: </span>
          {seller.phone}
        </p> */}
        <p className="text-gray-700">
          <span className="font-semibold">Store Name: </span>
          {seller.storeName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Joined: </span>
          {seller.createdAt
            ? new Date(seller.createdAt).toDateString()
            : "N/A"}
        </p>
      </div>

      {/* <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        Edit Profile
      </button> */}
    </div>
  );
};

export default SellerProfile;
