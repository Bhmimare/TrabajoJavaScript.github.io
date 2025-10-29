document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  // Alternar visibilidad del menú
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en un enlace (opcional)
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /* ================================
  --- --- NOTICIAS jSON INDEX --- ---
  =================================*/

 const basePath = window.location.hostname.includes("github.io")
  ? "https://bhmimare.github.io/Trabajo-JavaScript.github.io/"
  : "../";

fetch(`${basePath}data/noticias.json`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar noticias");
      return res.json();
    })
    .then((data) => {
      mostrarNoticias(data.noticias);
      mostrarEventos(data.eventos);
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("contenedor-noticias").innerHTML =
        "<p>No se pudieron cargar las noticias.</p>";
      document.getElementById("contenedor-eventos").innerHTML =
        "<p>No se pudieron cargar los eventos.</p>";
    });
});

function mostrarNoticias(noticias) {
  const contenedor = document.getElementById("contenedor-noticias");
  noticias.forEach((noticia, i) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <div class="texto">
        <h3>${noticia.titulo}</h3>
        <p><strong>${new Date(noticia.fecha).toLocaleDateString(
          "es-ES"
        )}</strong></p>
        <p>${noticia.descripcion}</p>
      </div>
    `;
    contenedor.appendChild(div);
    // Añadir efecto con retraso
    setTimeout(() => div.classList.add("visible"), 150 * i);
  });
}

function mostrarEventos(eventos) {
  const contenedor = document.getElementById("contenedor-eventos");
  eventos.forEach((evento, i) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <img src="${evento.imagen}" alt="${evento.titulo}">
      <div class="texto">
        <h3>${evento.titulo}</h3>
        <p><strong>${new Date(evento.fecha).toLocaleDateString(
          "es-ES"
        )}</strong></p>
        <p>${evento.descripcion}</p>
      </div>
    `;
    contenedor.appendChild(div);
    // Efecto de entrada progresivo
    setTimeout(() => div.classList.add("visible"), 150 * i);
  });
}

//leer mas
document.querySelectorAll(".leerMasContenido").forEach(function (item) {
  const dots = item.querySelector(".puntos"),
    btnText = item.querySelector(".btn-leer-mas");
  btnText.onclick = function () {
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Cerrar";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Leer más";
      moreText.style.display = "inline";
    }
  };
});

/* ================================
  --- --- GALERIA --- ---
  =================================*/
document.addEventListener("DOMContentLoaded", () => {
  const principal = document.getElementById("imagenPrincipal");
  const miniaturas = Array.from(document.querySelectorAll(".miniatura"));
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");
  const modalNext = document.getElementById("modal-next");
  const modalPrev = document.getElementById("modal-prev");

  // Si no hay miniaturas o imagen principal, salir
  if (!principal || miniaturas.length === 0) return;

  // Inicial: marcar la primera miniatura que coincida con la principal si hay match
  function marcarActivaBySrc(src) {
    miniaturas.forEach((m) =>
      m.classList.toggle("activa", m.dataset.full === src)
    );
  }

  // Si la imagen principal existe con src inicial, marcar miniatura
  marcarActivaBySrc(principal.src);

  // Click en miniatura -> cambiar imagen principal
  miniaturas.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      const full = thumb.dataset.full || thumb.src;
      principal.src = full;
      principal.alt = thumb.alt || "";
      marcarActivaBySrc(full);
      currentIndex = index;
    });
  });

  // Hacer click en la imagen principal -> abrir modal ampliado
  principal.addEventListener("click", () => {
    openModal(principal.src, currentIndex);
  });

  // Soporte teclado: Enter abre imagen principal, flechas para navegar
  principal.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openModal(principal.src, currentIndex);
  });

  // CONTROL DE INDICE para modal
  let currentIndex = miniaturas.findIndex(
    (m) => m.dataset.full === principal.src
  );
  if (currentIndex === -1) currentIndex = 0;

  function openModal(src, index) {
    modalImg.src = src;
    modalImg.alt = miniaturas[index]?.alt || "";
    modal.setAttribute("aria-hidden", "false");
    currentIndex = index;
    // focus para teclado
    modalClose.focus();
    document.body.style.overflow = "hidden"; // evita scroll detrás
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  function showIndex(index) {
    if (index < 0) index = miniaturas.length - 1;
    if (index >= miniaturas.length) index = 0;
    const src = miniaturas[index].dataset.full || miniaturas[index].src;
    modalImg.src = src;
    modalImg.alt = miniaturas[index].alt || "";
    // también actualizar la principal visual (opcional)
    principal.src = src;
    marcarActivaBySrc(src);
    currentIndex = index;
  }

  modalClose.addEventListener("click", closeModal);
  modalNext.addEventListener("click", () => showIndex(currentIndex + 1));
  modalPrev.addEventListener("click", () => showIndex(currentIndex - 1));

  // Cerrar modal con ESC y navegar con flechas
  document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showIndex(currentIndex + 1);
      if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
    }
  });

  // Cerrar modal clicando fuera de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Si haces doble click en la miniatura, abrir modal en esa imagen
  miniaturas.forEach((thumb, i) => {
    thumb.addEventListener("dblclick", () =>
      openModal(thumb.dataset.full || thumb.src, i)
    );
  });

  // Si la página carga con una miniatura activa (por data-full), marcarla
  // si no, la primera miniatura se marcará en la inicialización anterior
  marcarActivaBySrc(principal.src);
});

