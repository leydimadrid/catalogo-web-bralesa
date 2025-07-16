# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Catálogo Visual de Accesorios Femeninos

---

## 🎯 **RESUMEN EJECUTIVO**

**Problema:** Actualmente muestro mis accesorios por WhatsApp enviando múltiples imágenes sin precios, creando una experiencia caótica para las clientas y consumiendo mucho tiempo respondiendo consultas básicas.

**Solución:** Galería visual feminina y delicada donde las clientas pueden explorar todos los productos con precios, tomar screenshots y contactarme directamente para pedidos.

**Objetivo:** Aumentar ventas y reducir tiempo en consultas repetitivas, manteniendo el contacto directo personal.

---

## 👥 **USUARIO OBJETIVO**

**Perfil Principal:**

- **Edad:** 18-40 años
- **Comportamiento:** Descubren productos por redes sociales, alta comodidad tecnológica
- **Dispositivo:** Principalmente móvil
- **Proceso actual:** Ven stories → Preguntan precio/referencias → Deciden → Hacen pedido

**Necesidades del usuario:**

- Ver productos con precios inmediatamente
- Explorar referencias similares fácilmente
- Proceso simple para contactar y hacer pedidos
- Experiencia visual atractiva y femenina

---

## 🔍 **ANÁLISIS DE REFERENCIA**

