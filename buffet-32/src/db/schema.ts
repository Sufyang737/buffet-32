// db/schema.ts

import { pgTable, serial, varchar, text, decimal, date, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

// --- TABLAS PRINCIPALES ---

export const sucursales = pgTable('sucursales', {
  sucursal_id: serial('sucursal_id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  direccion: varchar('direccion', { length: 255 }),
  telefono: varchar('telefono', { length: 20 }),
});

export const categorias = pgTable('categorias', {
  categoria_id: serial('categoria_id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
});

export const clientes = pgTable('clientes', {
  cliente_id: serial('cliente_id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  telefono: varchar('telefono', { length: 20 }),
  puntos: integer('puntos').default(0),
});

export const productos = pgTable('productos', {
  producto_id: serial('producto_id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  descripcion: text('descripcion'),
  precio: decimal('precio', { precision: 10, scale: 2 }).notNull(),
  imagen: varchar('imagen', { length: 255 }),
  categoria_id: integer('categoria_id').references(() => categorias.categoria_id),
});

export const ordenes = pgTable('ordenes', {
  orden_id: serial('orden_id').primaryKey(),
  cliente_id: integer('cliente_id').references(() => clientes.cliente_id).notNull(),
  fecha_orden: date('fecha_orden').defaultNow(),
  estado: varchar('estado', { length: 50 }).default('pendiente'), // ej: pendiente, completado, cancelado
});

// --- TABLAS DE RELACIÓN Y REGISTROS ---

export const recaudaciones = pgTable('recaudaciones', {
  recaudacion_id: serial('recaudacion_id').primaryKey(),
  sucursal_id: integer('sucursal_id').references(() => sucursales.sucursal_id).notNull(),
  monto_recaudado: decimal('monto_recaudado', { precision: 10, scale: 2 }).notNull(),
  fecha_recaudacion: date('fecha_recaudacion').defaultNow(),
});

export const cupones = pgTable('cupones', {
  cupon_id: serial('cupón_id').primaryKey(),
  orden_id: integer('ordenes_id').references(() => ordenes.orden_id), // Un cupón puede estar ligado a una orden
  codigo: varchar('codigo', { length: 255 }).unique().notNull(),
  descuento: decimal('descuento', { precision: 5, scale: 2 }).notNull(), // ej: 15.50 (representa %)
  fecha_vencimiento: date('fecha_vencimiento'),
});

export const carritos = pgTable('carritos', {
  carrito_id: serial('carrito_id').primaryKey(),
  cliente_id: integer('cliente_id').references(() => clientes.cliente_id).notNull(),
  producto_id: integer('producto_id').references(() => productos.producto_id).notNull(),
  cantidad: integer('cantidad').notNull(),
});

// Tabla intermedia para la relación Muchos-a-Muchos entre Ordenes y Productos
export const ordenes_productos = pgTable('ordenes_productos', {
  orden_id: integer('orden_id').references(() => ordenes.orden_id).notNull(),
  producto_id: integer('producto_id').references(() => productos.producto_id).notNull(),
  cantidad: integer('cantidad').notNull(),
}, (table) => {
  return {
    // Clave primaria compuesta para asegurar que no se repita el mismo producto en la misma orden
    pk: primaryKey({ columns: [table.orden_id, table.producto_id] }),
  }
});

export const pagos = pgTable('pagos', {
  pago_id: serial('pago_id').primaryKey(),
  cliente_id: integer('cliente_id').references(() => clientes.cliente_id).notNull(),
  monto: decimal('monto', { precision: 10, scale: 2 }).notNull(),
  fecha_pago: date('fecha_pago').defaultNow(),
});

export const reservas = pgTable('reservas', {
  reserva_id: serial('reserva_id').primaryKey(),
  sucursal_id: integer('sucursal_id').references(() => sucursales.sucursal_id).notNull(),
  cliente_id: integer('cliente_id').references(() => clientes.cliente_id).notNull(),
  fecha_reserva: date('fecha_reserva').notNull(),
});

export const carritos_abandonados = pgTable('carritos_abandonados', {
  carrito_abandonado_id: serial('carrito_abandonado_id').primaryKey(),
  cliente_id: integer('cliente_id').references(() => clientes.cliente_id).notNull(),
  fecha_abandono: date('fecha_abandono').defaultNow(),
});


// --- RELACIONES (OPCIONAL PERO MUY RECOMENDADO) ---

export const sucursalesRelations = relations(sucursales, ({ many }) => ({
  reservas: many(reservas),
  recaudaciones: many(recaudaciones),
}));

export const categoriasRelations = relations(categorias, ({ many }) => ({
  productos: many(productos),
}));

export const clientesRelations = relations(clientes, ({ many }) => ({
  ordenes: many(ordenes),
  pagos: many(pagos),
  reservas: many(reservas),
  carritos: many(carritos),
  carritos_abandonados: many(carritos_abandonados),
}));

export const productosRelations = relations(productos, ({ one }) => ({
  categoria: one(categorias, {
    fields: [productos.categoria_id],
    references: [categorias.categoria_id],
  }),
}));

export const ordenesRelations = relations(ordenes, ({ one, many }) => ({
  cliente: one(clientes, {
    fields: [ordenes.cliente_id],
    references: [clientes.cliente_id],
  }),
  ordenes_productos: many(ordenes_productos),
}));

export const ordenesProductosRelations = relations(ordenes_productos, ({ one }) => ({
  orden: one(ordenes, {
    fields: [ordenes_productos.orden_id],
    references: [ordenes.orden_id],
  }),
  producto: one(productos, {
    fields: [ordenes_productos.producto_id],
    references: [productos.producto_id],
  }),
}));