// #########################################
// LÓGICA DEL FORMULARIO DE CONTACTO
// #########################################

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("presupuestoForm");
  const inputFields = document.querySelectorAll(
    "#nombre, #apellidos, #telefono, #email"
  );
  const productoSelect = document.getElementById("producto");
  const plazoInput = document.getElementById("plazo");
  const extraCheckboxes = document.querySelectorAll('input[name="extra"]');
  const presupuestoFinalDiv = document.getElementById("presupuestoFinal");
  const condicionesCheckbox = document.getElementById("condiciones");
  const errorCondiciones = document.getElementById("errorCondiciones");

  /**
   * Valida un campo de texto basándose en su patrón HTML y muestra el error.
   * @param {HTMLElement} input El elemento input a validar.
   * @returns {boolean} True si el campo es válido, False en caso contrario.
   */
  function validarCampo(input) {
    const errorSpan = document.getElementById(
      `error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`
    );

    if (input.validity.valid) {
      errorSpan.textContent = "";
      input.classList.remove("invalido");
      return true;
    } else {
      // Muestra un mensaje más descriptivo si el campo no es válido.
      let mensaje = "Campo obligatorio.";
      if (input.validity.patternMismatch) {
        mensaje = input.title || "El formato no es correcto.";
      } else if (input.validity.typeMismatch) {
        mensaje = "Ingrese un formato válido.";
      }
      errorSpan.textContent = mensaje;
      input.classList.add("invalido");
      return false;
    }
  }

  /**
   * Calcula y actualiza el presupuesto final.
   */
  function calcularPresupuesto() {
    // 1. Obtener el precio base del producto
    const precioProducto = parseFloat(productoSelect.value) || 0;
    let total = precioProducto;

    // 2. Sumar los extras
    extraCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        total += parseFloat(checkbox.value);
      }
    });

    // 3. Aplicar descuento por plazo
    const plazoDias = parseInt(plazoInput.value) || 0;
    let descuentoPorcentaje = 0;

    if (plazoDias >= 1 && plazoDias <= 30) {
      descuentoPorcentaje = 0.1; // 10%
    } else if (plazoDias >= 31 && plazoDias <= 60) {
      descuentoPorcentaje = 0.05; // 5%
    }
    // Si es mayor a 60 días, el descuento es 0%.

    const descuentoMonto = total * descuentoPorcentaje;
    total -= descuentoMonto;

    // 4. Actualizar el div del presupuesto
    presupuestoFinalDiv.textContent = total.toFixed(2) + " €";
  }

  /**
   * Valida la casilla de condiciones.
   * @returns {boolean} True si la casilla está marcada, False en caso contrario.
   */
  function validarCondiciones() {
    if (!condicionesCheckbox.checked) {
      errorCondiciones.textContent =
        "Debe aceptar las condiciones para enviar el presupuesto.";
      return false;
    }
    errorCondiciones.textContent = "";
    return true;
  }

  // --- Event Listeners ---

  // 1. Validación en tiempo real (al perder el foco) para los campos de contacto.
  inputFields.forEach((input) => {
    input.addEventListener("blur", () => {
      validarCampo(input);
    });
  });

  // 2. Recálculo del presupuesto al cambiar el producto, el plazo o los extras.
  productoSelect.addEventListener("change", calcularPresupuesto);
  plazoInput.addEventListener("input", calcularPresupuesto);
  extraCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calcularPresupuesto);
  });

  // También validamos las condiciones al interactuar con ellas
  condicionesCheckbox.addEventListener("change", validarCondiciones);

  // 3. Manejo del envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío por defecto

    let esValido = true;

    // A. Validar todos los campos de contacto
    inputFields.forEach((input) => {
      if (!validarCampo(input)) {
        esValido = false;
      }
    });

    // B. Validar condiciones
    if (!validarCondiciones()) {
      esValido = false;
    }

    // C. Validar campos requeridos que no son de texto (producto y plazo)
    if (
      !productoSelect.value ||
      !plazoInput.value ||
      plazoInput.validity.rangeUnderflow ||
      plazoInput.validity.rangeOverflow
    ) {
      esValido = false;
    }

    if (esValido) {
      // Si todo es válido, muestra un mensaje de éxito.
      alert(
        "✅ Presupuesto enviado con éxito. Presupuesto final: " +
          presupuestoFinalDiv.textContent
      );
      // Aquí iría la lógica para enviar los datos a un servidor (ej. con fetch o XMLHttpRequest)
      // form.submit(); // Si quieres enviarlo realmente después de la validación JS
    } else {
      alert(
        "❌ Por favor, revise los errores en el formulario antes de enviarlo."
      );
      // Enfoca el primer campo inválido para mejorar la experiencia de usuario
      const primerInvalido = document.querySelector(".invalido");
      if (primerInvalido) {
        primerInvalido.focus();
      }
    }
  });

  // Inicializar el presupuesto al cargar la página
  calcularPresupuesto();
});

