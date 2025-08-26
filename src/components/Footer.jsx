import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const handleReviewsClick = (e) => {
    e.preventDefault();
    navigate('/', { replace: false });
    setTimeout(() => {
      const reviewsSection = document.getElementById('reviews-section');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <footer className="w-full flex justify-center py-12 px-6">
      <div className="w-full max-w-full bg-white flex flex-col justify-center items-center" style={{ minHeight: '350px', border: '2px solid #E5E7EB', borderRadius: '24px' }}>
        <nav className="w-full max-w-5xl" role="navigation" aria-label="Footer navigation">
          <div className="grid grid-cols-4 w-full">
            {/* Контакты */}
            <div className="flex flex-col items-center">
              <div className="font-normal text-[#4a4a4a] text-base text-center">Контакты</div>
              <ul className="flex flex-col items-start gap-2 mt-2">
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Telegram</a></li>
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Whatsapp</a></li>
                <li><a href="#" className="font-normal text-black text-base hover:text-[#4a4a4a]">Почта</a></li>
              </ul>
            </div>
            {/* Каталог */}
            <div className="flex flex-col items-center justify-start">
              <Link to="/catalog" className="text-[#4a4a4a] text-lg text-center font-normal hover:text-[#106cec] transition-all">
                Каталог
              </Link>
            </div>
            {/* Отзывы */}
            <div className="flex flex-col items-center justify-start">
              <a href="/" onClick={handleReviewsClick} className="text-[#4a4a4a] text-lg text-center font-normal hover:text-[#106cec] transition-all">
                Отзывы
              </a>
            </div>
            {/* О нас */}
            <div className="flex flex-col items-center justify-start">
              <div className="font-normal text-[#4a4a4a] text-base text-center">О нас</div>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}; 