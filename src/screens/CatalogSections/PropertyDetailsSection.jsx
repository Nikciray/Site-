import React, { useState } from "react";

export const PropertyDetailsSection = () => {
  const [isBooking, setIsBooking] = useState(false);

  const propertyData = {
    price: 2900,
    currency: "₽",
    bedrooms: 5,
    address: "Проспект Ленина, 24/8",
    area: "60 м²",
    description:
      "Квартира чистая, полноcтью обopудовaнa для прoживaния.\nУбоpкa, белье и полотенца включены в стоимость.",
    image: "https://c.animaapp.com/6XngsHkc/img/image-2@2x.png",
    amenities: [
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/wi-fi-2@2x.png",
        alt: "Wi-Fi",
        name: "Wi-Fi",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/cat-footprint-2@2x.png",
        alt: "Pet friendly",
        name: "Pet friendly",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/hair-dryer-2@2x.png",
        alt: "Hair dryer",
        name: "Hair dryer",
      },
      {
        icon: "https://c.animaapp.com/6XngsHkc/img/air-conditioner-2@2x.png",
        alt: "Air conditioner",
        name: "Air conditioner",
      },
    ],
  };

  const handleBookingClick = () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert("Booking request submitted!");
    }, 1000);
  };

  return (
    <article className="flex w-[979px] items-start absolute top-0 left-0">
      <div className="flex items-start relative flex-1 grow mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-3xl overflow-hidden border border-solid border-[#00000033]">
        <img
          className="object-cover relative w-[424px] h-[337px]"
          alt="Property interior view"
          src={propertyData.image}
          loading="lazy"
        />

        <div className="flex flex-col h-[337px] items-end gap-4 px-8 py-6 relative flex-1 grow">
          <header className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 h-[31px] mt-[-1.00px] [font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
                <span className="[font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-black text-[32px] tracking-[0]">
                  {propertyData.price}{" "}
                </span>
                <span className="text-2xl">{propertyData.currency}</span>
              </div>

              <div className="flex items-end justify-end gap-2.5 relative flex-1 self-stretch grow">
                <img
                  className="relative w-[19px] h-[19px]"
                  alt="Bedrooms"
                  src="https://c.animaapp.com/6XngsHkc/img/bed-2@2x.png"
                />
                <span className="relative w-fit [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-[#4a4a4a] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  {propertyData.bedrooms}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-12 relative self-stretch w-full flex-[0_0_auto]">
              <address className="relative w-[171px] h-[21px] mt-[-1.00px] [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-[#4a4a4a] text-base tracking-[0] leading-[normal] not-italic">
                {propertyData.address}
              </address>
              <div className="flex-1 h-[21px] text-[#4a4a4a] relative mt-[-1.00px] [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-base tracking-[0] leading-[normal]">
                {propertyData.area}
              </div>
            </div>
          </header>

          <div
            className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]"
            role="list"
            aria-label="Property amenities"
          >
            {propertyData.amenities.map((amenity, index) => (
              <div key={index} role="listitem" title={amenity.name}>
                <img
                  className="relative w-5 h-5"
                  alt={amenity.alt}
                  src={amenity.icon}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2.5 relative flex-1 self-stretch w-full grow">
            <p className="relative flex-1 self-stretch mt-[-1.00px] [font-family:'SF_UI_Display-Regular',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal]">
              {propertyData.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < propertyData.description.split("\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] bg-[#106cec] rounded-3xl hover:bg-[#0d5bc7] focus:bg-[#0d5bc7] focus:outline-none focus:ring-2 focus:ring-[#106cec] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBookingClick}
            disabled={isBooking}
            aria-label="Book this property"
          >
            <span className="relative w-[219px] h-[31px] mt-[-1.00px] [font-family:'SF_UI_Display-Medium',Helvetica] font-medium text-white text-xl text-center tracking-[0] leading-[normal]">
              {isBooking ? "Бронирование..." : "Забронировать"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}; 