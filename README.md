# Amparo & Company 💜

> La matriz digital de soluciones conectadas

Landing page del ecosistema **Amparo & Co.**, un conjunto de aplicaciones y servicios digitales diseñados para funcionar de forma modular, escalable y conectada.

🌐 **[www.amparoandcompany.com](https://www.amparoandcompany.com)**

---

## 🚀 Servicios

| Servicio | Estado | Descripción |
|----------|--------|-------------|
| 💕 **ValePorMil** | ✅ Activo | Vales de amor canjeables |
| 🍳 **La Cocina de Amparo** | ✅ Activo | Recetario inteligente con selector de menú |
| 🎁 **Regalos** | 🟡 Próximamente | Listas de deseos compartidas |
| ⭐ **Recomendaciones** | 🟣 Idea | Lo mejor según Amparo |
| 📅 **Agenda** | 🟣 Idea | Fechas importantes y recordatorios |
| 💳 **Cuentas** | 🟣 Idea | Gastos compartidos sin líos |
| 📷 **Momentos** | 🟣 Idea | Álbum familiar privado |

---

## 📁 Estructura

```
├── index.html          # Landing page principal
├── js/
│   └── services.js     # Gestión centralizada de servicios
├── CNAME               # Dominio personalizado (GitHub Pages)
└── README.md
```

---

## ⚙️ Funcionalidades

- **Renderizado dinámico**: Todas las secciones (cards, accesos, matriz) se generan desde un único array de servicios
- **Ping automático**: Comprueba el estado de los servicios activos al cargar la página
- **Indicadores de estado**: Badges y puntos que cambian de color según disponibilidad
- **Matriz visual**: Visualización tipo hub con conexiones SVG animadas
- **Modal de servicios**: Vista completa de todos los servicios disponibles
- **Diseño responsive**: Adaptado a móvil, tablet y escritorio

---

## 🛠️ Tecnologías

- HTML5
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- Vanilla JavaScript (ES6+)
- SVG para conexiones visuales
- GitHub Pages para hosting

---

## 📝 Cómo añadir un servicio

Edita el array `services` en `js/services.js`:

```javascript
{
  id: 'nuevo',           // Identificador único
  title: 'Nuevo Servicio',
  short: 'Nuevo',        // Nombre corto para la matriz
  url: 'https://...',    // URL del servicio (vacío si no está activo)
  state: 'active',       // 'active' | 'soon' | 'idea'
  icon: '🆕',            // Emoji representativo
  color: 'cyan',         // pink | rose | orange | yellow | cyan | emerald | violet
  desc: 'Descripción del servicio',
  tags: ['Tag1', 'Tag2']
}
```

---

## 📄 Licencia

Proyecto privado de Amparo & Company.

---

<p align="center">
  Hecho con 💜 por <strong>Amparo & Co.</strong>
</p>