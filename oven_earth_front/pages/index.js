import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8000/api/items/");
  return { props: { item: res.data } };
}

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/items/")
      .then((res) => {
        const recommendItems = res.data.filter((item) => item.recommend === true);
        setItems(recommendItems);
      })
      .catch((err) => {
        console.error("Error loading items:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between font-Sarabun">
      <main className="min-h-screen p-8">
        <div className="display:block bg-white text-choco text-3xl text-center rounded-xl shadow-md shadow-grey py-10 mb-8 max-w-3xl h-auto mx-auto justify-items-center">
          <h1 className="font-bold text-dark_cocoa">Healthy Organic Bakery</h1>
          <p className="text-base text-center text-milk_tea leading-loose mt-4 mx-20">
            Oven & Earth คือร้านขนมออนไลน์เพื่อสุขภาพ
            ที่ตั้งใจคัดสรรวัตถุดิบออร์แกนิก ปราศจากสารเคมีและน้ำตาลขัดสี
            เพื่อให้ทุกคำที่คุณทานเต็มไปด้วยความอร่อยที่ดีต่อร่างกายและเป็นมิตรกับโลก
            เราเชื่อว่าขนมไม่ควรเป็นแค่ของหวาน
            แต่ควรเป็นพลังบวกให้กับคุณและสิ่งแวดล้อม
          </p>
          <Link
            href="/menu"
            className="inline-block bg-rose_pink text-white text-base rounded-2xl px-3 py-1 mt-5 hover:bg-[#A9444A] transition-transform duration-900"
          >
            View Menu
          </Link>
        </div>
        <div className="bg-white text-biscuit shadow-md text-2xl font-semibold text-center mb-8 rounded-xl max-w-40 h-auto mx-auto justify-items-center">
          Recommend
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-items-center text-center mb-8">
          {items.map((item) => (
            <Link key={item} href={`/products/${item.id}`}>
              <div
                key={item.id}
                className="bg-milk text-dark_cocoa rounded-2xl shadow-md shadow-grey p-6 h-[310px] w-64 flex flex-col items-center hover:scale-105"
              >
                {item.image && (
                  <img
                    src={item.image.replace("127.0.0.1", "localhost")}
                    alt={item.name}
                    className="w-48 h-48 object-cover rounded-xl shadow mb-4"
                  />
                )}
                <h2 className="text-lg font-bold">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="bg-white text-biscuit shadow-md text-2xl text-center font-semibold mb-8 rounded-xl w-fit h-auto mx-auto px-4 justify-items-center">
          About US
        </div>
        <div className="flex justify-center items-center mb-8">
          <img
            src="/image/Bakery.jpg"
            alt="Bakery"
            className="w-auto h-80 rounded-2xl shadow-lg"
          />
        </div>
        <div className="display:block bg-white text-dark_cocoa text-3xl text-center rounded-xl shadow-md shadow-grey py-10 mb-3 max-w-3xl h-auto mx-auto justify-items-center">
          Oven & Earth
          <p className="text-milk_tea text-base text-center leading-loose mt-4 mx-20">
            เราเชื่อว่าขนมอร่อยก็ดีต่อสุขภาพและเป็นมิตรต่อโลกได้
            เราจึงพิถีพิถันคัดสรรวัตถุดิบออร์แกนิกจากเกษตรกรท้องถิ่นสร้างสรรค์ขนมไร้น้ำตาลขัดสี
            สารกันบูดและสารสังเคราะห์
            เพื่อให้คุณได้ลิ้มรสความอร่อยที่มาพร้อมสุขภาพที่ดี Oven & Earth
            ไม่ใช่แค่ร้านขนม แต่คือทางเลือกของผู้ที่ใส่ใจสุขภาพและสิ่งแวดล้อม
            เรายึดมั่นใน Sustainable Development Goals (SDGs) โดยเฉพาะด้านสุขภาพ
            การผลิตที่รับผิดชอบ และการดูแลโลกใบนี้อย่างแท้จริง
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-milk_tea gap-4 max-w-6xl mx-auto justify-items-center text-center mb-5">
          <div className="p-4 flex flex-col items-center">
            <img src="/image/SDG3.svg" alt="SDG3" className="h-48 w-48 p-5" />
            <p className="text-center text-choco font-semibold px-9">
              ขนมอร่อย ดีต่อสุขภาพ ลดเสี่ยงโรคเรื้อรัง
            </p>
          </div>
          <div className="p-4 flex flex-col items-center">
            <img src="/image/SDG8.jpg" alt="SDG8" className="h-48 w-48 p-5" />
            <p className="text-center text-choco font-semibold px-9">
              สนับสนุนเศรษฐกิจท้องถิ่นและผู้ผลิตขนาดเล็ก
            </p>
          </div>
          <div className="p-4 flex flex-col items-center">
            <img src="/image/SDG12.svg" alt="SDG12" className="h-48 w-48 p-5" />
            <p className="text-center text-choco font-semibold px-9">
              วัตถุดิบยั่งยืน บรรจุภัณฑ์รักษ์โลก ลดของเสีย
            </p>
          </div>
          <div className="p-4 flex flex-col items-center">
            <img src="/image/SDG13.png" alt="SDG13" className="h-48 w-48 p-5" />
            <p className="text-center text-choco font-semibold px-9">
              รณรงค์ลดการใช้พลาสติกและเลือกขนส่งแบบคาร์บอนต่ำ
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
