import React, { useState } from "react";
import { amenityIcons } from "../../services/api";
import { useCatalog } from "../../context/CatalogContext";
import { Link } from "react-router-dom";

export const PropertyListSection = () => {
  const { properties, loading, error } = useCatalog();
  const [isBooking, setIsBooking] = useState(false);

  const handleBookingClick = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      alert("Booking request submitted!");
    }, 1000);
  };

  if (loading) {
    return (
      <section className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600">Загрузка...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-red-600">Ошибка загрузки: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="grid grid-cols-1 gap-8 w-full"
      role="region"
      aria-label="Property listing"
    >
      {properties.map((property) => (
        <Link
          key={property.id}
          to={`/apartment/${property.id}`}
          className="block"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <article
            className="flex flex-col md:flex-row items-start bg-white rounded-3xl overflow-hidden border border-solid border-[#00000033] w-full hover:shadow-xl transition-shadow cursor-pointer"
          >
          <div className="w-full md:w-[424px] h-[220px] md:h-[337px] flex-shrink-0">
            <img
              className="object-cover w-full h-full"
              alt={`Property image for ${property.name}`}
              src={property.image}
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-between h-[220px] md:h-[337px] px-[32px] pt-4 md:pt-6 pb-0 items-stretch max-w-[500px] md:max-w-[600px] w-full">
            <div className="flex flex-col gap-4">
              <header className="flex flex-col items-start gap-2.5 w-full">
                <div className="flex items-center gap-2.5 w-full">
                  <div className="flex-1 h-[31px] font-medium text-black text-[32px] leading-none">
                    <span>{property.price} </span>
                    <span className="text-2xl">₽</span>
                  </div>
                  <div className="flex items-end gap-2.5 flex-1 justify-end">
                    <img className="w-[19px] h-[19px]" alt="Bedrooms" src="https://c.animaapp.com/6XngsHkc/img/bed-2@2x.png" />
                    <div className="text-[#4a4a4a] w-fit font-normal text-base whitespace-nowrap">{property.adult_bed}</div>
                  </div>
                </div>
                <div className="flex items-center gap-12 w-full">
                  <address className="w-[171px] h-[21px] font-normal text-[#4a4a4a] text-base not-italic">{property.name}</address>
                  <div className="flex-1 h-[21px] text-[#4a4a4a] font-normal text-base">{property.size} м²</div>
                </div>
              </header>
              <div className="flex items-center gap-4 w-full mt-4 mb-4" role="list" aria-label="Property amenities">
                {property.amenities
                  .filter((amenity) => [
                    'wifi_internet',
                    'hairdryer',
                    'air_conditioner',
                    'pet_friendly',
                  ].includes(amenity))
                  .map((amenity, index) => (
                    <div key={index} role="listitem">
                      <img className="w-7 h-7" alt={amenity} src={amenityIcons[amenity] || "https://c.animaapp.com/6XngsHkc/img/amenity-default@2x.png"} />
                    </div>
                  ))}
              </div>
              <p className="font-normal text-black text-base leading-snug w-full break-words mb-8">
                {property.description
                  ? property.description.length > 100
                    ? property.description.slice(0, 100) + '...'
                    : property.description
                  : "Описание недоступно"}
              </p>
            </div>
            <div className="flex w-full justify-end pr-0 mb-[32px]">
              <button
                className="h-[44px] bg-[#106cec] rounded-full hover:bg-[#0d5bc7] focus:bg-[#0d5bc7] focus:outline-none focus:ring-2 focus:ring-[#106cec] focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-[20px] font-bold text-white px-8 min-w-[180px]"
                onClick={handleBookingClick}
                disabled={isBooking}
                aria-label="Book this property"
              >
                {isBooking ? "Бронируется..." : "Забронировать"}
              </button>
            </div>
          </div>
        </article>
        </Link>
      ))}
    </section>
  );
}; 