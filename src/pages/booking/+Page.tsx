import { TravelLineBookingForm } from "@/components/TLBookingForm";

export default function Page() {
  return (
    <div className="w-full max-w-[1440px] px-5 md:px-8 mt-8 flex flex-col pt-20">
      <h1 className="text-4xl md:text-5xl font-semibold text-[#2d2d2d] mb-8 text-left md:text-left">
        Бронирование
      </h1>
      <TravelLineBookingForm />
    </div>
  )
}