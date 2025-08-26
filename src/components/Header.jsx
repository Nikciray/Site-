import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleReviewsClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const reviewsSection = document.getElementById("reviews-section");
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  const handleContactsClick = (e) => {
    e.preventDefault();
    const footer = document.querySelector('footer, #footer, .footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed left-1/2 top-8 z-50 transform -translate-x-1/2 w-[1270px] h-[47px] flex items-center justify-center bg-white/80 backdrop-blur rounded-full transition-all" style={{boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)'}}>
      <nav className="w-full flex items-center justify-between px-8 pr-[18px] h-full">
        <div className="w-8 h-8 bg-[#e0e0e0] rounded-full mr-4 flex-shrink-0" />
        <div className="flex items-center justify-center gap-16 flex-1 min-w-0">
          <Link to="/catalog" className="font-normal text-[#2d2d2d] text-base text-center hover:text-[#106cec] transition-colors">Каталог квартир</Link>
          <a href="#reviews-section" onClick={handleReviewsClick} className="font-normal text-[#2d2d2d] text-base text-center hover:text-[#106cec] transition-colors">Отзывы</a>
          <Link to="/" className="font-normal text-[#2d2d2d] text-base text-center hover:text-[#106cec] transition-colors">О нас</Link>
          <a href="#footer" onClick={handleContactsClick} className="font-normal text-[#2d2d2d] text-base text-center hover:text-[#106cec] transition-colors">Контакты</a>
        </div>
        <button className="inline-flex items-center justify-center border border-[#222] rounded-[16px] h-[31px] w-[83px] px-0 font-medium text-[#222] text-[16px] leading-none transition-colors duration-200 bg-transparent focus:outline-none hover:bg-[#106cec] hover:text-white hover:border-transparent">
          Войти
        </button>
      </nav>
    </header>
  );
}; 