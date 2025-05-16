export default function Header() {
    return (
        <header className='bg-brown font-Sarabun px-6 py-2 flex justify-between items-center shadow'>
        <div className='text-xl text-[#FFF9F4] font-bold flex items-center gap-2'>
          <img src='/logo.ico' alt='Logo' className='w-10 h-10' />
          Oven & Earth
        </div>
        <nav className='space-x-6 flex items-center'>
          <a href='/' className='font-bold text-[#FFF9F4] text-xl hover:text-caramel hover:scale-105 hover:underline transition duration-200'>Home</a>
          <a href='/menu' className='font-bold text-[#FFF9F4] text-xl hover:text-caramel hover:scale-105 hover:underline transition duration-200'>Menu</a>
          <a href='/cart'className='flex items-center hover:opacity-75 hover:scale-105 transition duration-200'>
            <img src='Cart.png' alt='Cart'className='w-12 h-12 object-contain' />
          </a>
        </nav>
      </header>
    )
}