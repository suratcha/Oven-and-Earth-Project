import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const { buyNow } = router.query;
    if (buyNow) {
      try {
        const decoded = decodeURIComponent(buyNow);
        const parsedItem = JSON.parse(decoded);
        setCartItems([parsedItem]);
      } catch (error) {
        console.error("Failed to parse buyNow item", error);
      }
    if (router.query.cart) {
      setCartItems(JSON.parse(router.query.cart));
    }
    } else {
      fetch("http://localhost:8000/api/cart/")
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, [router.query]);

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("กรุณากรอกชื่อผู้สั่งซื้อ");
      return;
    }

    if (!phone.trim()) {
      alert("กรุณากรอกเบอร์โทรศัพท์");
      return;
    }
    if (!/^[0-9]{8,15}$/.test(phone)) {
      alert("กรุณากรอกเบอร์โทรให้ถูกต้อง (ตัวเลข 8-15 หลัก)");
      return;
    }

    if (!email.trim()) {
      alert("กรุณากรอกอีเมล");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("กรุณากรอกอีเมลให้ถูกต้อง เช่น test@example.com");
      return;
    }

    if (!address.trim()) {
      alert("กรุณากรอกที่อยู่สำหรับจัดส่ง");
      return;
    }

    if (!deliveryMethod.trim()) {
      alert("กรุณาเลือกวิธีการจัดส่ง");
      return;
    }

    if (!paymentMethod.trim()) {
      alert("กรุณาเลือกวิธีการชำระเงิน");
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("ไม่มีสินค้าที่จะสั่งซื้อ");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      alert("ไม่มีสินค้าในตะกร้า กรุณากลับไปเลือกสินค้าใหม่");
      return;
    }

    const orderData = {
      customer_name: customerName,
      phone: phone,
      email: email,
      address: address,
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
      total: total,
      items: cartItems.map((item) => ({
        product_id: item.product?.id || item.id,
        product_name: item.product?.name || item.name,
        price: item.product?.price || item.price,
        quantity: item.quantity,
      })),
    };

     console.log("✅ orderData ที่จะส่ง:", orderData);

    const res = await fetch("http://localhost:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("สั่งซื้อสำเร็จ 🎉");
      cartItems.forEach((item) => {
        fetch(`http://localhost:8000/api/cart/${item.id}/`, {
          method: "DELETE",
        })
          .then(() => console.log(`ลบ cart item id: ${item.id}`))
          .catch((err) => console.error("ลบ cart ผิดพลาด", err));
      });
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setDeliveryMethod("");
      setPaymentMethod("");
      router.push("/");
    } else {
      alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col font-Sarabun px-4 sm:px-6">
      <main className="p-8">
        <h1 className="bg-white text-milk_tea shadow-md text-2xl font-semibold text-center mt-3 mb-11 rounded-xl max-w-40 h-auto mx-auto justify-items-center">
          CHECK OUT
        </h1>
        <div className="bg-white text-dark_cocoa rounded-3xl shadow p-6 mb-10">
          {cartItems.map((item) => (
            <div key={item.id || item.product?.id} className="flex gap-6 border-b pb-4 mb-4">
              <img
                src={(item.product?.image || item.image)?.replace(
                  "127.0.0.1",
                  "localhost"
                )}
                alt={item.product?.name || item.name}
                className="w-48 h-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="font-semibold text-xl leading-loose">
                  {item.product?.name || item.name}
                </p>
                <p className="text-md text-milk_tea leading-loose">
                  ราคา: {item.product?.price || item.price} THB
                </p>
              </div>
              <p className="text-xl leading-loose">x {item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between font-semibold">
            <span>
              สินค้ารวม{" "}
              {cartItems.reduce((total, item) => total + item.quantity, 0)} ชิ้น
            </span>
            <span>{total} THB</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow p-6 space-y-4 text-dark_cocoa">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label>ชื่อจริง–นามสกุล</label>
              <input
                className="w-full border rounded px-3 py-1.5"
                value={customerName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label>เบอร์ติดต่อ</label>
              <input
                className="w-full border rounded px-3 py-1.5"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label>อีเมล</label>
              <input
                className="w-full border rounded px-3 py-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label>ที่อยู่</label>
              <textarea
                className="w-full border rounded px-3 py-1.5"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block mb-1">รูปแบบการจัดส่ง</label>
            <div className="space-y-1">
              <label className="block">
                <input
                  type="radio"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />{" "}
                จัดส่งด่วน (ภายใน 1 วัน)
              </label>
              <label className="block">
                <input
                  type="radio"
                  value="normal"
                  checked={deliveryMethod === "normal"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />{" "}
                จัดส่งธรรมดา (2–5 วัน)
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1">รูปแบบการชำระเงิน</label>
            <label className="block">
              <input
                type="radio"
                value="Cash on delivery"
                checked={paymentMethod === "Cash on delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              เก็บเงินปลายทาง
            </label>
          </div>

          <form onSubmit={handleCheckout}>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-matcha text-white px-6 py-2 rounded hover:bg-[#5F7754] transition"
              >
                Place order
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
