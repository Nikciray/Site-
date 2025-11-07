import { Carousel, Contacts, Hero, Reviews } from "@/components/home";
import { TravelLineSearchForm } from "@/components/TLSearchForm";

const Catalog = () => {
  return (
    <section className="w-full max-w-7xl mx-auto z-30 mt-12 pb-8">
      <Carousel />
      <div className="flex justify-center mt-8">
        <a
          href="/booking"
          className="flex items-center justify-center gap-3 px-8 py-2
             bg-brand rounded-full text-white text-xl hover:bg-brand-600"
        >
          <p className="text-[32px] font-semibold">
            Каталог
          </p>
          <img
            className="w-5 h-5"
            alt="Arrow"
            src="https://c.animaapp.com/x7ciH6IU/img/arrow-1.svg"
          />
        </a>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col px-5 w-full items-center justify-center">
      <Hero />
      <TravelLineSearchForm id="mobile" />
      <Catalog />
      <Contacts />
      <Reviews />
    </div>
  )
}