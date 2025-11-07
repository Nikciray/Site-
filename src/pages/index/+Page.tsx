import { Carousel, Contacts, Hero, Reviews } from "@/components/home";
import { TravelLineSearchForm } from "@/components/TLSearchForm";

export default function Page() {
  return (
    <div className="flex flex-col px-5 w-full items-center justify-center">
      <Hero />
      <TravelLineSearchForm id="mobile" />
      <section className="w-full max-w-7xl mx-auto z-30 mt-12 pb-8">
        <Carousel />
        <div className="flex justify-center mt-8">
          <a
            href="/booking"
            className="flex items-center justify-center gap-2.5 px-8 py-2
             bg-[#106cec] rounded-full text-white text-xl font-medium hover:bg-[#0d5bc7] transition-colors"
          >
            Каталог
            <img
              className="w-4 h-4"
              alt="Arrow"
              src="https://c.animaapp.com/x7ciH6IU/img/arrow-1.svg"
            />
          </a>
        </div>
      </section>
      <Contacts />
      <Reviews />
    </div>
  )
}