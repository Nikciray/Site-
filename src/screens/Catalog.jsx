import React from "react";
import {
  CatalogHeaderSection,
  MainContentSection,
  PropertyCardSection,
  PropertyListSection,
} from "./CatalogSections";
import { CatalogProvider } from "../context/CatalogContext";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Catalog = () => {
  return (
    <CatalogProvider>
      <CatalogContent />
    </CatalogProvider>
  );
};

const CatalogContent = () => {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center pt-20">
      <Header />
      {/* Top navigation */}

      {/* Page content */}
      <div className="w-full max-w-[1440px] px-4 md:px-8 mt-8 flex flex-col">
        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-semibold text-[#2d2d2d] mb-8 text-left md:text-left">Каталог</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Фильтр слева */}
          <div className="w-full md:min-w-[300px] md:max-w-[350px] md:w-auto mb-8 md:mb-0">
            <CatalogHeaderSection />
          </div>
          {/* Список карточек справа */}
          <div className="flex-1 flex flex-col gap-8">
            <PropertyListSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}; 