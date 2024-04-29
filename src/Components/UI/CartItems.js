function CartItems({ item, handleAddToCart, handleRemove }) {
  return (
    <>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.images}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${item.price.toFixed(2)} per kg</p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={() => handleRemove(item)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-bold px-3 py-2 rounded-l w-full"
          >
            -
          </button>
          <span className="bg-gray-200 px-3 py-2 border border-gray-300 w-full text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-bold px-3 py-2 rounded-r w-full"
          >
            +
          </button>
        </div>
      </div>
      <hr className="p-4" />
    </>
  );
}

export default CartItems;
