import React from "react";

const OrdersList = ({ orders }) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-xl p-6">
      <h4 className="text-2xl font-semibold mb-4 text-green-900">
        Recent Orders
      </h4>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-200 rounded-lg">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm md:text-base">Order ID</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Book</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Qty</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Total</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-4 text-green-700 font-medium"
                >
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b border-green-200 hover:bg-green-100 transition"
                >
                  <td className="px-4 py-2 text-sm md:text-base">{o._id}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{o.book.title}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{o.quantity}</td>
                  <td className="px-4 py-2 text-sm md:text-base">₹{o.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        o.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
