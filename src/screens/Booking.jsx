// src/pages/Booking.tsx
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import TravelLineBookingForm from "../components/TLBookingForm";

export const Booking = () => {
    return (
        <div className="bg-white min-h-screen w-full flex flex-col items-center pt-20">
            <Header />

            <div className="w-full max-w-[1440px] px-4 md:px-8 mt-8 flex flex-col">
                {/* Заголовок */}
                <h1 className="text-4xl md:text-5xl font-semibold text-[#2d2d2d] mb-8 text-left md:text-left">
                    Бронирование
                </h1>

                {/* Форма бронирования */}
                <TravelLineBookingForm id="booking" />
            </div>

            <Footer />
        </div>
    );
};