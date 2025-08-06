// db/actions.ts

import { db } from './index';
import { sucursales, productos, categorias } from './schema';
import { eq } from 'drizzle-orm';

// --- Ejemplo de Consultas (SELECT) ---

/**
 * Obtiene todas las sucursales.
 */
export async function getSucursales() {
  try {
    const todasLasSucursales = await db.select().from(sucursales);
    console.log('Sucursales encontradas:', todasLasSucursales);
    return todasLasSucursales;
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    throw error;
  }
}

/**
 * Obtiene productos filtrados por una categoría específica.
 * @param categoriaId - El ID de la categoría por la cual filtrar.
 */
export async function getProductosPorCategoria(categoriaId: number) {
  try {
    const productosEncontrados = await db.select()
      .from(productos)
      .where(eq(productos.categoria_id, categoriaId));
      
    console.log(`Productos para la categoría ${categoriaId}:`, productosEncontrados);
    return productosEncontrados;
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
}

// --- Ejemplo de Inserciones (INSERT) ---

type NuevaSucursal = typeof sucursales.$inferInsert;

/**
 * Crea una nueva sucursal en la base de datos.
 * @param data - Los datos de la nueva sucursal.
 */
export async function createSucursal(data: NuevaSucursal) {
  try {
    const nuevaSucursal = await db.insert(sucursales)
      .values(data)
      .returning(); // .returning() te devuelve el objeto insertado
      
    console.log('Sucursal creada:', nuevaSucursal[0]);
    return nuevaSucursal[0];
  } catch (error) {
    console.error('Error al crear la sucursal:', error);
    throw error;
  }
}

// Puedes seguir añadiendo aquí más funciones para crear, leer, actualizar y borrar (CRUD)
// para el resto de tus tablas (clientes, ordenes, etc.).