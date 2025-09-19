import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://212.8.226.103:8000/api/main/room-types", {
          headers: { accept: "application/json" },
        });
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        setApartments(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, []);

  const navigationItems = [
    { id: 1, label: "Каталог квартир" },
    { id: 2, label: "Отзывы" },
    { id: 3, label: "О нас" },
  ];

  const searchFields = [
    {
      id: 1,
      label: "Заезд - Выезд",
      hasIcon: true,
      iconSrc: "https://c.animaapp.com/x7ciH6IU/img/calendar-month@2x.png",
    },
    {
      id: 2,
      label: "Кол-во комнат",
      hasIcon: false,
    },
    {
      id: 3,
      label: "Промокод",
      hasIcon: false,
    },
  ];

  // Карусель отзывов с кастомными стрелками
  const reviewVideos = [
    { id: 1, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+1' },
    { id: 2, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+2' },
    { id: 3, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+3' },
    { id: 4, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+4' },
    { id: 5, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+5' },
    { id: 6, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+6' },
    { id: 7, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+7' },
    { id: 8, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+8' },
    { id: 9, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+9' },
    { id: 10, src: '', poster: 'https://dummyimage.com/270x480/cccccc/222&text=Видео+10' },
  ];

  function ReviewsCarousel() {
    const [startIdx, setStartIdx] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalIdx, setModalIdx] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const visibleCount = 4;
    const canScrollLeft = startIdx > 0;
    const canScrollRight = startIdx + visibleCount < reviewVideos.length;

    React.useEffect(() => {
      if (isModalOpen) {
        setTimeout(() => setModalVisible(true), 10);
        const onEsc = (e) => { if (e.key === 'Escape') closeModal(); };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
      } else {
        setModalVisible(false);
      }
    }, [isModalOpen]);

    const handleLeft = () => {
      if (canScrollLeft) setStartIdx(idx => Math.max(0, idx - 1));
    };
    const handleRight = () => {
      if (canScrollRight) setStartIdx(idx => Math.min(reviewVideos.length - visibleCount, idx + 1));
    };
    const openModal = (idx) => {
      setModalIdx(idx);
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setModalVisible(false);
      setTimeout(() => setIsModalOpen(false), 300);
    };
    const prevVideo = () => setModalIdx((modalIdx - 1 + reviewVideos.length) % reviewVideos.length);
    const nextVideo = () => setModalIdx((modalIdx + 1) % reviewVideos.length);

    // Для плавной прокрутки через translateX
    const itemWidth = 220 + 32; // ширина видео + gap (w-[220px] + gap-8 = 32px)
    const offset = -startIdx * itemWidth;

    return (
      <>
        <div className="relative w-full flex items-center mb-8 min-h-[360px]">
          {canScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
              style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
              onClick={handleLeft}
              aria-label="Прокрутить влево"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <div className="overflow-hidden w-full">
            <div
              className="flex flex-row gap-8 w-full justify-center"
              style={{
                transform: `translateX(${offset}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                width: reviewVideos.length * itemWidth,
              }}
            >
              {reviewVideos.map((video, idx) => (
                <div key={video.id} className="bg-[#dbdbdb] rounded-2xl flex items-center justify-center w-[220px] h-[340px] overflow-hidden relative cursor-pointer group"
                  onClick={() => openModal(idx)}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal(idx); }}
                >
                  {/* Видео-отзыв (заглушка) */}
                  <video
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ aspectRatio: '9/16', background: '#ccc' }}
                    controls={false}
                    poster={video.poster}
                    tabIndex={-1}
                  />
                  {/* Иконка play по центру */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#fff"/>
                        <polygon points="13,11 22,16 13,21" fill="#C4C4C4"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {canScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
              style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
              onClick={handleRight}
              aria-label="Прокрутить вправо"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
        </div>
        {/* Модальное окно для видео */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[6px] transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{backdropFilter: 'blur(8px)'}}
            onClick={closeModal}
          >
            <div className="relative inline-flex items-center justify-center" style={{maxWidth: '90vw', maxHeight: '90vh'}} onClick={e => e.stopPropagation()}>
              {/* Видео */}
              <video
                src={reviewVideos[modalIdx].src}
                poster={reviewVideos[modalIdx].poster}
                controls
                autoPlay
                className="rounded-3xl shadow-2xl border-4 border-white object-contain bg-black"
                style={{
                  background: 'black',
                  width: 'min(480px, 90vw)',
                  height: 'min(90vh, 960px)',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  aspectRatio: '9/16',
                  display: 'block',
                }}
              />
              {/* Кнопка закрытия */}
              <button
                className="absolute top-0 right-0 translate-x-[60px] -translate-y-[60px] text-white bg-black/40 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-black/60 transition-opacity duration-300"
                style={{fontSize: 28, lineHeight: 1, zIndex: 60}}
                onClick={closeModal}
                aria-label="Закрыть"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="none"/>
                  <path d="M7 7L17 17M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Стрелка влево */}
              {reviewVideos.length > 1 && (
                <button
                  className="absolute left-0 top-1/2 -translate-x-[60px] -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  style={{fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'}}
                  onClick={e => { e.stopPropagation(); prevVideo(); }}
                  aria-label="Предыдущее видео"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M20 8L12 16L20 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
              {/* Стрелка вправо */}
              {reviewVideos.length > 1 && (
                <button
                  className="absolute right-0 top-1/2 translate-x-[60px] -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  style={{fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'}}
                  onClick={e => { e.stopPropagation(); nextVideo(); }}
                  aria-label="Следующее видео"
                >
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M12 8L20 16L12 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  function TextReviewsCarousel() {
    const textReviews = React.useMemo(() => Array.from({ length: 10 }).map((_, i) => ({ id: i })), []);
    const [startIdx, setStartIdx] = React.useState(0);
    const visibleCount = 3;
    const itemWidth = 340 + 32;

    const canScrollLeft = startIdx > 0;
    const canScrollRight = startIdx + visibleCount < textReviews.length;

    const handleLeft = () => {
      if (canScrollLeft) {
        setStartIdx(idx => Math.max(0, idx - 1));
      }
    };

    const handleRight = () => {
      if (canScrollRight) {
        setStartIdx(idx => idx + 1);
      }
    };

    const offset = -startIdx * itemWidth;

    return (
      <div className="relative w-full flex items-center mt-12">
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)', transform: 'translateX(-50%)' }}
            onClick={handleLeft}
            aria-label="Прокрутить влево"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="overflow-hidden w-full">
          <div
            className="flex flex-row gap-8"
            style={{
              transform: `translateX(${offset}px)`,
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {textReviews.map((review) => (
              <div key={review.id} className="bg-[#dbdbdb] rounded-2xl w-[340px] h-[120px] min-w-[340px] flex-shrink-0 shadow-md" />
            ))}
          </div>
        </div>
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)', transform: 'translateX(50%)' }}
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
  }

  // Новый размер карточки
  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 308;
  const CARD_IMAGE_HEIGHT = 200;
  const CARD_GAP = 24;
  const CARD_MIN_WIDTH = 260;
  const CARD_MAX_WIDTH = 300;
  const CARD_MIN_HEIGHT = 308;
  const CARD_MAX_HEIGHT = 308;
  const CARD_BODY_HEIGHT = 108;
  const CARD_BODY_PADDING = 16;

  // Карусель карточек квартир
  function ApartmentsCarousel({ apartments }) {
    const [startIdx, setStartIdx] = React.useState(0);
    const visibleCount = 4;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    const canScrollLeft = startIdx > 0;
    const canScrollRight = startIdx + visibleCount < apartments.length;
    const offset = -startIdx * itemWidth;

    const handleLeft = () => {
      if (canScrollLeft) setStartIdx(idx => Math.max(0, idx - 1));
    };
    const handleRight = () => {
      if (canScrollRight) setStartIdx(idx => Math.min(apartments.length - visibleCount, idx + 1));
    };

    return (
      <div className="relative w-full flex items-center" style={{ minHeight: CARD_HEIGHT }}>
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/80 shadow-md hover:bg-white transition-all"
            style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
            onClick={handleLeft}
            aria-label="Прокрутить влево"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M20 8L12 16L20 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        <div className="overflow-hidden w-full">
          <div
            className="flex flex-row gap-8 w-full justify-center"
            style={{
              transform: `translateX(${offset}px)`,
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              width: apartments.length * itemWidth,
              gap: `${CARD_GAP}px`,
            }}
          >
            {apartments.map((apartment) => (
              <Link
                key={apartment.id}
                to={`/apartment/${apartment.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="group"
              >
                <article
                  className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg transition-shadow hover:shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer group-hover:shadow-2xl"
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT, minWidth: CARD_MIN_WIDTH, minHeight: CARD_MIN_HEIGHT, maxWidth: CARD_MAX_WIDTH, maxHeight: CARD_MAX_HEIGHT }}
                >
                  <img
                    className="object-cover w-full"
                    style={{ height: CARD_IMAGE_HEIGHT, minHeight: CARD_IMAGE_HEIGHT, maxHeight: CARD_IMAGE_HEIGHT }}
                    alt={apartment.name}
                    src={apartment.image}
                  />
                  <div className="flex flex-col justify-between px-6 pt-4 pb-6 w-full h-full" style={{height: '130px', minHeight: '130px', maxHeight: '130px', paddingTop: '16px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px'}}>
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
                    {/* Описание: адрес и категория */}
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
                </article>
              </Link>
            ))}
          </div>
        </div>
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md bg-white/80 shadow-md hover:bg-white transition-all"
            style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'}}
            onClick={handleRight}
            aria-label="Прокрутить вправо"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center">
      <Header />

      {/* Hero section with background */}
      <section className="w-full flex flex-col items-center justify-center" style={{paddingBottom: '14px', paddingLeft: '60px', paddingRight: '60px'}}>
        <div className="w-full overflow-hidden" style={{borderBottomLeftRadius: '48px', borderBottomRightRadius: '48px', minHeight: '500px', maxHeight: '700px', position: 'relative'}}>
          <img
            src="https://c.animaapp.com/x7ciH6IU/img/b6f24610-bf13-11ef-936a-dacda727d281-1220x600-1.png"
            alt="Фон города Екатеринбурга"
            className="w-full h-full object-cover object-top"
            style={{display: 'block'}}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-16 pb-8">
            <h1 className="font-extrabold text-white text-4xl md:text-6xl lg:text-7xl text-center mb-4" style={{textShadow: '0 4px 24px rgba(0,0,0,0.35)'}}>
              Квартиры в Екатеринбурге
            </h1>
            <div className="inline-flex items-center justify-center px-12 py-2 bg-[#1677ff] rounded-full mb-8 shadow-lg" style={{boxShadow: '0 4px 24px rgba(0,0,0,0.18)'}}>
              <div className="font-extrabold text-white text-3xl md:text-4xl lg:text-5xl text-center" style={{letterSpacing: '0.01em'}}>
                Посуточно
              </div>
            </div>
            {/* Search form */}
            <div className="flex items-center justify-center w-full" style={{ marginTop: '14px', marginBottom: '14px' }}>
              <div
                className="flex flex-row items-center justify-center gap-4"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '38px',
                  minWidth: '600px',
                  maxWidth: '800px',
                  width: '100%',
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  paddingLeft: '21px',
                  paddingRight: '21px',
                }}
              >
                {searchFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-2 bg-white rounded-[24px] border border-black/10 px-[16px] h-[48px] flex-1"
                    style={{ minWidth: 0 }}
                  >
                    <label className="text-[#747474] text-[16px] font-normal whitespace-nowrap flex-1 text-left" style={{ fontFamily: 'Gotham Pro, Arial, sans-serif' }}>
                      {field.label}
                    </label>
                    {field.hasIcon && (
                      <img
                        className="w-6 h-6 ml-2"
                        alt="Calendar icon"
                        src={field.iconSrc}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="flex items-center justify-center bg-[#106cec] hover:bg-[#0d5bc7] text-white text-[16px] font-semibold rounded-[24px] px-8 h-[48px] transition-colors ml-2"
                  style={{ minWidth: '100px', boxShadow: 'none', fontFamily: 'Gotham Pro, Arial, sans-serif' }}
                >
                  Найти
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments cards */}
      <section className="w-full max-w-7xl mx-auto z-30 mt-12 pb-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-xl text-gray-500">Загрузка...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-40 text-xl text-red-500">{error}</div>
        ) : (
          <ApartmentsCarousel apartments={apartments} />
        )}
        <div className="flex justify-center mt-8">
          <Link
            to="/catalog"
            className="flex items-center justify-center gap-2.5 px-8 py-2 bg-[#106cec] rounded-full text-white text-xl font-medium hover:bg-[#0d5bc7] transition-colors"
          >
            Каталог
            <img
              className="w-4 h-4"
              alt="Arrow"
              src="https://c.animaapp.com/x7ciH6IU/img/arrow-1.svg"
            />
          </Link>
        </div>
      </section>

      {/* About/Company section */}
      <section className="w-full max-w-5xl mx-auto bg-[#d9d9d9] rounded-3xl border-2 border-dashed border-[#00b8c8] flex flex-col items-center justify-center h-64 p-8 my-12">
        <div className="font-medium text-[#00b8c8] text-xl text-center">
          О КОМПАНИИ<br />И ДОП ИНФОРМАЦИЯ
        </div>
      </section>

      {/* Reviews section */}
      <section id="reviews-section" className="w-full max-w-5xl mx-auto px-4 mb-16">
        <h2 className="font-semibold text-[#2d2d2d] text-3xl md:text-4xl text-left mb-8">Отзывы</h2>
        <ReviewsCarousel />
        <TextReviewsCarousel />
      </section>

      {/* About/Company section 2 */}
      <section className="w-full max-w-5xl mx-auto bg-[#d9d9d9] rounded-3xl border border-solid border-[#00b8c8] flex flex-col items-center justify-center h-64 p-8 mb-12">
        <div className="font-medium text-[#00b8c8] text-xl text-center">
          О КОМПАНИИ<br />И ДОП ИНФОРМАЦИЯ
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}; 