// db/index.ts
// ¡Este archivo ya está perfecto! No necesitas cambiar nada.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Configurar el cliente de postgres
const client = postgres(process.env.DATABASE_URL, { 
  prepare: false,
});

// Crear la instancia de drizzle
export const db = drizzle(client);