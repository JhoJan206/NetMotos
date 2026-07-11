import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Lanzamientos', 'Guías', 'Normativa', 'Noticias', 'Deportes', 'Seguridad Vial']),
    date: z.string(),
    excerpt: z.string(),
    cover_image: z.string().optional(),
    author: z.string().default('Jhojan Jacome'),
  }),
})

const motos = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    marca: z.string(),
    modelo: z.string(),
    nombre_completo: z.string(),
    anio: z.number().default(2024),
    tipo: z.string(),
    cilindraje: z.number(),
    potencia_hp: z.number(),
    potencia_rpm: z.number(),
    torque_nm: z.number(),
    torque_rpm: z.number(),
    alimentacion: z.string(),
    encendido: z.string(),
    arranque: z.string(),
    transmision: z.string(),
    combustible: z.string(),
    capacidad_tanque_l: z.number(),
    consumo_km_l: z.number(),
    peso_kg: z.number(),
    altura_asiento_mm: z.number(),
    distancia_suelo_mm: z.number(),
    suspension_delantera: z.string(),
    suspension_trasera: z.string(),
    freno_delantero: z.string(),
    freno_trasero: z.string(),
    llanta_delantero: z.string(),
    llanta_trasero: z.string(),
    precio_cop: z.number(),
    imagen: z.string().optional(),
    pros: z.array(z.string()),
    contras: z.array(z.string()),
    rating: z.number(),
  }),
})

export const collections = { blog, motos }
