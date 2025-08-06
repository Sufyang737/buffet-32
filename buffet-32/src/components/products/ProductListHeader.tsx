// src/app/components/products/ProductListHeader.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export type ProductCategory = 'Almuerzo' | 'Desayuno/Merienda' | 'Kiosco';

interface ProductListHeaderProps {
  activeTab: ProductCategory;
  onTabChange: (tab: ProductCategory) => void;
  onConfigClick?: () => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({ activeTab, onTabChange, onConfigClick }) => {
  const router = useRouter();

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderBottom: '1px solid #eee',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      paddingBottom: '10px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        paddingBottom: '0px',
      }}>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }} onClick={() => router.back()}>
          &larr;
        </button>
        <h1 style={{ flexGrow: 1, textAlign: 'center', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          Productos del Buffet
        </h1>
        <button
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }}
          onClick={onConfigClick || (() => console.log('Opciones de configuración'))}
        >
          &#8942;
        </button>
      </div>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: '10px',
        borderTop: '1px solid #eee',
        marginTop: '10px',
      }}>
        {(['Almuerzo', 'Desayuno/Merienda', 'Kiosco'] as ProductCategory[]).map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              background: 'none',
              border: 'none',
              padding: '10px 15px',
              fontSize: '16px',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: '#000', // CAMBIO: Texto siempre negro
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              display: 'flex', // Para centrar el texto y el punto
              flexDirection: 'column', // Texto arriba, punto abajo
              alignItems: 'center', // Centrar horizontalmente
              gap: '5px', // Espacio entre texto y punto
            }}
          >
            {tab}
            {/* CAMBIO: Punto rojo debajo si la pestaña está activa */}
            {activeTab === tab && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#dc3545', // Rojo para el punto
                display: 'block',
              }}></span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default ProductListHeader;