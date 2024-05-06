function MyOrderCard({order}) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-3/4 mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
        <p className="text-gray-600">
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-wrap -mx-2">
        {Object.values(order.items).map((item, index) => {
          return (
            <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <div className="bg-gray-100 p-2 rounded-md">
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  {item.quantity} x {item.price.toFixed(2)} {item.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Total Price: ${order.totalPrice.toFixed(2)}
        </p>
        <p className="text-lg font-semibold">
          Total Price with shipping: ${order.totalWithShipping.toFixed(2)}
        </p>
        <p className="text-gray-600">
          Shipping Address: {order.shippingAddress}
        </p>
      </div>
    </div>
  );
}

export default MyOrderCard;
