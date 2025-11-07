import { reatomComponent } from "@reatom/npm-react";
import { useEffect, useRef, useState } from "react";
import { roomTypesAction } from "../lib/apartments.model";
import { motion } from "framer-motion";

const ApartmentsList = reatomComponent(({ ctx }) => {
  const apartments = ctx.spy(roomTypesAction.dataAtom)

  return (
    apartments.map((apartment) => (
      <a
        key={apartment.id}
        href={`/apartment/${apartment.id}`}
        className="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden
          transform-gpu transition-transform duration-300 ease-in-out max-w-[300px]
           min-w-[300px] h-[308px] flex-shrink-0 relative z-0 hover:z-10 hover:scale-[1.04]"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <img
          className="object-cover w-full min-h-[200px] h-[200px] max-h-[200px]"
          alt={apartment.name}
          src={apartment.image}
        />
        <div className="flex flex-col justify-between px-6 h-[130px] pt-4 pb-6">
          <div className="flex items-center justify-between w-full mb-2">
            <p className="font-medium text-black text-[24px] leading-none">
              {apartment.price} <span className="text-xl">₽</span>
            </p>
            <div className="flex items-center gap-1">
              <img
                className="w-4 h-4"
                alt="Bed icon"
                src="https://c.animaapp.com/x7ciH6IU/img/bed-2@2x.png"
              />
              <span className="font-normal text-[#4a4a4a] text-sm">
                {apartment.adult_bed}
              </span>
            </div>
          </div>
          {(() => {
            const [address, category] = (apartment.name || '').split('|');
            return (
              <div className="w-full not-italic text-left">
                <div className="font-normal text-[#4a4a4a] text-sm">{address}</div>
                {category && <div className="font-normal text-[#4a4a4a] text-sm">{category}</div>}
              </div>
            );
          })()}
        </div>
      </a>
    ))
  )
})

export const ApartmentsCarousel = reatomComponent(({ ctx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const update = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const contentWidth = contentRef.current!.scrollWidth;
      const diff = contentWidth - containerWidth;
      setMaxOffset(diff > 0 ? diff : 0);
      setScrollable(diff > 0);
      if (diff <= 0) setOffset(0);
    };

    const observer = new ResizeObserver(update);

    observer.observe(containerRef.current);
    observer.observe(contentRef.current);

    const mo = new MutationObserver(() => {
      if (contentRef.current?.children.length) {
        update();
      }
    });

    mo.observe(contentRef.current, { childList: true, subtree: false });

    update();

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  const handleLeft = () => {
    if (!scrollable) return;
    setOffset(o => Math.min(o + 324, 0));
  };

  const handleRight = () => {
    if (!scrollable) return;
    setOffset(o => Math.max(o - 324, -maxOffset));
  };

  return (
    <div className="flex items-center min-h-[308px] relative w-full">
      {scrollable && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-[15] w-14 h-14 
          flex items-center justify-center rounded-full backdrop-blur-md bg-white/80 shadow-md hover:bg-white"
          style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)" }}
          onClick={handleLeft}
          aria-label="Прокрутить влево"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <div
        ref={containerRef}
        className="w-full h-[308px] relative pointer-events-auto"
      >
        <motion.div
          ref={contentRef}
          className="inline-flex gap-6 h-full items-stretch will-change-transform"
          animate={{ x: offset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <ApartmentsList />
        </motion.div>
      </div>
      {scrollable && (
        <button
          className="absolute right-0 top-1/2 flex items-center justify-center rounded-full
           -translate-y-1/2 z-[15] w-14 h-14
            backdrop-blur-md bg-white/80 shadow-md hover:bg-white"
          style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)" }}
          onClick={handleRight}
          aria-label="Прокрутить вправо"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}, "ApartmentsCarousel")