**Inspiración:** [antojateaqui.com](https://antojateaqui.com/)

- Grid visual limpio
- Categorías claras
- Información de producto accesible
- Diseño apetitoso y atractivo

**Adaptación para tu caso:**

- Estética femenina y delicada
- Optimizado para móvil
- Integración directa con WhatsApp
- Sin carrito de compras (solo contacto)

---

## ⚡ **CARACTERÍSTICAS PRINCIPALES (MVP)**

### **1. Galería Visual Categorizada**

- **12 categorías** de accesorios
- **~30 productos** por categoría (360 productos total)
- Grid responsivo optimizado para móvil
- Imágenes de alta calidad
- Precio visible en cada producto

### **2. Página de Detalle de Producto**

- Imagen principal del accesorio
- Nombre y precio destacados
- Indicador de disponibilidad
- Botón "Contactar por WhatsApp" con mensaje pre-llenado
- Botón "Compartir" para screenshots fáciles

### **3. Sistema de Contacto Directo**

- **WhatsApp integrado** con mensaje: "Hola! Me interesa el [nombre del producto] que vi en tu catálogo"
- **Función screenshot optimizada** para compartir productos
- Sin carrito ni checkout (solo contacto)

### **4. Navegación Intuitiva**

- Filtros por categoría
- Búsqueda simple
- Sección "Más referencias de esta categoría"
- Navegación rápida entre productos

---

## 🎨 **ESPECIFICACIONES DE DISEÑO**

### **Estética Visual:**

- **Paleta:** Tonos pasteles, rosa suave, dorado, blanco
- **Tipografía:** Elegante y legible en móvil
- **Iconografía:** Femenina y delicada
- **Layout:** Grid tipo Pinterest, cards con sombras suaves

### **Experiencia Móvil:**

- **Mobile-first design**
- Touch-friendly buttons
- Scroll infinito o paginación simple
- Imágenes que se adapten a pantalla

---

## 🛠️ **ESPECIFICACIONES TÉCNICAS**

### **Stack Tecnológico (100% Gratuito):**

- **Frontend/Backend:** Remix (tu conocimiento existente)
- **Base de datos:** Supabase (500MB gratis)
- **Hosting:** Vercel (plan gratuito)
- **Imágenes:** Cloudinary (25GB gratis)
- **Estilos:** Tailwind CSS

### **Funcionalidades Técnicas:**

- **Panel de administración** con Prisma Studio
- **Subida de imágenes** drag & drop
- **Actualización manual** 2x por mes (productos nuevos)
- **SEO básico** para redes sociales

---

## 📊 **MÉTRICAS DE ÉXITO**

### **Indicadores Principales:**

- **Reducción en consultas repetitivas** (menos mensajes sobre precios)
- **Aumento en conversiones** (más pedidos por cliente)
- **Tiempo ahorrado** en responder consultas básicas
- **Engagement** (tiempo en la galería, productos vistos)

### **Métricas Técnicas:**

- Tiempo de carga < 3 segundos
- Experiencia fluida en móvil
- Disponibilidad 99%+

---

## 🚀 **ROADMAP DE DESARROLLO**

### **Fase 1: MVP (4-6 semanas)**

- Setup básico Remix + Supabase
- Galería de productos funcional
- Sistema de categorías
- Integración WhatsApp básica

### **Fase 2: Optimización (2-3 semanas)**

- Mejoras de diseño y UX
- Panel de administración
- Performance y SEO

### **Fase 3: Futuro (Post-MVP)**

- Analytics básicos
- Funcionalidades avanzadas
- Preparación para e-commerce

---

## 🎯 **CASOS DE USO PRINCIPALES**

### **Caso 1: Clienta explora productos**

1. Entra a la galería desde Instagram
2. Navega por categorías
3. Ve precio inmediatamente
4. Toma screenshot del producto
5. Contacta por WhatsApp

### **Caso 2: Clienta busca más referencias**

1. Ve unos aretes de topito que le gustan
2. Hace clic en "Ver más aretes de topito"
3. Explora todas las referencias disponibles en esa categoría
4. Selecciona varios estilos diferentes
5. Contacta con múltiples opciones para decidir

### **Caso 3: Administración de productos**

1. Llegan productos nuevos del proveedor
2. Subes fotos a Cloudinary
3. Agregas producto en Prisma Studio
4. Producto visible inmediatamente

---

## 📝 **REQUISITOS ESPECÍFICOS**

### **Funcionalidad Screenshot:**

- Páginas optimizadas para compartir en redes sociales
- Información clara y visible en captures de pantalla
- Botones de compartir nativos del dispositivo

### **Integración WhatsApp:**

- Enlaces directos con mensaje pre-llenado
- Información del producto incluida automáticamente
- Número de contacto configurable

### **Administración:**

- Interface simple para agregar/editar productos
- Gestión de categorías
- Control de disponibilidad de productos

### **Performance:**

- Carga rápida en conexiones móviles
- Imágenes optimizadas automáticamente
- Navegación fluida entre categorías

---

## 🔧 **LIMITACIONES Y RESTRICCIONES**

### **Recursos:**

- Presupuesto: $0 (solo herramientas gratuitas)
- Tiempo: 10 horas semanales
- Equipo: 1 persona (desarrollo y contenido)

### **Técnicas:**

- Sin procesamiento de pagos
- Sin carrito de compras
- Sin usuarios registrados
- Administración manual de inventario

### **Alcance:**

- No es e-commerce (solo catálogo)
- No maneja logística ni entregas
- No tiene sistema de reviews
- No incluye chat en tiempo real

---

## ✅ **CRITERIOS DE ACEPTACIÓN**

### **MVP Completo cuando:**

- [ ] Galería muestra todos los productos con precios
- [ ] Categorías funcionan correctamente
- [ ] Botón WhatsApp funciona con mensaje pre-llenado
- [ ] Página responsive en móvil
- [ ] Panel de administración operativo
- [ ] Screenshots se ven correctamente
- [ ] Tiempo de carga < 3 segundos
- [ ] Hosting gratuito funcionando

### **Éxito del producto cuando:**

- [ ] Clientas navegan sin preguntar precios básicos
- [ ] Reducción del 50% en consultas repetitivas
- [ ] Aumento en productos vistos por clienta
- [ ] Feedback positivo sobre la experiencia

---

**Documento creado:** Julio 2025  
**Versión:** 1.0  
**Próxima revisión:** Post-MVP
