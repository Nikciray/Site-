import React, { useState } from "react";
import { useCatalog } from "../../context/CatalogContext";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';

const CATEGORY_OPTIONS = [
  { value: "", label: "Не выбрано" },
  { value: "Аппартаменты", label: "Аппартаменты" },
  { value: "Квартира", label: "Квартира" },
  { value: "Номер", label: "Номер" },
  { value: "Студия", label: "Студия" },
];
const SORT_OPTIONS = [
  { value: "", label: "Не выбрано" },
  { value: "price", label: "Цена" },
  { value: "size", label: "Площадь" },
];
const BED_OPTIONS = [
  { value: "", label: "Не выбрано" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const CatalogHeaderSection = () => {
  const { updateFilters } = useCatalog();
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sizeFrom, setSizeFrom] = useState("");
  const [sizeTo, setSizeTo] = useState("");
  const [category, setCategory] = useState("");
  const [adultBed, setAdultBed] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleApplyFilters = () => {
    const filters = {};
    if (priceFrom !== "") filters.price_from = Number(priceFrom);
    if (priceTo !== "") filters.price_to = Number(priceTo);
    if (sizeFrom !== "") filters.size_from = Number(sizeFrom);
    if (sizeTo !== "") filters.size_to = Number(sizeTo);
    if (category !== "") filters.category = category;
    if (adultBed !== "") filters.adult_bed = Number(adultBed);
    if (sortBy !== "") filters.sort_by = sortBy;
    updateFilters(filters);
  };

  const minPrice = 0;
  const maxPrice = 20000;
  const sliderValue = [
    priceFrom !== '' ? Number(priceFrom) : minPrice,
    priceTo !== '' ? Number(priceTo) : maxPrice,
  ];

  return (
    <div className="inline-flex flex-col gap-6 p-6 bg-white rounded-3xl overflow-hidden border border-solid border-[#00000033] w-full max-w-[350px]">
      <div className="flex flex-col gap-2.5">
        <label className="text-[#4a4a4a] text-base flex items-center gap-1">Цена <span className="text-[#4a4a4a] text-base font-normal align-middle">₽</span></label>
        <div className="flex gap-2 items-center w-full">
          <input
            type="number"
            value={priceFrom}
            onChange={e => setPriceFrom(e.target.value)}
            className="flex-1 w-full border rounded-2xl px-4 py-1"
            min="0"
            placeholder="От"
            aria-label="Минимальная цена"
          />
          <span>-</span>
          <input
            type="number"
            value={priceTo}
            onChange={e => setPriceTo(e.target.value)}
            className="flex-1 w-full border rounded-2xl px-4 py-1"
            min="0"
            placeholder="До"
            aria-label="Максимальная цена"
          />
        </div>
        {/* Range slider for price */}
        <div className="mt-2 mb-2 px-1">
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            value={sliderValue}
            onChange={([from, to]) => {
              setPriceFrom(from);
              setPriceTo(to);
            }}
            trackStyle={[{ backgroundColor: '#106cec', height: 6 }]}
            handleStyle={[
              { borderColor: '#106cec', backgroundColor: '#fff', width: 22, height: 22, marginTop: -8, opacity: 1, outline: 'none', borderWidth: 4 },
              { borderColor: '#106cec', backgroundColor: '#fff', width: 22, height: 22, marginTop: -8, opacity: 1, outline: 'none', borderWidth: 4 },
            ]}
            railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
            allowCross={false}
            pushable={100}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <label className="text-[#4a4a4a] text-base">Площадь (м²)</label>
        <div className="flex gap-2 items-center w-full">
          <input
            type="number"
            value={sizeFrom}
            onChange={e => setSizeFrom(e.target.value)}
            className="flex-1 w-full border rounded-2xl px-4 py-1"
            min="0"
            placeholder="От"
            aria-label="Минимальная площадь"
          />
          <span>-</span>
          <input
            type="number"
            value={sizeTo}
            onChange={e => setSizeTo(e.target.value)}
            className="flex-1 w-full border rounded-2xl px-4 py-1"
            min="0"
            placeholder="До"
            aria-label="Максимальная площадь"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <label className="text-[#4a4a4a] text-base">Категория</label>
        <Select
          value={CATEGORY_OPTIONS.find(opt => opt.value === category)}
          onChange={opt => setCategory(opt.value)}
          options={CATEGORY_OPTIONS}
          isSearchable={false}
          styles={{
            control: (base, state) => ({
              ...base,
              borderRadius: 16,
              minHeight: 44,
              borderColor: '#e5e7eb',
              boxShadow: state.isFocused ? '0 0 0 2px #106cec33' : 'none',
              fontSize: 16,
              color: '#2d2d2d',
              paddingLeft: 4,
              paddingRight: 4,
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 16,
              marginTop: 2,
              fontSize: 16,
              zIndex: 20,
              overflow: 'hidden',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#106cec' : state.isFocused ? '#e5e7eb' : '#fff',
              color: state.isSelected ? '#fff' : '#2d2d2d',
              cursor: 'pointer',
              fontSize: 16,
              borderRadius: state.isSelected || state.isFocused ? 12 : 0,
              paddingLeft: 12,
              paddingRight: 12,
              transition: 'background 0.15s, color 0.15s',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#2d2d2d',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: '#bdbdbd',
              paddingRight: 8,
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <label className="text-[#4a4a4a] text-base">Спальные места</label>
        <Select
          value={BED_OPTIONS.find(opt => String(opt.value) === String(adultBed))}
          onChange={opt => setAdultBed(opt.value)}
          options={BED_OPTIONS}
          isSearchable={false}
          styles={{
            control: (base, state) => ({
              ...base,
              borderRadius: 16,
              minHeight: 44,
              borderColor: '#e5e7eb',
              boxShadow: state.isFocused ? '0 0 0 2px #106cec33' : 'none',
              fontSize: 16,
              color: '#2d2d2d',
              paddingLeft: 4,
              paddingRight: 4,
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 16,
              marginTop: 2,
              fontSize: 16,
              zIndex: 20,
              overflow: 'hidden',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#106cec' : state.isFocused ? '#e5e7eb' : '#fff',
              color: state.isSelected ? '#fff' : '#2d2d2d',
              cursor: 'pointer',
              fontSize: 16,
              borderRadius: state.isSelected || state.isFocused ? 12 : 0,
              paddingLeft: 12,
              paddingRight: 12,
              transition: 'background 0.15s, color 0.15s',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#2d2d2d',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: '#bdbdbd',
              paddingRight: 8,
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <label className="text-[#4a4a4a] text-base">Сортировка</label>
        <Select
          value={SORT_OPTIONS.find(opt => String(opt.value) === String(sortBy))}
          onChange={opt => setSortBy(opt.value)}
          options={SORT_OPTIONS}
          isSearchable={false}
          styles={{
            control: (base, state) => ({
              ...base,
              borderRadius: 16,
              minHeight: 44,
              borderColor: '#e5e7eb',
              boxShadow: state.isFocused ? '0 0 0 2px #106cec33' : 'none',
              fontSize: 16,
              color: '#2d2d2d',
              paddingLeft: 4,
              paddingRight: 4,
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 16,
              marginTop: 2,
              fontSize: 16,
              zIndex: 20,
              overflow: 'hidden',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#106cec' : state.isFocused ? '#e5e7eb' : '#fff',
              color: state.isSelected ? '#fff' : '#2d2d2d',
              cursor: 'pointer',
              fontSize: 16,
              borderRadius: state.isSelected || state.isFocused ? 12 : 0,
              paddingLeft: 12,
              paddingRight: 12,
              transition: 'background 0.15s, color 0.15s',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#2d2d2d',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: '#bdbdbd',
              paddingRight: 8,
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
        />
      </div>
      <button
        className="mt-4 bg-[#106cec] hover:bg-[#0d5bc7] text-white rounded-3xl px-6 py-2 text-lg font-medium transition-colors"
        onClick={handleApplyFilters}
      >
        ПРИМЕНИТЬ
      </button>
    </div>
  );
}; 