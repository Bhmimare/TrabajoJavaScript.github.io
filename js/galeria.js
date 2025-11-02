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
    // también actualizar la principal visual
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