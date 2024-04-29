function Product({ product, renderQuantityControls, handleAddToCart }) {
  return (
    <div
      key={product._id}
      className="group relative border border-gray-300 rounded-md shadow-md"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 ">
        <img
          src={product.images}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 mb-4 flex justify-between px-2">
        <div>
          <h2 className="text-lg text-gray-700 font-bold">
            <a href={product.name}>{product.name}</a>
          </h2>
        </div>
        <p className="text-lg font-medium text-gray-900">
          ${product.price} {product.unit}
        </p>
      </div>
      {renderQuantityControls(product)}
    </div>
  );
}

export default Product;
