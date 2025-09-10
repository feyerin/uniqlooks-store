import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = (item: typeof cartItems[0], delta: number) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id, item.selectedSize);
    } else {
      addToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          brandId: item.brandId,
          selectedSize: item.selectedSize,
        },
        delta
      );
    }
  };

  if (cartItems.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-red-600 hover:underline">
          Go to Products
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-4 md:gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id + item.selectedSize}
            className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full md:w-32 h-32 object-cover rounded"
            />

            <div className="flex-1 flex flex-col gap-1 md:gap-2">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
              <p className="text-red-600 font-medium">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded hover:bg-red-100 transition text-red-600 font-bold"
                onClick={() => handleQuantityChange(item, -1)}
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                className="px-3 py-1 border rounded hover:bg-red-600 hover:text-white transition text-red-600 font-bold"
                onClick={() => handleQuantityChange(item, 1)}
              >
                +
              </button>
            </div>

            <button
              className="ml-auto md:ml-4 text-gray-500 hover:text-red-600"
              onClick={() => removeFromCart(item.id, item.selectedSize)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Sticky Checkout Bar */}
      <div className="w-full bg-white border-t p-4 md:max-w-6xl md:mx-auto flex justify-between items-center shadow-lg mt-6 md:mt-10">
        <p className="text-xl font-semibold">Total: ${totalPrice}</p>
        <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}