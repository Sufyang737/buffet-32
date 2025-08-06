// src/app/products/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react'; // Agregamos useEffect
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import ProductListHeader, { ProductCategory } from '@/components/products/ProductListHeader';
import ProductListView from '@/components/products/ProductListView';
import { Product, DUMMY_PRODUCTS } from '@/data/products'; // Usando la ruta relativa que te funcionó

export default function ProductsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Almuerzo');

  const filteredProducts = useMemo(() => {
    const products = DUMMY_PRODUCTS.filter(product => product.category === activeCategory);
    console.log('Categoría activa:', activeCategory);
    console.log('Productos filtrados:', products); // <<-- AÑADIDO PARA DEPURACIÓN
    return products;
  }, [activeCategory]);

  // <<-- AÑADIDO PARA DEPURACIÓN: Verifica los productos una vez que se montan
  useEffect(() => {
    console.log('DUMMY_PRODUCTS cargados:', DUMMY_PRODUCTS);
    if (DUMMY_PRODUCTS.length === 0) {
      console.warn('Advertencia: DUMMY_PRODUCTS está vacío. Asegúrate de que src/data/products.ts tenga datos.');
    }
  }, []);


  const renderHeader = () => {
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
            onClick={() => console.log('Opciones de configuración')}
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
              onClick={() => setActiveCategory(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 15px',
                fontSize: '16px',
                fontWeight: activeCategory === tab ? 'bold' : 'normal',
                color: '#000',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {tab}
              {activeCategory === tab && (
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#dc3545',
                  display: 'block',
                }}></span>
              )}
            </button>
          ))}
        </nav>
      </header>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
      <Head>
        <title>Productos - Buffet-ET32</title>
        <meta name="description" content="Lista de productos del buffet del colegio ET32" />
      </Head>

      {renderHeader()}

      <ProductListView products={filteredProducts} />
    </div>
  );
}