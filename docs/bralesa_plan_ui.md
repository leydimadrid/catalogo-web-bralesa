# PLAN DE DESARROLLO - GALERÍA VISUAL BRALESA

## ✅ Checklist de Avances y Pendientes (actualizado 16/07/2025)

### Avances

- [x] Identidad visual definida: paleta de colores, tipografía y estilo visual
- [x] Diseño mobile-first y grid responsive implementado
- [x] Cards con sombras, bordes redondeados y gradientes
- [x] Layout principal, Header y Footer implementados
- [x] Página principal con grid de productos destacados y nuevos
- [x] Grid de categorías visual y ordenada
- [x] Tarjeta de producto con imagen, precio, material y estado
- [x] Loader en Remix para productos y categorías
- [x] Consulta y ordenación por campo order en categorías
- [x] Relación producto-categoría funcional
- [x] Diseño mobile-first y grid responsive

### Pendientes

- [x] Página de detalle de producto con galería de imágenes
- [x] Integración WhatsApp con mensaje pre-llenado
- [x] Botón de compartir producto
- [x] Filtros por categoría, precio, material, disponibilidad
- [x] Búsqueda simple en catálogo
- [x] Indicadores visuales de stock
- [ ] Subida de imágenes a Cloudinary desde la UI
- [ ] Optimización de performance y carga de imágenes
- [ ] Validación de datos y diseño
- [ ] Meta tags y SEO básico

## Catálogo de Accesorios Femeninos

---

## 🎨 **IDENTIDAD VISUAL Y DISEÑO**

### **Paleta de Colores (basada en tu logo)**

