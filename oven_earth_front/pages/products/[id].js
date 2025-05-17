import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/items/${id}/`)
        .then((res) => setItems(res.data))
        .catch((err) => {
          console.error("โหลดสินค้าไม่สำเร็จ", err);
        });
    }
  }, [id]);

  const handleAddToCart = async () => {
    const res = await axios.post("http://localhost:8000/api/cart/", {
      product: items.id,
      quantity: quantity,
    });

    if (res.status === 201 || res.status === 200) {
      router.push("/cart");
    } else {
      alert("ไม่สามารถเพิ่มสินค้าลงตะกร้าได้");
    }
  };

  const handleBuyNow = () => {
    const buyNowItem = {
      id: items.id,
      name: items.name,
      price: items.price,
      image: items.image,
      quantity: quantity,
    };
    router.push({
      pathname: "/checkout",
      query: {
        buyNow: encodeURIComponent(JSON.stringify(buyNowItem)),
      },
    });
  };

  if (!items) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-cream flex flex-col font-Concert px-4 sm:px-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto mt-20 px-6 gap-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={items.image}
            alt={items.name}
            className="w-80 h-80 object-cover rounded-3xl shadow"
          />
        </div>
        <div className="bg-white w-full md:w-11/12 rounded-3xl shadow-xl p-8 justify-center">
          <div className="text-left text-dark_cocoa mr-1">
            <h1 className="font-bold text-3xl mb-2">{items.name}</h1>
            <p className="text-xl leading-relaxed">
              Description: {items.description || "ไม่มีรายละเอียด"}
            </p>
            <p className="text-xl leading-relaxed text-berry">Food allergy: </p>
            <ul className="list-disc pl-5 text-lg text-berry">
              {items.food_allergy.split(",").map((ing, i) => (
                <li key={i}>{ing.trim()}</li>
              ))}
            </ul>
            <p className="text-xl mt-2 mb-2">Price: {items.price} บาท</p>
            <label htmlFor="qty" className="text-lg font-semibold">
              จำนวนที่ต้องการสั่ง :{" "}
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-2 py-1 border rounded-md"
            />
          </div>
          <div className="flex gap-3 pt-3">
            <button
              onClick={handleAddToCart}
              className="bg-honey text-white px-4 py-2 rounded-full hover:bg-[#C6781E] transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-matcha text-white px-4 py-2 rounded-full hover:bg-[#5F7754] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex md:w-3/4 justify-center mt-10 mb-20">
        <div className="bg-milk text-milk_tea rounded-2xl shadow-md shadow-grey px-5 py-6 w-full max-w-xl">
          <p className="font-semibold text-xl">Ingredients :</p>
          <ul className="list-disc pl-5 mt-2 text-lg">
            {items.ingredients.split(",").map((ing, i) => (
              <li key={i}>{ing.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