document.addEventListener("DOMContentLoaded", () => {
  // Lista dinámica de imágenes (ajusta las rutas)
  const imagenes = [
    "../imagenes/galeria-1.png",
    "../imagenes/galeria-2.png",
    "../imagenes/galeria-3.png",
    "../imagenes/galeria-4.png",
    "../imagenes/galeria-5.png",
    "../imagenes/galeria-6.png",
    "../imagenes/galeria-7.png",
    "../imagenes/galeria-8.jpg",
  ];

  // Seleccionar elementos del DOM
  const slidesContainer = document.querySelector(".slides");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (!slidesContainer || !nextBtn || !prevBtn) {
    console.error("❌ Error: no se encontraron los elementos del carrusel.");
    return;
  }

  // Crear las imágenes del carrusel dinámicamente
  imagenes.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Fotografía de la galería";
    slidesContainer.appendChild(img);
  });

  let indiceActual = 0;

  // Función para actualizar el desplazamiento del carrusel
  function mostrarSlide(index) {
    const totalSlides = imagenes.length;
    if (index >= totalSlides) indiceActual = 0;
    else if (index < 0) indiceActual = totalSlides - 1;
    else indiceActual = index;

    const desplazamiento = -indiceActual * 100;
    slidesContainer.style.transform = `translateX(${desplazamiento}%)`;
  }

  // Controles de navegación
  nextBtn.addEventListener("click", () => mostrarSlide(indiceActual + 1));
  prevBtn.addEventListener("click", () => mostrarSlide(indiceActual - 1));

  // Reproducción automática cada 5 segundos
  setInterval(() => {
    mostrarSlide(indiceActual + 1);
  }, 5000);

  // Mostrar la primera imagen al cargar
  mostrarSlide(indiceActual);
});

/* ===========================
  --- --- MAPA --- --- 
=========================== */
// Simulación de envío del formulario
document
  .getElementById("formContacto")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Gracias por tu mensaje, te responderé lo antes posible.");
    this.reset();
  });

// Coordenadas del negocio (Sevilla, ejemplo)
const ubicacionNegocio = [37.3925, -5.9941];

// Crear mapa centrado en el negocio
const map = L.map("map").setView(ubicacionNegocio, 13);

// Cargar el mapa desde OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Agregar marcador del negocio
L.marker(ubicacionNegocio)
  .addTo(map)
  .bindPopup("<b>Badr Hmimar Fotógrafo</b><br>Calle Divina Pastora 45, Sevilla")
  .openPopup();

// Función para calcular la ruta desde la ubicación del usuario
document.getElementById("ruta-btn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Mostrar la ruta con Leaflet Routing Machine
        L.Routing.control({
          waypoints: [L.latLng(lat, lon), L.latLng(ubicacionNegocio)],
          language: "es",
          lineOptions: {
            styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
          },
          createMarker: function () {
            return null;
          }, // No mostrar marcadores duplicados
        }).addTo(map);
      },
      (err) => {
        alert(
          "No se pudo obtener tu ubicación. Asegúrate de permitir el acceso al GPS."
        );
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
});


