# SAT Popayán - Sistema de Alertas Tempranas Hidrológicas (PWA)

Sistema Progresivo de Información y Alertas Tempranas para el monitoreo de subcuencas abastecedoras de agua en Popayán, Colombia (Río Molino, Palacé, Las Piedras, Cauca, Pisojé). Desarrollado con enfoque de ingeniería hidráulica y gestión del riesgo.

---

## 🛠️ Stack Tecnológico
- **Frontend / Core:** React 18 + TypeScript + Vite.
- **PWA & Offline:** `vite-plugin-pwa` con Workbox (estrategias `StaleWhileRevalidate` y `CacheFirst` para mapas OpenStreetMap).
- **Estilos:** Tailwind CSS (diseño responsivo móvil y paleta de semaforización de riesgo).
- **Cartografía:** Leaflet + React-Leaflet con centrado interactivo e indicadores visuales de caudal.
- **Iconografía:** Lucide React.

---

## 🚀 Despliegue en Vercel

El proyecto incluye el archivo `vercel.json` preconfigurado para SPA, gestión de Service Workers y caché de datos.

1. **Subir a GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "feat: PWA base SAT Popayán"
   git branch -M main
   git remote add origin <URL_DE_TU_REPOSITORIO>
   git push -u origin main
   ```

2. **Importar en Vercel:**
   - Ve a [Vercel Dashboard](https://vercel.com/new).
   - Conecta tu cuenta y selecciona el repositorio.
   - Vercel detectará automáticamente **Vite**:
     - *Build Command:* `npm run build`
     - *Output Directory:* `dist`
     - *Install Command:* `npm install`
   - Haz clic en **Deploy**.

---

## 🏛️ Hoja de Ruta Institucional (Grupo de Investigación de Ingeniería Hidráulica)

### 📌 PASO 1: Migración a Backend Central y Base de Datos (Infraestructura Base)

1. **Diseño de Base de Datos Geoespacial (PostgreSQL + PostGIS):**
   - Tabla `cuencas`: Geometrías vectoriales (polígonos SHP / GeoJSON de las cuencas hidrográficas del POT de Popayán).
   - Tabla `estaciones`: Coordenadas limnimétricas y pluviométricas.
   - Tabla `mediciones_timeseries`: Mediciones de caudal ($m^3/s$), nivel ($m$), turbiedad (NTU) y lluvia acumulada ($mm$). Particionado mensual o TimescaleDB para alto rendimiento.
   - Tabla `umbrales_alerta`: Cotas de desbordamiento (amarillo, naranja, rojo) calibradas hidrológicamente con HEC-RAS / HEC-HMS.

2. **API Backend Central (Node.js/Fastify o Python FastAPI):**
   - Endpoints REST / GraphQL: `/api/v1/subcuencas`, `/api/v1/alertas/activas`, `/api/v1/historico/:id`.
   - WebSockets o Server-Sent Events (SSE) para difusión inmediata de alertas a las PWAs ciudadanas e institucionales.
   - Autenticación JWT y RBAC (Roles: Ciudadanía, Operador Acueducto Tulcán/Palacé, Investigador/Hidrólogo, Gestión del Riesgo Municipal).

---

### 📌 PASO 2: Integración de Datos (APIs Oficiales + Sensores IoT)

1. **Ingesta de APIs Oficiales del Estado:**
   - **IDEAM:** Consulta programática de alertas hidrológicas y pronósticos meteorológicos de la estación Popayán / Aeropuerto Machángara.
   - **CRC (Corporación Autónoma Regional del Cauca):** Integración de boletines hidrológicos y datos de concesiones hídricas.
   - **Acueducto y Alcantarillado de Popayán (AAPSA):** Lecturas de bocatomas (Molino y Palacé).

2. **Red de Telemetría IoT en Cuencas Altas:**
   - **Protocolo de Comunicación:** Nodos microcontroladores (ESP32 / LoRaWAN o GSM/4G SIM) en zonas con baja cobertura satelital.
   - **Sensores:**
     - Ultrasonido / Radar para nivel de lámina de agua.
     - Pluviómetros de balancín para intensidad de precipitación en tiempo real.
     - Sensores de conductividad y turbiedad para alertar sobre flujos de escombros.
   - **Broker MQTT Central:** Receptor de telemetría de sensores, validación de integridad, filtros de ruido (media móvil) y disparador automático de niveles de alerta en la base de datos.
