import React, { useState } from "react";

export const FilterSection = () => {
  const [isBooking, setIsBooking] = useState(false);

  const propertyData = {
    price: 2500,
    currency: "₽",
    bedrooms: 4,
    address: "Проспект Ленина, 24/8",
    area: "60 м²",
    description:
      "Квартира чистая, полноcтью обopудовaнa для прoживaния.\nУбоpкa, белье и полотенца включены в стоимость.",
    amenities: [
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/wi-fi-2@2x.png",
        alt: "Wi-Fi",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/cat-footprint-2@2x.png",
        alt: "Pet friendly",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/hair-dryer-2@2x.png",
        alt: "Hair dryer",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/air-conditioner-2@2x.png",
        alt: "Air conditioner",
      },
    ],
  };

  const handleBookingClick = () => {
    setIsBooking(true);
    setTimeout(() => setIsBooking(false), 2000);
  };

  return (
    <article className="flex w-[979px] items-start bg-white rounded-3xl overflow-hidden border border-solid border-[#00000033] my-8">
      <img
        className="relative w-[424px] h-[337px] object-cover"
        alt="Property interior view"
        src="https://c.animaapp.com/6XngsHkc/img/image@2x.png"
      />
      <div className="flex flex-col h-[337px] items-end gap-4 px-8 py-6 flex-1">
        <header className="flex flex-col items-start gap-2.5 w-full">
          <div className="flex items-center justify-center gap-2.5 w-full">
            <p className="flex-1 h-[31px] [font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-black text-[32px] whitespace-nowrap tracking-[0] leading-[normal]">
              <span className="[font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-black text-[32px] tracking-[0]">
                {propertyData.price} {" "}
              </span>
              <span className="text-2xl">{propertyData.currency}</span>
            </p>
            <div className="flex items-end justify-end gap-2.5 flex-1">
              <img
                className="w-[19px] h-[19px]"
                alt="Bedrooms"
                src="https://c.animaapp.com/6XngsHkc/img/bed-2@2x.png"
              />
              <div className="text-[#4a4a4a] w-fit [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-base tracking-[0] leading-[normal] whitespace-nowrap">
                {propertyData.bedrooms}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-12 w-full">
            <address className="w-[171px] h-[21px] [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-[#4a4a4a] text-base tracking-[0] leading-[normal] not-italic">
              {propertyData.address}
            </address>
            <div className="flex-1 h-[21px] text-[#4a4a4a] [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-base tracking-[0] leading-[normal]">
              {propertyData.area}
            </div>
          </div>
        </header>
        <div className="flex items-start gap-4 w-full" role="list" aria-label="Property amenities">
          {propertyData.amenities.map((amenity, index) => (
            <div key={index} role="listitem">
              <img
                className="w-5 h-5"
                alt={amenity.alt}
                src={amenity.icon}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2.5 flex-1 w-full">
          <p className="flex-1 [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
            {propertyData.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < propertyData.description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2.5 bg-[#106cec] rounded-3xl hover:bg-[#0d5bc7] focus:bg-[#0d5bc7] focus:outline-none focus:ring-2 focus:ring-[#106cec] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBookingClick}
          disabled={isBooking}
          aria-label="Book this property"
        >
          <div className="w-[219px] h-[31px] [font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-white text-xl text-center tracking-[0] leading-[normal]">
            {isBooking ? "Бронируется..." : "Забронировать"}
          </div>
        </button>
      </div>
    </article>
  );
}; 