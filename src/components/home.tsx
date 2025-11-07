import { TravelLineSearchForm } from "@/components/TLSearchForm";
import { reatomComponent, useUpdate } from "@reatom/npm-react";
import { roomTypesAction } from "@/lib/apartments.model";
import { ApartmentsCarousel } from "@/components/apartments-carousel";
import { useMemo, useState } from "react";
import { useEffect } from "react";

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

const ReviewsCarousel = () => {
  const [startIdx, setStartIdx] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const visibleCount = 4;
  const canScrollLeft = startIdx > 0;
  const canScrollRight = startIdx + visibleCount < reviewVideos.length;

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setModalVisible(true), 10);

      const onEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
      };

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

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const prevVideo = () => setModalIdx((modalIdx - 1 + reviewVideos.length) % reviewVideos.length);
  const nextVideo = () => setModalIdx((modalIdx + 1) % reviewVideos.length);

  const itemWidth = 220 + 32; // ширина видео + gap (w-[220px] + gap-8 = 32px)
  const offset = -startIdx * itemWidth;

  return (
    <>
      <div className="relative w-full flex items-center mb-8 min-h-[360px]">
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2
             z-10 w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md
              bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)' }}
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
            className="flex flex-row gap-8 w-full justify-center"
            style={{
              transform: `translateX(${offset}px)`,
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              width: reviewVideos.length * itemWidth,
            }}
          >
            {reviewVideos.map((video, idx) => (
              <div key={video.id} className="bg-[#dbdbdb] rounded-2xl 
              flex items-center justify-center w-[220px] h-[340px] overflow-hidden relative cursor-pointer group"
                onClick={() => openModal(idx)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal(idx); }}
              >
                <video
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ aspectRatio: '9/16', background: '#ccc' }}
                  controls={false}
                  poster={video.poster}
                  tabIndex={-1}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#fff" />
                      <polygon points="13,11 22,16 13,21" fill="#C4C4C4" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14
             flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80 transition-all"
            style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)' }}
            onClick={handleRight}
            aria-label="Прокрутить вправо"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 8L20 16L12 24" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[6px] transition-opacity duration-300 
            ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div
            className="relative inline-flex items-center justify-center"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
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
            <button
              className="absolute top-0 right-0 translate-x-[60px]
               -translate-y-[60px] text-white bg-black/40 rounded-full
                w-12 h-12 flex items-center justify-center shadow-lg hover:bg-black/60 transition-opacity duration-300"
              style={{ fontSize: 28, lineHeight: 1, zIndex: 60 }}
              onClick={closeModal}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="none" />
                <path d="M7 7L17 17M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {reviewVideos.length > 1 && (
              <button
                className="absolute left-0 top-1/2 -translate-x-[60px]
                 -translate-y-1/2 text-white bg-black/40 rounded-full p-3
                  hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{
                  fontSize: 28,
                  zIndex: 60,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'
                }}
                onClick={e => { e.stopPropagation(); prevVideo(); }}
                aria-label="Предыдущее видео"
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="none" />
                  <path d="M20 8L12 16L20 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {reviewVideos.length > 1 && (
              <button
                className="absolute right-0 top-1/2 translate-x-[60px]
                 -translate-y-1/2 text-white bg-black/40 rounded-full
                  p-3 hover:bg-black/60 transition-opacity duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{
                  fontSize: 28, zIndex: 60, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)'
                }}
                onClick={e => { e.stopPropagation(); nextVideo(); }}
                aria-label="Следующее видео"
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="none" />
                  <path d="M12 8L20 16L12 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const TextReviewsCarousel = () => {
  const textReviews = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({ id: i })), []);
  const [startIdx, setStartIdx] = useState(0);
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 
          flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 
          flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 shadow-md hover:bg-white/80"
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

export const Reviews = () => {
  return (
    <section id="reviews-section" className="w-full max-w-7xl mx-auto z-30 mt-12 pb-8">
      <h2 className="font-semibold text-[#2d2d2d] text-3xl md:text-4xl text-left mb-8">Отзывы</h2>
      <ReviewsCarousel />
      <TextReviewsCarousel />
    </section>
  )
}

export const Contacts = () => {
  return (
    <section id="contacts" className="w-full max-w-7xl mx-auto z-30 mt-12 pb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full h-full">
        <div className="flex flex-col gap-2 w-full sm:w-2/3 *:rounded-3xl">
          <div className="flex flex-col justify-between sm:h-[309px] p-4 sm:p-6 md:p-8 lg:p-10 w-full border border-black/20">
            <p className="text-[#106CEC] uppercase text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
              Добрые сутки
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl uppercase font-semibold">
              Квартиры <br/>где хочется остаться
            </p>
          </div>
          <div className="flex items-center justify-start p-4 sm:p-6 md:p-8 lg:p-16 bg-gradient-to-tr from-[#106CEC] to-[#106CEC]/50 sm:h-[196px] w-full">
            <p className="text-white uppercase font-semibold text-md sm:text-2xl">
              “ Уют — это не стены, а отношение. Мы вкладываем душу в каждую квартиру, чтобы вы могли просто жить и отдыхать ”
            </p>
          </div>
        </div>
        <div className="flex w-full sm:w-1/3 border h-full rounded-3xl border-black/20">
          <img src="/images/preview.png" alt="" className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  )
}

export const Hero = () => {
  return (
    <section
      className="w-full flex flex-col items-center justify-center pb-[14px] xl:px-[55px]"
    >
      <div
        className="relative w-full overflow-hidden h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px]"
        style={{
          borderBottomLeftRadius: '48px',
          borderBottomRightRadius: '48px',
        }}
      >
        <img
          src="https://c.animaapp.com/x7ciH6IU/img/b6f24610-bf13-11ef-936a-dacda727d281-1220x600-1.png"
          alt="Фон города Екатеринбурга"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-16 pb-8">
          <div className="flex items-center justify-center glass-card px-4 sm:px-6 py-2 sm:h-[90px] rounded-full">
            <h1
              className="font-extrabold relative -top-1 text-white text-nowrap text-lg min-[350px]:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[56px] text-center"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
            >
              Квартиры в Екатеринбурге
            </h1>
          </div>
          <div
            className="relative -top-2 inline-flex items-center justify-center px-6 sm:px-12 py-2 sm:h-[70px] bg-[#1677ff] rounded-full mb-4 shadow-lg"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
          >
            <div
              className="font-extrabold relative -top-1 text-white text-nowrap text-lg min-[350px]:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[56px] text-center"
            >
              Посуточно
            </div>
          </div>
          <TravelLineSearchForm id="main" />
        </div>
      </div>
    </section>
  )
}

export const Carousel = reatomComponent(({ ctx }) => {
  useUpdate(roomTypesAction, [])

  const isLoading = ctx.spy(roomTypesAction.statusesAtom).isPending
  const isError = ctx.spy(roomTypesAction.statusesAtom).isRejected;
  const error = ctx.spy(roomTypesAction.errorAtom)?.message;

  if (isLoading) {
    return <div className="flex justify-center items-center h-40 text-xl text-gray-500">Загрузка...</div>
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40 text-xl text-red-500">
        {error}
      </div>
    )
  }

  return <ApartmentsCarousel />
}, "Carousel")