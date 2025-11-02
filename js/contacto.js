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

/* =================================================================
          1. Manejo del Formulario de Contacto
================================================================= */

// Seleccionar el formulario con el ID "formContacto"
document
  .getElementById("formContacto")
  .addEventListener("submit", function (e) {
    // Añadir un 'eventListener' que se activa cuando el formulario es enviado (submit)
      e.preventDefault(); // Evita el comportamiento predeterminado del formulario (que recargue la página)
    
    alert("Gracias por tu mensaje, te responderé lo antes posible."); // Mostrar una alerta de agradecimiento al usuario
    
    this.reset(); // Resetea o limpia los campos del formulario
  });


/* =================================================================
          2. Configuración Inicial del Mapa (Leaflet)
================================================================= */

const ubicacionNegocio = [37.3925, -5.9941]; // Coordenadas del negocio (Sevilla)

// Instancia del mapa (L.map) en el elemento con ID "map", centrado en la obicacion del negocio con el zoom 13
const map = L.map("map").setView(ubicacionNegocio, 13);

// Cargar el mapa desde OpenStreetMap 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors", // Texto legal de atribución para OpenStreetMap
}).addTo(map);

// Agregar marcador del negocio
L.marker(ubicacionNegocio)
  .addTo(map);
  // Añade un 'popup' para muestrar el marcador
  .bindPopup("<b>Badr Hmimar FOTÓGRAFO</b> <br> Calle Divina Pastora 45, Sevilla")
  .openPopup(); // Abre el popup automáticamente al cargar


/* =================================================================
          3. Funcionalidad de Cálculo de Ruta
 ================================================================= */

// Selecciona el botón con el ID "ruta-btn" y añade un listener para el evento 'click'
document.getElementById("ruta-btn").addEventListener("click", () => {
  // Verifica si el navegador soporta la API de Geolocation
  if (navigator.geolocation) {
    // Obtiene la posición actual del usuario
    navigator.geolocation.getCurrentPosition(
      // Función de éxito (si se obtiene la posición)
      (pos) => {
        const lat = pos.coords.latitude; // Latitud del usuario
        const lon = pos.coords.longitude; // Longitud del usuario

        // Crear una ruta desde la posición del usuario hasta el negocio
        L.Routing.control({
          // Define los puntos (waypoints) de la ruta del Usuario -> Negocio
          waypoints: [L.latLng(lat, lon), // Punto de inicio
            L.latLng(ubicacionNegocio)],  // Destino
          // Establece el idioma de la ruta
          language: "es",
          // Configura las opciones visuales de la línea de la ruta
          lineOptions: {
            styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
          },
          // Función para suprimir la creación de marcadores duplicados por el plugin de routing
          createMarker: function () {
            return null;
          }, 
        }).addTo(map);
      },
      // Función de error (si no se puede obtener la ubicación)
      (err) => {
        alert(
          "No se pudo obtener tu ubicación. Asegúrate de permitir el acceso al GPS."
        );
      }
    );
  } else {
    // Mensaje si el navegador no admiti geolocalización
    alert("Tu navegador no soporta geolocalización.");
  }

});


