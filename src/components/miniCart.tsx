import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useEffect } from "react";

interface MiniCartProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function MiniCart({ isMobile = false, onClose }: MiniCartProps) {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Untuk animasi scroll lock di mobile
  useEffect(() => {
    if (isMobile && totalItems > 0) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, totalItems]);

  if (totalItems === 0) {
    return (
      <div className={`${isMobile ? "fixed inset-0 flex justify-end z-50" : ""}`}>
        <div className={`bg-white p-4 border shadow-lg rounded ${isMobile ? "w-80 mt-20" : "absolute right-0 top-full mt-2 w-64"}`}>
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isMobile ? "fixed inset-0 flex justify-end bg-black/30 z-50" : ""}`}>
      <div
        className={`
          ${isMobile ? "bg-white w-80 h-full p-4 shadow-lg flex flex-col" : "absolute right-0 top-full mt-2 w-64 bg-white border shadow-lg rounded p-4"}
          transition-transform duration-200
        `}
      >
        {/* Header mobile */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Your Cart</h2>
            <button
              className="text-gray-500 hover:text-red-600 font-bold text-xl"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}

        <ul className={`flex flex-col gap-3 ${isMobile ? "flex-1 overflow-y-auto" : ""}`}>
          {cartItems.map((item) => (
            <li key={item.id + item.selectedSize} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>

        <div className="border-t mt-2 pt-2 flex justify-between font-medium">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        <Link
          to="/cart"
          className="block mt-3 w-full text-center bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          onClick={onClose}
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
}