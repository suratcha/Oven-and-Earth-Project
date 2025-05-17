import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/cart/");
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await axios.patch(`http://localhost:8000/api/cart/${id}/`, { quantity });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${id}/`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleBuyNow = () => {
    const orderData = {
      items: cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    };

    alert("Order placed!");
    setCartItems([]);
    router.push({
      pathname: "/checkout",
      query: { cart: JSON.stringify(cartItems) },
    });
  };

  return (
    <div className="min-h-screen bg-cream py-8 font-Sarabun">
      <div className="max-w-fit mx-auto space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-5"
          >
            <img
              src={item.product?.image.replace("127.0.0.1", "localhost")}
              alt={item.product?.name}
              className="w-56 h-56 object-cover rounded-xl"
            />
            <div className="flex-1 text-dark_cocoa">
              <h2 className="text-xl font-bold leading-loose">
                {item.product?.name}
              </h2>
              <div className="flex items-center gap-2 text-lg leading-loose">
                <span>จำนวนที่ต้องการสั่ง:</span>
                <button
                  className="px-2 py-0.5 bg-gray-200 rounded"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-0.5 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              {cartItems.length > 0 && (
                <div className="text-lg leading-loose">
                  ราคา: {item.product.price * item.quantity} THB
                </div>
              )}
            </div>
            <div className="flex items-end">
              <button
                onClick={() => removeItem(item.id)}
                className="bg-strawberry text-white px-4 py-1 rounded hover:bg-[#B54848] transition items-end"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="text-center pt-4">
            <button
              onClick={handleBuyNow}
              className="bg-matcha text-white px-6 py-2 rounded hover:bg-[#5F7754] transition"
            >
              Buy now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
