// src/app/products/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

// <<-- CAMBIO AQUÍ: Importa Product y DUMMY_PRODUCTS desde el nuevo archivo de datos
import { Product, DUMMY_PRODUCTS } from '../../../data/products';


export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      const foundProduct = DUMMY_PRODUCTS.find(p => p.id === parseInt(productId as string));
      setProduct(foundProduct || null);
    }
  }, [productId]);

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <p style={{ fontSize: '18px', color: '#555' }}>Cargando producto o producto no encontrado...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`Añadir ${quantity} de ${product.name} al carrito`);
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    console.log(`Remover ${product.name} del carrito`);
    setAddedToCart(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
      <Head>
        <title>{product.name} - Buffet-ET32</title>
        <meta name="description" content={`Detalles del producto ${product.name}`} />
      </Head>

      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'white',
        borderBottom: '1px solid #eee',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }} onClick={() => router.back()}>
          &larr;
        </button>
        <div style={{ flexGrow: 1 }}></div>
        <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }} onClick={() => console.log('Opciones de producto')}>
          &#8942;
        </button>
      </header>

      <main style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '500px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxHeight: '300px', backgroundColor: '#f0f0f0' }}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
            />
          </div>

          <div style={{ padding: '20px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#FFD700', marginBottom: '20px' }}>
              ${product.price}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{
                  width: '80px',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '16px',
                }}
              />
              <span style={{ fontSize: '16px', color: '#555' }}>Cantidad</span>
            </div>

            {!addedToCart ? (
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: '#FFD700',
                  color: 'white',
                  padding: '15px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 4px 8px rgba(255,215,0,0.3)',
                }}
              >
                Añadir al carrito
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <button
                    onClick={handleRemoveFromCart}
                    style={{
                      flex: 1,
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(220,53,69,0.2)',
                    }}
                  >
                    Remover del carrito
                  </button>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFD700',
                      color: 'white',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(255,215,0,0.2)',
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
                <button
                  onClick={() => router.push('/dashboard')}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 4px 8px rgba(0,123,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  🛒 Carrito <span style={{ backgroundColor: 'white', color: '#007bff', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', fontWeight: 'bold' }}>1 producto</span> →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}