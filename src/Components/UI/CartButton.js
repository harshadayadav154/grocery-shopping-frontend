
function CartButton({ product, onClickHandler }) {
  return (
    <button
      onClick={() => onClickHandler(product)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded w-full"
    >
      Add to Cart
    </button>
  );
}

export default CartButton;