- **Principal:** Rosa coral (#E06B8A) - del logo
- **Secundarios:**
  - Rosa claro (#F4E6E9)
  - Blanco (#FFFFFF)
  - Dorado suave (#F5E6D3)
  - Gris claro (#F8F8F8)
- **Acentos:** Dorado metálico (#D4AF37) para precios y CTAs

### **Tipografía**

- **Primaria:** Inter (legible en móvil)
- **Secundaria:** Playfair Display (para títulos elegantes)
- **Tamaños:** Mobile-first, mínimo 16px para texto base

### **Estilo Visual Inspirado en Floripondia**

- Cards con sombras suaves
- Bordes redondeados (8px)
- Espaciado generoso
- Iconografía minimalista
- Gradientes sutiles

---

## 📱 **ARQUITECTURA DE INFORMACIÓN**

### **Estructura de Navegación**

```
🏠 Home
├── 💍 Anillos
├── 👂 Aretes
├── ⚪ Topitos
├── 🔗 Cadenas
├── 📿 Pulseras
├── 👨 Hombres
├── 💎 Sets de Anillos
├── 🌟 Sets de Aretes
├── 🔘 Piercings
├── 👂 Ear Cuff
├── 🎁 Juegos de Accesorios
└── 📿 Collares
```

### **Flujo de Usuario Principal**

1. **Inicio** → Grid de categorías + productos destacados
2. **Categoría** → Grid de productos filtrable
3. **Producto** → Galería + detalles + WhatsApp
4. **Contacto** → WhatsApp con mensaje pre-llenado

---

## 🏗️ **WIREFRAMES Y FUNCIONALIDADES**

### **1. Página Principal**

```
┌─────────────────────────────┐
│  🌸 Bralesa Logo            │
│  [🔍 Buscar]               │
├─────────────────────────────┤
│  ⭐ PRODUCTOS DESTACADOS    │
│  [📱][💍][👂][🔗]         │
├─────────────────────────────┤
│  📂 CATEGORÍAS             │
│  [Anillos] [Aretes] [...]  │
├─────────────────────────────┤
│  🆕 NUEVOS PRODUCTOS        │
│  [Grid 2x2 productos]      │
└─────────────────────────────┘
```

### **2. Página de Categoría**

```
┌─────────────────────────────┐
│  ← Anillos (45 productos)   │
│  [🔍] [💰 Precio] [📏 Talla]│
├─────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │ 📷  │ │ 📷  │ │ 📷  │    │
│  │$25k │ │$30k │ │$35k │    │
│  │⚡️   │ │🔄   │ │❌   │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │ ... │ │ ... │ │ ... │    │
│  └─────┘ └─────┘ └─────┘    │
└─────────────────────────────┘
```

### **3. Página de Producto**

```
┌─────────────────────────────┐
│  ← Anillo Corona Dorado     │
├─────────────────────────────┤
│  ┌─────────────────────────┐ │
│  │     📷 Imagen Ppal      │ │
│  │   [• • • • •] dots     │ │
│  └─────────────────────────┘ │
├─────────────────────────────┤
│  💎 Anillo Corona Dorado    │
│  💰 $28.000                 │
│  ⚡️ Disponible inmediato   │
│  📏 Talla 6, 7, 8          │
│  🔗 Material: Acero dorado  │
├─────────────────────────────┤
│  [💬 Contactar WhatsApp]    │
│  [📤 Compartir]            │
├─────────────────────────────┤
│  🔄 Más productos similares │
│  [Grid 2x2]                │
└─────────────────────────────┘
```

---

## 🛠️ **ESPECIFICACIONES TÉCNICAS**

### **Base de Datos (Supabase)**

```sql
-- Tabla: categories
id, name, slug, image_url, order

-- Tabla: products
id, name, slug, price, description, material,
sizes, status, category_id, featured, created_at

-- Tabla: product_images
id, product_id, image_url, alt_text, order

-- Tabla: inventory_status
- available (⚡️ Disponible)
- on_order (🔄 Bajo pedido)
- low_stock (⚠️ Pocas unidades)
- out_of_stock (❌ Agotado)
```

### **Stack Tecnológico**

- **Frontend:** Remix + React
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase
- **Imágenes:** Cloudinary
- **Hosting:** Vercel
- **Administración:** Prisma Studio

---

## 🎯 **FUNCIONALIDADES DETALLADAS**

### **1. Sistema de Filtros**

- **Por precio:** $0-20k, $20-40k, $40k+
- **Por disponibilidad:** Inmediato, Bajo pedido
- **Por material:** Acero, Oro, Plata, Fantasía
- **Por talla:** (para anillos/pulseras)
- **Por color:** Dorado, Plateado, Rosado

### **2. Indicadores de Stock**

- ⚡️ **Disponible:** Verde - Entrega inmediata
- 🔄 **Bajo pedido:** Amarillo - 3-5 días
- ⚠️ **Pocas unidades:** Naranja - Solo X disponibles
- ❌ **Agotado:** Rojo - No disponible

### **3. WhatsApp Integration**

```javascript
// Mensaje pre-llenado
const whatsappMessage = `Hola! Me interesa el ${productName} 
que vi en tu catálogo 💎

Precio: ${price}
Referencia: ${productId}

¿Está disponible? 🤔`;

const whatsappURL = `https://wa.me/573XX?text=${encodeURIComponent(
  whatsappMessage
)}`;
```

### **4. Función Screenshot Optimizada**

- Meta tags para compartir en redes
- Diseño limpio para capturas
- Información visible: producto, precio, contacto
- Botón nativo de compartir

---

## 🛠️ **ADMINISTRACIÓN CON PRISMA STUDIO**

### **Ventajas de Prisma Studio:**

- **Interface CRUD automática:** Sin necesidad de desarrollar panel personalizado
- **Actualización simple:** Perfect para 2 actualizaciones/mes
- **Tiempo optimizado:** Más desarrollo en catálogo, menos en administración
- **Costo $0:** Incluido en el stack tecnológico

### **Workflow de Administración:**

```
1. 📦 Llegan productos nuevos del proveedor
2. 📸 Subes imágenes a Cloudinary
3. 🖥️ Abres Prisma Studio (interfaz web)
4. ➕ Crear/editar productos directo en la DB
5. ✅ Productos aparecen automáticamente en catálogo
```

### **Estructura de Datos en Prisma Studio:**

```
📂 Products
├── ✏️ Crear nuevo producto
├── 📝 Editar producto existente
├── 🗑️ Eliminar producto
└── 🔍 Filtrar y buscar productos

📂 Categories
├── ✏️ Gestionar categorías
├── 📊 Ordenar prioridades
└── 🖼️ Asignar imágenes de categoría
```

### **Datos que gestionarás:**

- **Información básica:** Nombre, precio, descripción
- **Clasificación:** Categoría, material, tallas, colores
- **Inventario:** Status (disponible/pedido/agotado)
- **Imágenes:** URLs de Cloudinary
- **Destacados:** Marcar productos para homepage

---

## 🚀 **ROADMAP DE DESARROLLO REVISADO**

### **PRIORIDAD: 100% CATÁLOGO VISUAL**

### **FASE 1: Catálogo Core (Semanas 1-3)**

**Objetivos:**

- Setup Remix + Supabase + Prisma
- Diseño visual base con identidad Bralesa
- Grid de productos responsive
- Páginas de detalle con galería

**Entregables:**

- [ ] Proyecto configurado (Remix + Supabase)
- [ ] Prisma Studio configurado
- [ ] Diseño base implementado con tu paleta
- [ ] Logo Bralesa integrado
- [ ] Grid responsive 2x2 móvil, 4x4 desktop
- [ ] Páginas de producto con galería múltiple

### **FASE 2: Funcionalidad Usuario (Semanas 4-5)**

**Objetivos:**

- Sistema de categorías (12 categorías)
- Filtros funcionales
- WhatsApp integration
- Función compartir optimizada

**Entregables:**

- [ ] Navegación por categorías
- [ ] Filtros: precio, material, disponibilidad
- [ ] WhatsApp con mensaje pre-llenado
- [ ] Screenshots optimizados para redes
- [ ] Indicadores de stock visual
- [ ] Búsqueda básica

### **FASE 3: Optimización Final (Semana 6)**

**Objetivos:**

- Performance mobile
- SEO para redes sociales
- Testing completo
- Deploy producción

**Entregables:**

- [ ] Optimización imágenes Cloudinary
- [ ] Meta tags para compartir
- [ ] Mobile testing completo
- [ ] SEO básico implementado
- [ ] Deploy final en Vercel
- [ ] Prisma Studio en producción

---

## 🎯 **ENFOQUE SIMPLIFICADO**

### **Lo que SÍ vamos a desarrollar:**

✅ **Catálogo visual perfecto**
✅ **Experiencia móvil fluida**
✅ **WhatsApp integration**
✅ **Función compartir**
✅ **Filtros intuitivos**

### **Lo que NO necesitamos desarrollar:**

❌ Panel administración personalizado
❌ Dashboard analytics complejo
❌ Sistema de usuarios
❌ Carrito de compras
❌ Proceso de checkout

### **Administración simplificada:**

🛠️ **Prisma Studio** para gestión de productos
📸 **Cloudinary** para gestión de imágenes
📊 **Analytics básico** con herramientas gratuitas (Google Analytics)

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints**

- **Mobile:** 320px - 767px (prioridad)
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

### **Layout Mobile-First**

```css
/* Mobile: 2 columnas */
.product-grid {
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* Tablet: 3 columnas */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

/* Desktop: 4 columnas */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
```

---

## 🎨 **COMPONENTES DE DISEÑO**

### **Product Card**

```jsx
<div className="bg-white rounded-lg shadow-sm overflow-hidden">
  <div className="relative">
    <img src={product.image} alt={product.name} />
    <div className="absolute top-2 right-2">
      <StatusBadge status={product.status} />
    </div>
  </div>
  <div className="p-3">
    <h3 className="font-medium text-gray-900">{product.name}</h3>
    <p className="text-pink-600 font-bold">${product.price}</p>
    <p className="text-xs text-gray-500">{product.material}</p>
  </div>
</div>
```

### **Category Button**

```jsx
<button className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <span className="mt-2 text-sm font-medium">{category.name}</span>
</button>
```

---

## 📋 **CHECKLIST PRE-LANZAMIENTO**

### **Catálogo Visual**

- [ ] 360 productos cargados via Prisma Studio
- [ ] Imágenes optimizadas en Cloudinary
- [ ] 12 categorías organizadas
- [ ] Precios actualizados
- [ ] Descripciones completas
- [ ] Grid responsive perfecto

### **Funcionalidad Usuario**

- [ ] Filtros funcionando correctamente
- [ ] WhatsApp links activos con mensaje pre-llenado
- [ ] Función compartir en redes sociales
- [ ] Búsqueda operativa
- [ ] Indicadores de stock visibles
- [ ] Navegación fluida entre categorías

### **Performance y SEO**

- [ ] Carga < 3 segundos en móvil
- [ ] Imágenes optimizadas Cloudinary
- [ ] Mobile responsive perfecto
- [ ] Meta tags para compartir
- [ ] SEO básico implementado

### **Administración**

- [ ] Prisma Studio configurado
- [ ] Workflow de actualización documentado
- [ ] Cloudinary configurado para imágenes
- [ ] Base de datos poblada
- [ ] Testing admin completo

---

## 🎯 **MÉTRICAS DE ÉXITO POST-LANZAMIENTO**

### **Semana 1 - Validación**

- [ ] 100+ productos vistos
- [ ] 10+ contactos vía WhatsApp
- [ ] 5+ productos compartidos en redes
- [ ] 0 errores críticos móvil
- [ ] Navegación fluida reportada

### **Mes 1 - Impacto**

- [ ] 50% reducción en consultas repetitivas
- [ ] 20+ conversiones desde catálogo
- [ ] Feedback positivo de clientas
- [ ] Tiempo de administración < 1h/semana
- [ ] Aumento en productos visualizados por sesión

### **Mes 3 - Consolidación**

- [ ] Catálogo como fuente principal de ventas
- [ ] Proceso de actualización automatizado
- [ ] Analytics básicos implementados
- [ ] Plan de escalamiento definido

---

## 💡 **CARACTERÍSTICAS ADICIONALES FUTURAS**

### **Fase 2 (Post-MVP)**

- **Wishlist:** Guardar productos favoritos
- **Comparar:** Comparar productos similares
- **Recomendaciones:** "Quienes vieron esto también..."
- **Blog:** Tips de uso y cuidado
- **Reviews:** Testimonios de clientas

### **Fase 3 (Escalamiento)**

- **Multi-idioma:** Inglés para exportar
- **Geolocalización:** Tiempos de entrega
- **Integración Instagram:** Catálogo en redes
- **Analytics avanzado:** Heatmaps, conversiones
- **Programa afiliados:** Influencers

---

## 🚀 **DEPLOY EN NETLIFY (GUÍA RÁPIDA)**

1. **Sube tu código a GitHub**  
   Asegúrate de tener el proyecto en un repositorio.

2. **Crea una cuenta en [Netlify](https://netlify.com)**  
   (o inicia sesión).

3. **Nuevo sitio desde Git**

   - Haz clic en "Add new site" → "Import an existing project".
   - Elige GitHub y selecciona tu repositorio.

4. **Configura los parámetros de build**

   - **Build command:**
     ```
     npm run build
     ```
   - **Publish directory:**
     ```
     public
     ```
   - Si usas Remix con adaptador Netlify, asegúrate de tener instalado `@remix-run/netlify` y tu `remix.config.js` debe tener:
     ```js
     // remix.config.js
     export default {
       // ...existing config...
       serverBuildTarget: "netlify",
     };
     ```
   - En `package.json` agrega:
     ```json
     "scripts": {
       "build": "remix build"
     }
     ```

5. **Variables de entorno**

   - Agrega tus variables (por ejemplo, claves de Supabase, Cloudinary, etc.) en la sección "Site settings" → "Environment variables".

6. **Deploy**

   - Haz clic en "Deploy site".
   - Netlify instalará dependencias, construirá y publicará tu web automáticamente.

7. **Listo**
   - Tu catálogo estará disponible en la URL que te da Netlify.

---

**Notas:**

- Si usas rutas dinámicas o SSR, revisa la [documentación Remix + Netlify](https://remix.run/docs/en/main/deployment/netlify).
- Para cambios futuros, solo haz push a tu rama principal y Netlify redeployará automáticamente.
