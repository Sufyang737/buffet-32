// src/app/components/products/ProductListView.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '../../data/products'; // Importa Product desde el archivo de datos

interface ProductListViewProps {
  products: Product[];
}

const ProductListView: React.FC<ProductListViewProps> = ({ products }) => {
  return (
    <main style={{
      flexGrow: 1,
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '10px', // CAMBIO: Espacio entre los items de la cuadrícula, reducido de 15px a 10px
      overflowY: 'auto',
      justifyContent: 'center',
    }}>
      {products.map(product => (
        <div key={product.id} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}>
          <Link href={`/products/${product.id}`} style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            maxHeight: '150px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            textDecoration: 'none',
          }} onMouseOver={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'} onMouseOut={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </Link>
          <div style={{
            padding: '8px 0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '2px' }}>{product.name}</h3>
            <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>${product.price}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ProductListView;