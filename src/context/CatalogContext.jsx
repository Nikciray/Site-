import React, { createContext, useContext, useState, useEffect } from 'react';
import { catalogAPI } from '../services/api';

const CatalogContext = createContext();

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

export const CatalogProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Фильтры по умолчанию пустые
  const [filters, setFilters] = useState({});

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogAPI.getRoomTypes(filters);
      setProperties(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const value = {
    properties,
    loading,
    error,
    filters,
    updateFilters,
    refetch: fetchProperties
  };

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
}; 