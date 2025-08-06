// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Ya no necesitamos importar AuthModal aquí
// import AuthModal from '../components/auth/AuthModal';

const DashboardPage: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  // Ya no necesitamos el estado para controlar la visibilidad del modal
  // const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  // const [authModalInitialView, setAuthModalInitialView] = useState<'login' | 'register'>('login');

  // Las funciones para abrir/cerrar el modal ya no son necesarias
  // const handleOpenLoginModal = (): void => {
  //   setAuthModalInitialView('login');
  //   setShowAuthModal(true);
  // };
  // const handleOpenRegisterModal = (): void => {
  //   setAuthModalInitialView('register');
  //   setShowAuthModal(true);
  // };
  // const handleCloseAuthModal = (): void => {
  //   setShowAuthModal(false);
  // };
  // const handleLoginSuccess = (): void => {
  //   console.log('Login exitoso a través de Clerk.');
  //   setShowAuthModal(false);
  // };
  // const handleRegisterSuccess = (): void => {
  //   console.log('Registro exitoso a través de Clerk.');
  //   setShowAuthModal(false);
  // };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
      <Head>
        <title>Carrito de Compra - Buffet-ET32</title>
        <meta name="description" content="Carrito de compra del buffet del colegio ET32" />
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
        <h1 style={{ flexGrow: 1, textAlign: 'center', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          Carrito de Compra
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isLoaded && isSignedIn && (
                <span style={{ fontSize: '14px', color: '#333' }}>Hola, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</span>
            )}
            <Link href="/dashboard" style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#555' }}>
              <Image src="/cart-icon.png" alt="Cart" width={24} height={24} />
            </Link>
            {isLoaded && isSignedIn ? (
                <button
                    onClick={() => signOut(() => router.push('/'))}
                    style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                >
                    Cerrar Sesión
                </button>
            ) : (
                <>
                    <Link href="/sign-in" style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                      Iniciar Sesión
                    </Link>
                    <Link href="/sign-up" style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                      Registrarse
                    </Link>
                </>
            )}
        </div>
      </header>

      <main style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            Tu Carrito está Vacío
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
            Agrega algunos productos para empezar a comprar.
          </p>
          <Link href="/products" style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            Explorar Productos
          </Link>
        </div>
      </main>

      <footer style={{
        backgroundColor: 'white',
        padding: '16px 20px',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
      }}>
        <div>
          <span style={{ fontSize: '14px', color: '#555' }}>Total a pagar</span>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>$34</p>
        </div>
        {!isSignedIn && isLoaded ? (
            <Link href="/sign-in" style={{
                backgroundColor: '#FFD700',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(255,215,0,0.3)',
            }}>
                Continue to checkout
            </Link>
        ) : (
            <button
                onClick={() => alert('Proceder al pago (usuario logueado)')}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(76,175,80,0.3)',
                }}
            >
                Proceder al Pago
            </button>
        )}
      </footer>

      {/* --- SECCIÓN ELIMINADA: AuthModal ya no es necesario aquí ---
      {showAuthModal && (
        <AuthModal
          isVisible={showAuthModal}
          onClose={handleCloseAuthModal}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          initialView={authModalInitialView}
        />
      )}
      */}
    </div>
  );
};

export default DashboardPage;