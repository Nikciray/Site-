import React, { useState, useEffect, useRef } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Screen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState(null);
  const [similarApartments, setSimilarApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const thumbnailsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const similarRef = useRef(null);
  const [canScrollSimilarLeft, setCanScrollSimilarLeft] = useState(false);
  const [canScrollSimilarRight, setCanScrollSimilarRight] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [scrollBarActive, setScrollBarActive] = useState(false);
  const scrollBarTimeout = useRef(null);
  // Drag state for custom scrollbar
  const [isDraggingScrollBar, setIsDraggingScrollBar] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fade, setFade] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [isModalOpen]);

  // Для изображений: если images пустой, показывать apartment.image
  const images = apartment && apartment.images && apartment.images.length > 0 ? apartment.images : (apartment && apartment.image ? [apartment.image] : []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`http://217.114.3.46:8000/api/info/room-types/${id}`).then(r => r.json()),
      fetch(`http://217.114.3.46:8000/api/similar/room-types/${id}`).then(r => r.json()),
    ])
      .then(([apartmentData, similarData]) => {
        setApartment(apartmentData);
        setSimilarApartments(Array.isArray(similarData) ? similarData : []);
      })
      .catch(e => setError('Ошибка загрузки данных'))
      .finally(() => setLoading(false));
  }, [id]);

  // Проверка возможности прокрутки
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

  // Проверка возможности скролла похожих квартир
  useEffect(() => {
    const checkScroll = () => {
      const el = similarRef.current;
      if (!el) return;
      setCanScrollSimilarLeft(el.scrollLeft > 0);
      setCanScrollSimilarRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 20); // чуть раньше
    };
    checkScroll();
    const el = similarRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    // Вызвать checkScroll после рендера карточек (DOM обновился)
    const timeout = setTimeout(checkScroll, 100);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timeout);
    };
  }, [similarApartments]);

  // Кастомный скроллбар для похожих квартир
  useEffect(() => {
    const el = similarRef.current;
    if (!el) return;
    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const visible = el.scrollWidth > el.clientWidth;
        setShowScrollBar(visible);
        if (visible) {
          if (el.scrollLeft > 0) setScrollBarActive(true);
          else setScrollBarActive(false);
        }
      });
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    requestAnimationFrame(handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollBarTimeout.current) clearTimeout(scrollBarTimeout.current);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [similarApartments]);

  // Mouse events for custom scrollbar
  const handleScrollBarMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingScrollBar(true);
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = similarRef.current.scrollLeft;
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!isDraggingScrollBar) return;
    const handleMouseMove = (e) => {
      const el = similarRef.current;
      if (!el) return;
      const dx = e.clientX - dragStartX.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const maxBarMove = el.clientWidth - (Math.max(40, (el.clientWidth * (el.clientWidth / el.scrollWidth)) / 3));
      const scrollDelta = (dx / maxBarMove) * maxScroll;
      el.scrollLeft = dragStartScrollLeft.current + scrollDelta;
    };
    const handleMouseUp = () => {
      setIsDraggingScrollBar(false);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingScrollBar]);

  const scrollThumbnails = (dir) => {
    const el = thumbnailsRef.current;
    if (!el) return;
    const scrollAmount = 220; // ширина миниатюры + отступ
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  // Показать скроллбар при клике на стрелки
  const scrollSimilar = (dir) => {
    const el = similarRef.current;
    if (!el) return;
    const scrollAmount = 380; // ширина карточки + gap
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    if (el.scrollLeft + scrollAmount > 0) setScrollBarActive(true);
  };

  if (loading) return <div className="w-full flex justify-center items-center h-96 text-xl text-gray-500">Загрузка...</div>;
  if (error || !apartment) return <div className="w-full flex justify-center items-center h-96 text-xl text-red-500">{error || 'Нет данных'}</div>;

  // Вычисляем стили скроллбара заранее
  let scrollBarStyle = { display: 'none' };
  if (showScrollBar && similarRef.current) {
    const el = similarRef.current;
    const ratio = el.clientWidth / el.scrollWidth;
    const width = Math.max(40, (el.clientWidth * ratio) / 3);
    const left = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * (el.clientWidth - width);
    scrollBarStyle = {
      position: 'absolute',
      top: '8px',
      left,
      width,
      height: '8px',
      background: 'rgba(0,0,0,0.13)',
      borderRadius: '8px',
      transition: 'left 0.2s, opacity 0.4s',
      opacity: scrollBarActive ? 1 : 0,
      cursor: 'pointer',
    };
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center pt-20">
      <Header />
      {/* Main content container */}
      <div className="w-full max-w-[1440px] px-4 md:px-8 mt-8 flex flex-col gap-8">
        {/* Main section: images + details */}
        <div className="flex flex-col lg:flex-row justify-center" style={{gap: '20px'}}>
          {/* Images */}
          <div className="flex flex-col gap-4 w-[700px]">
            {images[0] && (
              <img
                className={`w-full h-[458px] object-cover rounded-3xl transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                alt={apartment.name}
                src={selectedImage || images[0]}
                onLoad={() => setFade(false)}
                onClick={() => {
                  setIsModalOpen(true);
                  setModalImageIdx(selectedImage ? images.indexOf(selectedImage) : 0);
                }}
                style={{cursor: 'zoom-in'}}
              />
            )}
            {/* Миниатюры с кастомными стрелками */}
            <div className="relative w-full" style={{maxWidth: '700px'}}>
              {/* Левая стрелка */}
              {canScrollLeft && (
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                  style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
                  onClick={() => scrollThumbnails(-1)}
                  aria-label="Прокрутить влево"
                >
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              {/* Правая стрелка */}
              {canScrollRight && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                  style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
                  onClick={() => scrollThumbnails(1)}
                  aria-label="Прокрутить вправо"
                >
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              <div ref={thumbnailsRef} className="overflow-x-auto whitespace-nowrap px-2 scroll-smooth w-full hide-scroll" style={{maxWidth: '700px'}}>
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className={`inline-block mr-4 last:mr-0 rounded-2xl ${selectedImage === src ? '' : ''}`}
                    style={selectedImage === src ? {
                      background: 'white',
                      boxShadow: '0 0 16px 6px #106cec55',
                      borderRadius: '16px',
                      padding: 0
                    } : {background: 'transparent'}}
                  >
                    <img
                      className="w-[173px] h-[112px] object-cover rounded-xl cursor-pointer"
                      alt={`Apartment thumbnail ${idx+1}`}
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
              {/* Кастомный скроллбар для миниатюр с drag-функциональностью */}
              {thumbnailsRef.current && thumbnailsRef.current.scrollWidth > thumbnailsRef.current.clientWidth && (
                <GalleryScrollBar thumbnailsRef={thumbnailsRef} />
              )}
            </div>
          </div>

          {/* Details and booking */}
          <div className="flex flex-col gap-6 w-full max-w-[380px]">
            {/* Property details card */}
            <div className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <h1 className="text-2xl font-semibold text-black">{apartment.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-base text-black">
                <span><span className="font-medium">{apartment.adult_bed}</span> спальных места</span>
                <span><span className="font-medium">{apartment.size}</span> м²</span>
                {apartment.floor && <span><span className="font-medium">{apartment.floor}</span> этаж</span>}
              </div>
              <div className="text-[40px] font-medium text-black leading-none">
                {apartment.price} <span className="text-2xl">₽</span> <span className="text-lg font-normal">в сутки</span>
              </div>
            </div>

            {/* Check-in/Check-out info card */}
            <div className="flex flex-col items-start gap-2 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <div className="font-medium text-base text-black">⏰ Проживание:</div>
              <div className="text-base text-black">
                Заселение - после 14:00 <br />Выезд - до 12:00
              </div>
            </div>

            {/* Booking form card */}
            <div className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white">
              <div className="flex w-full justify-between items-center">
                <div className="font-medium text-xl text-black">За 2 суток</div>
                <div className="font-medium text-xl text-black text-right">{apartment.price * 2} <span className="text-base font-normal">₽</span></div>
              </div>
              <div className="w-full">
                <label className="block text-sm text-[#4a4a4a] mb-1">Ваш телефон для бронирования</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full px-2 py-1 bg-[#eeeeee] rounded-lg text-sm text-black outline-none"
                  placeholder="+7"
                />
              </div>
              <button
                onClick={() => {}}
                className="w-full bg-[#106cec] rounded-full py-2 hover:bg-[#0d5bc7] transition-colors text-white text-xl font-medium"
              >
                Забронировать
              </button>
            </div>
          </div>
        </div>

        {/* Description section */}
        <section className="flex flex-col items-start gap-6 p-6 rounded-3xl border border-solid border-[#00000033] bg-white max-w-[1100px] w-full mx-auto">
          <p className="text-base text-black whitespace-pre-line">
            {apartment.description}
          </p>
        </section>

        {/* Similar apartments section */}
        <div className="mt-12 relative">
          <h2 className="text-4xl font-semibold text-[#2d2d2d] mb-6">Похожие квартиры</h2>
          <div className="relative">
            {/* Левая стрелка */}
            {canScrollSimilarLeft && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}} 
                onClick={() => scrollSimilar(-1)}
                aria-label="Прокрутить влево"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            {/* Правая стрелка */}
            {canScrollSimilarRight && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
                style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}} 
                onClick={() => scrollSimilar(1)}
                aria-label="Прокрутить вправо"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            <div
              ref={similarRef}
              style={{overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none', msOverflowStyle: 'none'}}
              className="hide-scroll flex gap-8 pb-4 flex-nowrap"
            >
              {similarApartments.map((ap) => (
                <div
                  key={ap.id}
                  className="flex-shrink-0 bg-white rounded-3xl shadow-lg transition-shadow hover:shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                  style={{ width: '360px', height: '370px', minWidth: '320px', minHeight: '370px', maxWidth: '360px', maxHeight: '370px' }}
                  onClick={() => navigate(`/apartment/${ap.id}`)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/apartment/${ap.id}`); }}
                >
                  <img
                    className="object-cover w-full"
                    style={{ height: '240px', minHeight: '240px', maxHeight: '240px' }}
                    alt={ap.name}
                    src={ap.image}
                  />
                  <div className="flex flex-col justify-between px-6 pt-4 pb-6 w-full h-full" style={{height: '130px', minHeight: '130px', maxHeight: '130px', paddingTop: '16px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px'}}>
                    <div className="flex items-center justify-between w-full mb-4">
                      <p className="font-medium text-black text-[32px] leading-none">
                        {ap.price} <span className="text-2xl">₽</span>
                      </p>
                      <div className="flex items-center gap-1">
                        <img
                          className="w-5 h-5"
                          alt="Bed icon"
                          src="https://c.animaapp.com/x7ciH6IU/img/bed-2@2x.png"
                        />
                        <span className="font-normal text-[#4a4a4a] text-base">
                          {ap.adult_bed}
                        </span>
                      </div>
                    </div>
                    {/* Описание: адрес и категория */}
                    {(() => {
                      const [address, category] = (ap.name || '').split('|');
                      return (
                        <div className="w-full not-italic text-left">
                          <div className="font-normal text-[#4a4a4a] text-base">{address}</div>
                          {category && <div className="font-normal text-[#4a4a4a] text-base">{category}</div>}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
            {/* Кастомный скроллбар */}
            {showScrollBar && (
              <div style={{position: 'relative', height: '24px', marginTop: '4px'}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: '8px', height: '8px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', opacity: scrollBarActive ? 1 : 0, transition: 'opacity 0.4s'}} />
                <div
                  style={scrollBarStyle}
                  onMouseDown={handleScrollBarMouseDown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* Модальное окно полноэкранного просмотра */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[6px] transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{backdropFilter: 'blur(8px)'}}
          onClick={() => { setModalVisible(false); setTimeout(() => setIsModalOpen(false), 300); }}
        >
          <div className="relative inline-flex items-center justify-center" style={{maxWidth: '90vw', maxHeight: '90vh'}} onClick={e => e.stopPropagation()}>
            {/* Картинка */}
            <img
              src={images[modalImageIdx]}
              alt={`Фото ${modalImageIdx+1}`}
              className="rounded-3xl shadow-2xl border-4 border-white object-contain max-h-[90vh] max-w-[90vw] transition-all duration-300"
              style={{background: 'white'}}
            />
            {/* Кнопка закрытия */}
            <button
              className="absolute top-0 right-0 translate-x-[60px] -translate-y-[60px] text-white bg-black/40 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-black/60 transition-opacity duration-300"
              style={{fontSize: 28, lineHeight: 1, zIndex: 60}}
              onClick={() => { setModalVisible(false); setTimeout(() => setIsModalOpen(false), 300); }}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="none"/>
                <path d="M7 7L17 17M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Стрелка влево */}
            {images.length > 1 && (
              <button
                className="absolute left-0 top-1/2 -translate-x-[60px] -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'}}
                onClick={() => setModalImageIdx((modalImageIdx - 1 + images.length) % images.length)}
                aria-label="Предыдущее фото"
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M20 8L12 16L20 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            {/* Стрелка вправо */}
            {images.length > 1 && (
              <button
                className="absolute right-0 top-1/2 translate-x-[60px] -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'}}
                onClick={() => setModalImageIdx((modalImageIdx + 1) % images.length)}
                aria-label="Следующее фото"
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M12 8L20 16L12 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Кастомный скроллбар для миниатюр с drag
function GalleryScrollBar({ thumbnailsRef }) {
  const [drag, setDrag] = React.useState(false);
  const dragStartX = React.useRef(0);
  const dragStartScrollLeft = React.useRef(0);

  React.useEffect(() => {
    if (!drag) return;
    const handleMove = (e) => {
      const el = thumbnailsRef.current;
      if (!el) return;
      const dx = e.clientX - dragStartX.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const maxBarMove = el.clientWidth - 60;
      const scrollDelta = (dx / maxBarMove) * maxScroll;
      el.scrollLeft = dragStartScrollLeft.current + scrollDelta;
    };
    const handleUp = () => setDrag(false);
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
  const width = 60;
  const left = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * (el.clientWidth - width);

  return (
    <div style={{position: 'relative', height: '18px', marginTop: '2px'}}>
      <div style={{
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
        onMouseUp={() => { document.body.style.userSelect = ''; }}
      />
    </div>
  );
}
