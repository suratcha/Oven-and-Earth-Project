import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MenuPage() {
  const [items, setitems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/items/')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.recommend && !b.recommend) return -1;
          if (!a.recommend && b.recommend) return 1;
          return 0;
        });
        setitems(sorted);
      });
  }, []);

  return (
    <div className='font-Sarabun min-h-screen bg-cream flex flex-col justify-between'>
      <main className='p-8 flex-1'>
        <h1 className='bg-white text-biscuit shadow-md text-2xl font-semibold text-center mt-3 mb-11 rounded-xl max-w-20 h-auto mx-auto justify-items-center'>
          Menu
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20 justify-items-center text-center'>
          {items.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>
              <div
                key={item.id}
                className='bg-milk text-dark_cocoa rounded-2xl shadow p-6 h-[310px] w-64 flex flex-col items-center hover:scale-105 transition-transform duration-300'
              >
                {item.image && (
                  <img
                    src={item.image.replace('127.0.0.1', 'localhost')}
                    alt={item.name}
                    className='w-48 h-48 object-cover rounded-xl shadow mb-4'
                  />
                )}
                <h2 className='text-lg font-bold text-center'>
                  {item.name}
                  {item.recommend && <span className='text-xl ml-2'>⭐️</span>}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
