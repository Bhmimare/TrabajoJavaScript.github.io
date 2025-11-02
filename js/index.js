
// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  // Si existen ambos elementos, configurar el evento
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("nav-visible"); // Cambia la visibilidad del menú
      menuBtn.classList.toggle("open"); // Cambia el icono si lo deseas (por ejemplo, de "bars" a "x")
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/noticias.json")
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

function crearItem(item) {
  const div = document.createElement("div");
  div.classList.add("item");

  // Cortar un resumen de la descripción
  const resumen = item.descripcion.length > 100 
    ? item.descripcion.slice(0, 100) + "..." 
    : item.descripcion;

  div.innerHTML = `
    <img src="${item.imagen}" alt="${item.titulo}" width="400" height="300">
    <div class="texto">
      <h3>${item.titulo}</h3>
      <p><strong>${new Date(item.fecha).toLocaleDateString("es-ES")}</strong></p>
      <p class="resumen">${resumen}</p>
      <button class="btn-leer-mas" aria-label="Leer más ${item.titulo}">Leer más</button>
      <div class="detalle" style="display:none;">
        <p>${'Estudia el trabajo de fotógrafos que admires y observa cómo componen sus imágenes y utilizan la luz.'}</p>
      </div>
    </div>
  `;

  // Añadir efecto con retraso (opcional)
  setTimeout(() => div.classList.add("visible"), 150);

  // Evento para el botón "Leer más"
  div.querySelector(".btn-leer-mas").addEventListener("click", function() {
    const detalle = div.querySelector(".detalle");
    const resumenP = div.querySelector(".resumen");

    if (detalle.style.display === "none") {
      detalle.style.display = "block";
      resumenP.style.display = "none";
      this.textContent = "Leer menos";
    } else {
      detalle.style.display = "none";
      resumenP.style.display = "block";
      this.textContent = "Leer más";
    }
  });

  return div;
}

function mostrarNoticias(noticias) {
  const contenedor = document.getElementById("contenedor-noticias");
  noticias.forEach(noticia => {
    contenedor.appendChild(crearItem(noticia));
  });
}

function mostrarEventos(eventos) {
  const contenedor = document.getElementById("contenedor-eventos");
  eventos.forEach(evento => {
    contenedor.appendChild(crearItem(evento));
  });
}


