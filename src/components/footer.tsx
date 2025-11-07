export const Footer = () => {
  return (
    <footer id="footer" className="w-full flex justify-center py-12 px-6">
      <div
        className="w-full max-w-full bg-white flex flex-col justify-center rounded-3xl min-h-[350px] border-2 border-solid border-[#E5E7EB] items-center"
      >
        <nav className="w-full max-w-5xl" role="navigation" aria-label="Footer navigation">
          <div className="grid grid-cols-4 w-full">
            <div className="flex flex-col items-center">
              <div className="font-normal text-[#4a4a4a] text-base text-center">Контакты</div>
              <ul className="flex flex-col items-start gap-2 mt-2">
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Telegram</a></li>
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Whatsapp</a></li>
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Почта</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-start">
              <a
                href="/booking"
                className="text-[#4a4a4a] text-lg text-center font-normal hover:text-[#106cec] transition-all"
              >
                Каталог
              </a>
            </div>
            <div className="flex flex-col items-center justify-start">
              <a
                href="/#reviews-section"
                className="text-[#4a4a4a] text-lg text-center font-normal hover:text-[#106cec] transition-all"
              >
                Отзывы
              </a>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="font-normal text-[#4a4a4a] text-base text-center">О нас</div>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}; 