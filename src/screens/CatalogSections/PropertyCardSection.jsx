import React from "react";
import { Link } from "react-router-dom";

export const PropertyCardSection = () => {
  const navigationItems = [
    {
      text: "Каталог квартир",
      link: "/u1082u1072u1090u1072u1083u1086u1075",
      width: "w-[153.48px]",
    },
    { text: "Отзывы", link: null, width: "w-[71.18px]" },
    { text: "О нас", link: null, width: "w-[81.19px]" },
  ];

  return (
    <nav
      className="flex w-full max-w-[1272px] mx-auto items-center justify-center gap-4 px-[9px] py-2 bg-[#ffffffcc] rounded-[100px] border border-solid border-[#00000033]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative w-8 h-[31px] bg-[#6f6f6f33] rounded-[16px/15.5px]" />

      <div className="flex items-center justify-center gap-20 flex-1">
        {navigationItems.map((item, index) =>
          item.link ? (
            <Link
              key={index}
              className={`relative ${item.width} mt-[-1.00px] [font-family:'Gotham_Pro-Regular',Helvetica] font-normal text-[#2d2d2d] text-base text-center tracking-[0] leading-[normal] block hover:text-[#1a1a1a] transition-colors duration-200`}
              to={item.link}
              aria-label={item.text}
            >
              {item.text}
            </Link>
          ) : (
            <button
              key={index}
              className={`relative ${item.width} mt-[-1.00px] [font-family:'Gotham_Pro-Regular',Helvetica] font-normal text-[#2d2d2d] text-base text-center tracking-[0] leading-[normal] hover:text-[#1a1a1a] transition-colors duration-200 cursor-pointer`}
              type="button"
              aria-label={item.text}
            >
              {item.text}
            </button>
          ),
        )}
      </div>

      <div className="inline-flex flex-col items-end gap-2.5">
        <button
          className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-2xl border border-solid border-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-all duration-200 cursor-pointer"
          type="button"
          aria-label="Войти в аккаунт"
        >
          <span className="relative w-fit [-webkit-text-stroke:1px_#000000] [font-family:'Gotham_Pro-Medium',Helvetica] font-medium text-[#2d2d2d] text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Войти
          </span>
        </button>
      </div>
    </nav>
  );
}; 