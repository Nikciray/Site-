import React, { useState, useEffect, useRef } from "react";
import { TravelLineSearchForm } from "./TLSearchForm.js";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import { reatomComponent, useUpdate } from "@reatom/npm-react";
import { atom } from "@reatom/core";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/ui/dialog.js";
import { apartmentAction, apartmentData, apartmentImages, similarData } from "../lib/apartment.model.js";

const apartmentImagesIdx = atom(0)

const ApartmentImages = reatomComponent(({ ctx }) => {
  const images = ctx.spy(apartmentImages);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fade, setFade] = useState(false);
  const apartment = ctx.spy(apartmentData);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      const el = thumbnailsRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    checkScroll();
    const el = thumbnailsRef.current;

    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [images]);

  if (!apartment) return null;

  return (
    <div className="flex flex-col gap-4 w-[700px]">
      {images[0] && (
        <img
          className={`w-full h-[458px] object-cover rounded-3xl transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
          alt={apartment.name}
          src={selectedImage || images[0]}
          onLoad={() => setFade(false)}
          onClick={() => {
            apartmentDialogIsOpen(ctx, true)
            apartmentImagesIdx(ctx, selectedImage ? images.indexOf(selectedImage) : 0);
          }}
          style={{ cursor: 'zoom-in' }}
        />
      )}
      <div className="relative w-full" style={{ maxWidth: '700px' }}>
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 
            flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)' }}
            // onClick={() => scrollThumbnails(-1)}
            aria-label="Прокрутить влево"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 
            flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)' }}
            // onClick={() => scrollThumbnails(1)}
            aria-label="Прокрутить вправо"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div
          ref={thumbnailsRef}
          className="overflow-x-auto whitespace-nowrap px-2 scroll-smooth w-full hide-scroll"
          style={{ maxWidth: '700px' }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`inline-block mr-4 last:mr-0 rounded-2xl ${selectedImage === src ? '' : ''}`}
              style={selectedImage === src ? {
                background: 'white',
                boxShadow: '0 0 16px 6px #106cec55',
                borderRadius: '16px',
                padding: 0
              } : { background: 'transparent' }}
            >
              <img
                className="w-[173px] h-[112px] object-cover rounded-xl cursor-pointer"
                alt={`Apartment thumbnail ${idx + 1}`}
                src={src}
                onClick={() => {
                  if (selectedImage !== src) {
                    setFade(true);
                    setTimeout(() => setSelectedImage(src), 200);
                  }
                }}
              />
            </div>
          ))}
        </div>
        {thumbnailsRef.current && thumbnailsRef.current.scrollWidth > thumbnailsRef.current.clientWidth && (
          <GalleryScrollBar thumbnailsRef={thumbnailsRef} />
        )}
      </div>
    </div>
  )
})

export const Apartment = reatomComponent(({ ctx }) => {
  const { id } = usePageContext().urlParsed.search;

  useUpdate((ctx) => apartmentAction(ctx, id), [id]);

  const apartment = ctx.spy(apartmentData);
  const similarApartments = ctx.spy(similarData)

  const similarRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
    showBar: false,
    barActive: false,
  });

  useEffect(() => {
    const el = similarRef.current;
    if (!el) return;

    const checkScroll = () => {
      const canLeft = el.scrollLeft > 0;
      const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 20;
      const showBar = el.scrollWidth > el.clientWidth;
      const barActive = showBar && el.scrollLeft > 0;

      setScrollState({ canLeft, canRight, showBar, barActive });
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [similarApartments]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = similarRef.current;
      if (!el) return;

      const dx = e.clientX - dragStartX.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const maxBarMove = el.clientWidth - Math.max(40, (el.clientWidth * (el.clientWidth / el.scrollWidth)) / 3);
      el.scrollLeft = dragStartScroll.current + (dx / maxBarMove) * maxScroll;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleScrollBarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = similarRef.current!.scrollLeft;
    document.body.style.userSelect = 'none';
  };

  const scrollSimilar = (dir: number) => {
    const el = similarRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: 'smooth' });
    if (el.scrollLeft + 380 > 0) setScrollState(s => ({ ...s, barActive: true }));
  };

  let scrollBarStyle: React.CSSProperties = { display: 'none' };

  if (scrollState.showBar && similarRef.current) {
    const el = similarRef.current;
    const ratio = el.clientWidth / el.scrollWidth;
    const width = Math.max(40, (el.clientWidth * ratio) / 3);
    const left = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * (el.clientWidth - width);

    scrollBarStyle = {
      position: 'absolute',
      top: 8,
      left,
      width,
      height: 8,
      background: 'rgba(0,0,0,0.13)',
      borderRadius: 8,
      transition: 'left 0.2s, opacity 0.4s',
      opacity: scrollState.barActive ? 1 : 0,
      cursor: 'pointer',
    };
  }

  if (ctx.spy(apartmentAction.statusesAtom).isPending) {
    return (
      <div className="w-full flex justify-center items-center h-96 text-xl text-gray-500">
        Загрузка...
      </div>
    )
  }

  if (ctx.spy(apartmentAction.statusesAtom).isRejected || !apartment) {
    return (
      <div className="w-full flex justify-center items-center h-96 text-xl text-red-500">
        {ctx.spy(apartmentAction.errorAtom)?.message ?? 'Нет данных'}
      </div>
    )
  }

  return (
    <>
      <TravelLineSearchForm id={'detail'} />
      <div className="w-full max-w-[1440px] px-4 md:px-8 mt-8 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-center gap-5">
          <ApartmentImages />
          <div className="flex flex-col gap-6 w-full max-w-[380px]">
            <div className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <h1 className="text-2xl font-semibold text-black">
                {apartment.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-base text-black">
                <span><span className="font-medium">
                  {apartment.adult_bed}</span> спальных места
                </span>
                <span>
                  <span className="font-medium">{apartment.size}</span> м²
                </span>
                {apartment.floor && (
                  <span>
                    <span className="font-medium">{apartment.floor}</span> этаж
                  </span>
                )}
              </div>
              <div className="text-[40px] font-medium text-black leading-none">
                {apartment.price} <span className="text-2xl">₽</span> <span className="text-lg font-normal">в сутки</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <div className="font-medium text-base text-black">
                ⏰ Проживание:
              </div>
              <div className="text-base text-black">
                Заселение - после 14:00 <br />Выезд - до 12:00
              </div>
            </div>
            <div className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <div className="flex w-full justify-between items-center">
                <div className="font-medium text-xl text-black">
                  За 2 суток
                </div>
                <div className="font-medium text-xl text-black text-right">
                  {apartment.price * 2} <span className="text-base font-normal">₽</span>
                </div>
              </div>
              <a
                href="/booking"
                className="w-full bg-[#106cec] text-center rounded-full py-2 hover:bg-[#0d5bc7] transition-colors text-white text-xl font-medium"
              >
                Забронировать
              </a>
            </div>
          </div>
        </div>
        <section className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white max-w-[1100px] w-full mx-auto">
          <p className="text-base text-black whitespace-pre-line">
            {apartment.description}
          </p>
        </section>
        <div className="mt-12 relative">
          <h2 className="text-4xl font-semibold text-[#2d2d2d] mb-6">
            Похожие квартиры
          </h2>
          <div className="relative">
            {scrollState.canLeft && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 
                  flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                onClick={() => scrollSimilar(-1)}
                aria-label="Прокрутить влево"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {scrollState.canRight && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 
                  flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                onClick={() => scrollSimilar(1)}
                aria-label="Прокрутить вправо"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <div
              ref={similarRef}
              className="hide-scroll flex gap-8 pb-4 flex-nowrap overflow-x-auto overflow-y-visible"
            >
              {similarApartments.map((ap) => (
                <div
                  key={ap.id}
                  className="flex-shrink-0 bg-white rounded-3xl shadow-lg hover:shadow-lg transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                  style={{ width: 360, height: 370, minWidth: 320, minHeight: 370 }}
                  onClick={() => navigate(`/apartment/${ap.id}`)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/apartment/${ap.id}`); }}
                >
                  <img className="object-cover w-full h-[240px]" alt={ap.name} src={ap.image} />
                  <div className="flex flex-col justify-between px-6 pt-4 pb-6 w-full h-[130px]">
                    <div className="flex items-center justify-between w-full mb-4">
                      <p className="font-medium text-black text-[32px] leading-none">
                        {ap.price} <span className="text-2xl">₽</span>
                      </p>
                      <div className="flex items-center gap-1">
                        <img className="w-5 h-5" alt="Bed icon" src="https://c.animaapp.com/x7ciH6IU/img/bed-2@2x.png" />
                        <span className="font-normal text-[#4a4a4a] text-base">{ap.adult_bed}</span>
                      </div>
                    </div>
                    {(() => {
                      const [address, category] = (ap.name || '').split('|');
                      return (
                        <div className="w-full text-left font-normal text-[#4a4a4a] text-base">
                          <div>{address}</div>
                          {category && <div>{category}</div>}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
            {scrollState.showBar && (
              <div className="relative h-6 mt-1">
                <div
                  className="absolute left-0 right-0 top-2 h-2 bg-white/70 rounded-full"
                  style={{ opacity: scrollState.barActive ? 1 : 0, transition: 'opacity 0.4s' }}
                />
                <div
                  style={scrollBarStyle}
                  onMouseDown={handleScrollBarMouseDown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ApartmentDialog />
    </>
  );
}, "Screen")

const apartmentDialogIsOpen = atom(false, "")

const ApartmentDialog = reatomComponent(({ ctx }) => {
  const images = ctx.spy(apartmentImages);
  const modalImageIdx = 1;

  return (
    <Dialog open={ctx.spy(apartmentDialogIsOpen)} onOpenChange={v => apartmentDialogIsOpen(ctx, v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div
          className="relative inline-flex items-center justify-center"
          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={images[modalImageIdx]}
            alt={`Фото ${modalImageIdx + 1}`}
            className="rounded-3xl shadow-2xl border-4 border-white object-contain max-h-[90vh] max-w-[90vw] transition-all duration-300"
            style={{ background: 'white' }}
          />
          <DialogClose asChild>
            <button
              className="absolute top-0 right-0 translate-x-[60px]
             -translate-y-[60px] text-white bg-black/40 rounded-full
              w-12 h-12 flex items-center justify-center shadow-lg hover:bg-black/60 transition-opacity duration-300"
              style={{ fontSize: 28, lineHeight: 1, zIndex: 60 }}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="none" />
                <path d="M7 7L17 17M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </DialogClose>
          {images.length > 1 && (
            <button
              className="absolute left-0 top-1/2 -translate-x-[60px]
               -translate-y-1/2 text-white bg-black/40 rounded-full
                p-3 hover:bg-black/60 transition-opacity duration-300
                 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
              onClick={() => apartmentImagesIdx(ctx, (modalImageIdx - 1 + images.length) % images.length)}
              aria-label="Предыдущее фото"
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="none" />
                <path d="M20 8L12 16L20 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {images.length > 1 && (
            <button
              className="absolute right-0 top-1/2 translate-x-[60px]
               -translate-y-1/2 text-white bg-black/40 rounded-full
                p-3 hover:bg-black/60 transition-opacity duration-300
                 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
              onClick={() => apartmentImagesIdx(ctx, (modalImageIdx + 1) % images.length)}
              aria-label="Следующее фото"
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="none" />
                <path d="M12 8L20 16L12 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}, "ApartmentDialog")

function GalleryScrollBar({ 
  thumbnailsRef 
}: { 
  thumbnailsRef: React.RefObject<HTMLDivElement | null> 
}) {
  const [drag, setDrag] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  useEffect(() => {
    if (!drag) return;

    const handleMove = (e: MouseEvent) => {
      const el = thumbnailsRef.current;
      if (!el) return;
      const dx = e.clientX - dragStartX.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const ratio = el.clientWidth / el.scrollWidth;
      const width = Math.max(40, el.clientWidth * ratio);
      const maxBarMove = el.clientWidth - width;
      el.scrollLeft = dragStartScrollLeft.current + (dx / maxBarMove) * maxScroll;
    };

    const handleUp = () => {
      setDrag(false);
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [drag, thumbnailsRef]);

  const el = thumbnailsRef.current;
  if (!el) return null;

  const ratio = el.clientWidth / el.scrollWidth;
  const width = Math.max(40, el.clientWidth * ratio);
  const left = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * (el.clientWidth - width);

  return (
    <div style={{ position: 'relative', height: '18px', marginTop: '2px' }}>
      <div
        style={{
          position: 'absolute',
          left,
          width,
          height: '6px',
          background: 'rgba(0,0,0,0.09)',
          borderRadius: '6px',
          transition: 'left 0.2s',
          cursor: 'pointer',
        }}
        onMouseDown={e => {
          setDrag(true);
          dragStartX.current = e.clientX;
          dragStartScrollLeft.current = el.scrollLeft;
          document.body.style.userSelect = 'none';
        }}
      />
    </div>
  );
}