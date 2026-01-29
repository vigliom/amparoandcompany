document.addEventListener('DOMContentLoaded', async () => {
  // Services array - edit here to add/modify services
  const services = [
    { id: 'vales', title: 'ValePorMil', short: 'Vales', url: 'https://canjearvales.amparoandcompany.com', state: 'active', icon: '💕', color: 'pink', desc: 'Vales de amor canjeables. Crea vales especiales para tu persona favorita y que los canjee cuando quiera.', tags: ['Vales', 'Canjear', 'Privado'] },
    { id: 'regalos', title: 'Regalos', short: 'Regalos', url: '', state: 'soon', icon: '🎁', color: 'rose', desc: 'Listas de deseos compartidas. Comparte tu wishlist, evita duplicados y di adiós a los spoilers.', tags: ['Wishlist', 'Compartir', 'Sin spoilers'] },
    { id: 'cocina', title: 'La Cocina de Amparo', short: 'Cocina', url: 'https://recetas.amparoandcompany.com', state: 'active', icon: '🍳', color: 'orange', desc: 'Recetario inteligente con selector de menú. Cuando no sabes qué comer, Amparo decide por ti.', tags: ['Recetas', '¿Qué como hoy?', 'Menú semanal'] },
    { id: 'reco', title: 'Recomendaciones', short: 'Reco', url: '', state: 'idea', icon: '⭐', color: 'yellow', desc: 'Lo mejor según Amparo. Restaurantes, pelis, series, productos y lugares que merecen la pena.', tags: ['Restaurantes', 'Pelis', 'Viajes'] },
    { id: 'agenda', title: 'Agenda', short: 'Agenda', url: '', state: 'idea', icon: '📅', color: 'cyan', desc: 'Nunca olvides un cumpleaños. Fechas importantes, recordatorios y countdowns a eventos.', tags: ['Cumpleaños', 'Eventos', 'Countdown'] },
    { id: 'cuentas', title: 'Cuentas', short: 'Cuentas', url: '', state: 'idea', icon: '💳', color: 'emerald', desc: 'Gastos compartidos sin líos. Quién paga qué, quién debe a quién, presupuestos del hogar.', tags: ['Gastos', 'Deudas', 'Presupuesto'] },
    { id: 'momentos', title: 'Momentos', short: 'Momentos', url: '', state: 'idea', icon: '📷', color: 'violet', desc: 'Álbum familiar privado. Sube, organiza y comparte fotos con quien tú quieras.', tags: ['Fotos', 'Álbumes', 'Privado'] }
  ];

  // Store ping results: { id: true|false|null }
  const pingResults = {};

  // Helper: get Tailwind-style classes from color name
  const colorMap = {
    pink:    { bg: 'bg-pink-500/20',    border: 'border-pink-500/50',   text: 'text-pink-300',    dot: '#ec4899' },
    rose:    { bg: 'bg-rose-500/20',    border: 'border-rose-500/50',   text: 'text-rose-300',    dot: '#f43f5e' },
    orange:  { bg: 'bg-orange-500/20',  border: 'border-orange-500/50', text: 'text-orange-300',  dot: '#f97316' },
    yellow:  { bg: 'bg-yellow-500/20',  border: 'border-yellow-500/50', text: 'text-yellow-300',  dot: '#eab308' },
    cyan:    { bg: 'bg-cyan-500/20',    border: 'border-cyan-500/50',   text: 'text-cyan-300',    dot: '#06b6d4' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50',text: 'text-emerald-300', dot: '#10b981' },
    violet:  { bg: 'bg-violet-500/20',  border: 'border-violet-500/50', text: 'text-violet-300',  dot: '#8b5cf6' },
    gray:    { bg: 'bg-gray-500/20',    border: 'border-gray-700',      text: 'text-gray-400',    dot: '#6b7280' }
  };
  const getColor = (name) => colorMap[name] || colorMap.gray;

  // Containers
  const accesosContainer = document.getElementById('accesos-grid');
  const serviciosContainer = document.getElementById('servicios-grid');
  const matrixGrid = document.getElementById('matrix-grid');
  const matrixSvg = document.getElementById('matrix-svg');
  const servicesModal = document.getElementById('services-modal');
  const modalServicesGrid = document.getElementById('modal-services-grid');

  // ========== RENDER MODAL SERVICES ==========
  const renderModalServices = () => {
    if (!modalServicesGrid) return;
    modalServicesGrid.innerHTML = services.map(s => {
      const c = getColor(s.color);
      const isActive = s.state === 'active';
      const stateLabel = s.state === 'active' ? 'Activo' : s.state === 'soon' ? 'Próximamente' : 'Idea';
      const stateBg = s.state === 'active' ? 'bg-green-500/20 text-green-400' : s.state === 'soon' ? 'bg-amber-500/20 text-amber-400' : 'bg-violet-500/20 text-violet-400';
      const wrapper = isActive ? 'a' : 'div';
      const hrefAttr = isActive && s.url ? `href="${s.url}"` : '';
      const cursorClass = isActive ? 'cursor-pointer' : 'cursor-default opacity-70';
      return `
        <${wrapper} ${hrefAttr} class="bg-dark p-5 rounded-2xl border ${c.border} ${cursorClass} hover:border-opacity-100 transition-all group">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">${s.icon}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold ${c.text} truncate">${s.title}</h4>
                <span class="px-2 py-0.5 ${stateBg} text-xs rounded-full flex-shrink-0">${stateLabel}</span>
              </div>
              <p class="text-gray-400 text-sm line-clamp-2">${s.desc || ''}</p>
            </div>
          </div>
        </${wrapper}>
      `;
    }).join('\n');
  };

  // ========== MODAL CONTROLS ==========
  const openModal = () => {
    if (!servicesModal) return;
    servicesModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!servicesModal) return;
    servicesModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // ========== RENDER ACCESOS ==========
  const renderAccesos = () => {
    if (!accesosContainer) return;
    accesosContainer.innerHTML = services.map(s => {
      const c = getColor(s.color);
      if (s.state === 'active') {
        return `
          <a href="${s.url}" data-acceso="${s.id}" class="group bg-darker p-5 rounded-2xl border ${c.border} text-center card-hover relative">
            <div data-acceso-dot="${s.id}" class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div class="w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
              <span class="text-2xl">${s.icon}</span>
            </div>
            <h3 class="font-medium text-sm mb-1 ${c.text}">${s.title}</h3>
            <p data-acceso-status="${s.id}" class="text-xs text-yellow-400">Comprobando...</p>
          </a>
        `;
      }
      if (s.state === 'soon') {
        return `
          <div class="group bg-darker p-5 rounded-2xl border border-gray-800 text-center card-hover opacity-60 cursor-not-allowed">
            <div class="w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
              <span class="text-2xl">${s.icon}</span>
            </div>
            <h3 class="font-medium text-sm mb-1">${s.title}</h3>
            <p class="text-xs text-amber-400">Próximamente</p>
          </div>
        `;
      }
      return `
        <div class="group bg-darker p-5 rounded-2xl border border-gray-800 text-center card-hover opacity-40 cursor-not-allowed">
          <div class="w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
            <span class="text-2xl">${s.icon}</span>
          </div>
          <h3 class="font-medium text-sm mb-1">${s.title}</h3>
          <p class="text-xs text-violet-400">Idea</p>
        </div>
      `;
    }).join('\n');
  };

  // ========== RENDER SERVICIOS (big cards) ==========
  const renderServicios = () => {
    if (!serviciosContainer) return;
    serviciosContainer.innerHTML = services.map(s => {
      const c = getColor(s.color);
      const isActive = s.state === 'active';
      const borderClass = isActive ? c.border : 'border-gray-800';
      const badge = isActive
        ? `<span data-badge="${s.id}" class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span> Comprobando</span>`
        : s.state === 'soon'
          ? `<span class="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">Próximamente</span>`
          : `<span class="px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-medium rounded-full">Idea</span>`;
      const hostname = s.url ? new URL(s.url, location).hostname : '';
      const wrapper = isActive ? 'a' : 'div';
      const hrefAttr = isActive ? `href="${s.url}"` : '';
      return `
        <${wrapper} ${hrefAttr} class="card-hover bg-darker p-8 rounded-2xl border ${borderClass} relative overflow-hidden group block">
          <div class="absolute top-4 right-4">${badge}</div>
          <div class="w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center mb-6">
            <span class="text-2xl">${s.icon}</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">${s.title}</h3>
          <p class="text-sm ${c.text} mb-3">${hostname}</p>
          <p class="text-gray-400 mb-6">${s.desc || ''}</p>
          <div class="flex flex-wrap gap-2">${(s.tags || []).map(t => `<span class="px-2 py-1 bg-dark text-xs text-gray-500 rounded">${t}</span>`).join('')}</div>
        </${wrapper}>
      `;
    }).join('\n');
  };

  // ========== RENDER MATRIX ==========
  const renderMatrix = () => {
    if (!matrixGrid || !matrixSvg) return;
    // 3x3 grid: positions 0-8, center (4) is Core
    // Map grid positions to service indices: [0,1,2,3,skip,4,5,6,7]
    const cells = [];
    let serviceIdx = 0;
    for (let i = 0; i < 9; i++) {
      if (i === 4) {
        // Core en el centro
        cells.push(`
          <div class="flex justify-center">
            <div id="matrix-core" class="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center glow">
              <div class="text-center">
                <span class="text-2xl font-bold">A</span>
                <p class="text-xs mt-1 opacity-80">Core</p>
              </div>
            </div>
          </div>
        `);
      } else {
        const s = services[serviceIdx];
        serviceIdx++;
        if (s) {
          const c = getColor(s.color);
          const isActive = s.state === 'active';
          const wrapper = isActive ? 'a' : 'div';
          const hrefAttr = isActive && s.url ? `href="${s.url}"` : '';
          cells.push(`
            <div class="flex justify-center">
              <${wrapper} ${hrefAttr} data-node="${s.id}" class="matrix-node w-24 h-24 bg-dark rounded-2xl border border-gray-700 flex items-center justify-center card-hover relative">
                <div data-node-dot="${s.id}" class="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full"></div>
                <div class="text-center">
                  <span class="text-2xl">${s.icon}</span>
                  <p class="text-xs mt-1 ${c.text}">${s.short}</p>
                </div>
              </${wrapper}>
            </div>
          `);
        } else {
          // Nodo "+Más" para abrir modal con todos los servicios
          cells.push(`
            <div class="flex justify-center">
              <button data-node="plus" id="open-services-modal" class="matrix-node w-24 h-24 bg-dark rounded-2xl border border-gray-700 flex items-center justify-center card-hover cursor-pointer hover:border-primary transition-colors">
                <div class="text-center">
                  <span class="text-2xl">➕</span>
                  <p class="text-xs mt-1 text-gray-400">Ver todo</p>
                </div>
              </button>
            </div>
          `);
        }
      }
    }
    matrixGrid.innerHTML = cells.join('\n');
  };

  // ========== DRAW MATRIX CONNECTIONS ==========
  const drawConnections = () => {
    if (!matrixSvg || !matrixGrid) return;
    // Clear
    matrixSvg.innerHTML = `
      <defs>
        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#22c55e" />
        </marker>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
        </marker>
        <marker id="arrowViolet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#8b5cf6" />
        </marker>
      </defs>
    `;

    const core = document.getElementById('matrix-core');
    const wrapper = document.getElementById('matrix-wrapper');
    if (!core || !wrapper) return;
    
    // Set SVG dimensions explicitly
    const wrapperRect = wrapper.getBoundingClientRect();
    const width = wrapperRect.width;
    const height = wrapperRect.height;
    matrixSvg.setAttribute('width', width);
    matrixSvg.setAttribute('height', height);
    matrixSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    const svgRect = matrixSvg.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();
    const cx = coreRect.left - svgRect.left + coreRect.width / 2;
    const cy = coreRect.top - svgRect.top + coreRect.height / 2;

    // Draw lines to all nodes including '+'
    const allNodes = matrixGrid.querySelectorAll('[data-node]');
    allNodes.forEach(node => {
      const nodeId = node.getAttribute('data-node');
      const s = services.find(srv => srv.id === nodeId);
      const r = node.getBoundingClientRect();
      const nx = r.left - svgRect.left + r.width / 2;
      const ny = r.top - svgRect.top + r.height / 2;

      // Determine line color based on state and ping (using solid colors)
      let strokeColor = '#8b5cf6'; // violet
      let marker = 'url(#arrowViolet)';
      if (s && s.state === 'active' && s.url) {
        const pingOk = pingResults[s.id];
        if (pingOk === true) {
          strokeColor = '#22c55e'; // green
          marker = 'url(#arrowGreen)';
        } else if (pingOk === false) {
          strokeColor = '#ef4444'; // red
          marker = 'url(#arrowRed)';
        }
      }

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', nx);
      line.setAttribute('y2', ny);
      line.setAttribute('stroke', strokeColor);
      line.setAttribute('stroke-opacity', '0.7');
      line.setAttribute('stroke-width', '3');
      line.setAttribute('marker-end', marker);
      line.setAttribute('class', 'matrix-line');
      line.setAttribute('data-line-for', nodeId);
      matrixSvg.appendChild(line);

      // Hover
      node.addEventListener('mouseenter', () => {
        line.setAttribute('stroke-width', '4');
      });
      node.addEventListener('mouseleave', () => {
        line.setAttribute('stroke-width', '2');
      });
    });
  };

  // ========== PING HELPER ==========
  const ping = async (url, timeout = 3000) => {
    if (!url) return false;
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const res = await fetch(url, { method: 'HEAD', mode: 'cors', signal: controller.signal });
      clearTimeout(id);
      return res.ok;
    } catch {
      try {
        const controller2 = new AbortController();
        const id2 = setTimeout(() => controller2.abort(), timeout);
        await fetch(url, { mode: 'no-cors', signal: controller2.signal });
        clearTimeout(id2);
        return true;
      } catch {
        return false;
      }
    }
  };

  // ========== UPDATE UI AFTER PINGS ==========
  const updateAfterPings = () => {
    services.forEach(s => {
      if (s.state !== 'active' || !s.url) return;
      const ok = pingResults[s.id];

      // Big card badge
      const badge = document.querySelector(`[data-badge="${s.id}"]`);
      if (badge) {
        if (ok) {
          badge.className = 'px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1';
          badge.innerHTML = '<span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Activo';
        } else {
          badge.className = 'px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full flex items-center gap-1';
          badge.innerHTML = '<span class="w-1.5 h-1.5 bg-red-400 rounded-full"></span> No responde';
        }
      }

      // Accesos dot + status
      const accesoDot = document.querySelector(`[data-acceso-dot="${s.id}"]`);
      const accesoStatus = document.querySelector(`[data-acceso-status="${s.id}"]`);
      if (accesoDot) {
        accesoDot.className = ok
          ? 'absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse'
          : 'absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full';
      }
      if (accesoStatus) {
        accesoStatus.className = ok ? 'text-xs text-green-400' : 'text-xs text-red-400';
        accesoStatus.textContent = ok ? 'Activo' : 'No responde';
      }

      // Matrix node dot
      const nodeDot = document.querySelector(`[data-node-dot="${s.id}"]`);
      if (nodeDot) {
        nodeDot.className = ok
          ? 'absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse'
          : 'absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full';
      }
    });

    // Footer status
    const footerStatus = document.querySelector('footer .flex.items-center.gap-2 span');
    if (footerStatus) {
      const anyDown = services.some(s => s.state === 'active' && s.url && pingResults[s.id] === false);
      footerStatus.textContent = anyDown ? 'Algunos servicios no responden' : 'Todo funcionando ✨';
    }

    // Redraw matrix lines with updated colors
    drawConnections();
  };

  // ========== INITIAL RENDER ==========
  renderAccesos();
  renderServicios();
  renderMatrix();
  renderModalServices();
  
  // Small delay to ensure DOM elements are properly laid out
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawConnections();
    });
  });

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawConnections, 150);
  });

  // Modal event listeners
  const openModalBtn = document.getElementById('open-services-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ========== RUN PINGS ==========
  for (const s of services) {
    if (s.state === 'active' && s.url) {
      pingResults[s.id] = await ping(s.url, 2500);
    }
  }
  updateAfterPings();
});
