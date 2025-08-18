# 🚀 Patterns_Backend

Este proyecto es un backend básico construido con **NestJS**, **Prisma ORM** y **Supabase (PostgreSQL)**.

---

## 📦 Requisitos previos
Antes de empezar asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) >= 18  
- npm (viene con Node)

---

## 🔧 Configuración inicial

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Highkam/Patterns_Backend
   cd Patterns_Backend
2. Por favor crear inmediatamente una rama con su nombre
   ```bash
   git checkout -b nombre-de-tu-rama
3. Agregar el .env a la carpeta
  
4. Generar cliente de Prisma
   ```bash
   npx prisma generate
5. Ejecutar migraciones
   ```bash
   npx prisma migrate dev
6. Iniciar el servidor en modo desarrollo
   ```bash
   npm run start:dev
