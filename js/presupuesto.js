/* ==============================
          Presupuesto
   =============================== */

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

// !Manejar la validación y el cálculo de presupuesto en tiempo real.

// Esperar a que todo el contenido del DOM (Document Object Model) este cargado.
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Selección de Elementos del DOM
  
  const form = document.getElementById("presupuestoForm"); // El formulario principal.
  // Seleccionar los campos de texto obligatorios (nombre, apellidos, telefono, email).
  const inputFields = document.querySelectorAll("#nombre, #apellidos, #telefono, #email");
  const productoSelect = document.getElementById("producto"); // Selector de producto base.
  const plazoInput = document.getElementById("plazo"); // Campo para el plazo de entrega (dias).
  // Seleccionar todos los checkboxes con el atributo name="extra".
  const extraCheckboxes = document.querySelectorAll('input[name="extra"]');
  const presupuestoFinalDiv = document.getElementById("presupuestoFinal"); // Div donde se muestra el resultado final.
  const condicionesCheckbox = document.getElementById("condiciones"); // Checkbox de aceptación de terminos.



  // 2. Funciones de Validación
  
  // Función genérica para validar un campo individual.
  function validarCampo(input) {
    // Intenta localizar un elemento span de error preexistente para el campo.
    let errorSpan = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
    
    // Si no existe el span de error, lo crea dinámicamente y lo inserta después del input.
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.id = `error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`;
      errorSpan.classList.add("error-texto");
      input.insertAdjacentElement("afterend", errorSpan);
    }

    // Comprobar la validez del campo.
    if (input.validity.valid) {
      errorSpan.textContent = ""; // Limpia el mensaje de error.
      input.classList.remove("invalido"); // Remueve la clase de estilo de error.
      return true;
    } else {
      // Si es invalido, determina el mensaje de error específico.
      let mensaje = "Campo obligatorio.";
      if (input.validity.typeMismatch) mensaje = "Formato no válido."; // Para (nombre, apellidos, teléfono, email).
      if (input.validity.patternMismatch) mensaje = input.title || "Formato incorrecto.";
      
      errorSpan.textContent = mensaje;
      input.classList.add("invalido"); // Añadir la clase de estilo de error.
      return false;
    }
  }

  // Funcion para validar la aceptacion de las condiciones.
  function validarCondiciones() {
    let errorCondiciones = document.getElementById("errorCondiciones");
    
    // Crear el span de error si no existe.
    if (!errorCondiciones) {
      errorCondiciones = document.createElement("span");
      errorCondiciones.id = "errorCondiciones";
      errorCondiciones.classList.add("error-texto");
      condicionesCheckbox.insertAdjacentElement("afterend", errorCondiciones);
    }

    // Comprobar si el checkbox esta marcado.
    if (!condicionesCheckbox.checked) {
      errorCondiciones.textContent = "Debe aceptar las condiciones.";
      return false;
    }
    errorCondiciones.textContent = "";
    return true;
  }
  
  // 3. Funcion de Calculo de Presupuesto
  
  function calcularPresupuesto() {
    // Obtiene el precio base del producto seleccionado.
    const precioProducto = parseFloat(productoSelect.value) || 0;
    let total = precioProducto;

    // Suma el costo de todos los extras seleccionados.
    extraCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) total += parseFloat(checkbox.value);
    });

    // Obtiene el plazo de entrega en días.
    const plazoDias = parseInt(plazoInput.value) || 0;
    let descuento = 0;

    // Logica de descuento basada en el plazo:
    if (plazoDias >= 1 && plazoDias <= 30) descuento = 0.1; // 10% de descuento por entrega rapida.
    else if (plazoDias >= 31 && plazoDias <= 60) descuento = 0.05; // 5% de descuento.

    // Aplica el descuento al total.
    total -= total * descuento;
    
    // Muestra el resultado formateado a dos decimales con el simbolo de euro.
    presupuestoFinalDiv.textContent = total.toFixed(2) + " €";
  }

  // 4. Asignacion de Event Listeners (Validación y Cálculo en Tiempo Real)

  // Asignar la validación al evento 'blur' (cuando el usuario sale del campo) para los campos de texto.
  inputFields.forEach((input) => {
    input.addEventListener("blur", () => validarCampo(input));
  });

  // Recalcula el presupuesto cuando cambian los valores clave.
  productoSelect.addEventListener("change", calcularPresupuesto);
  plazoInput.addEventListener("input", calcularPresupuesto); // 'input' detecta cambios en tiempo real al escribir.
  extraCheckboxes.forEach((c) => c.addEventListener("change", calcularPresupuesto));
  
  // Valida las condiciones cuando el usuario cambia el checkbox.
  condicionesCheckbox.addEventListener("change", validarCondiciones);

  // 5. Manejo del Envío del Formulario (Submit)

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío tradicional del formulario.

    let esValido = true;
    
    // Validar todos los campos de texto.
    inputFields.forEach((input) => {
      if (!validarCampo(input)) esValido = false;
    });
    
    // Validar el checkbox de condiciones.
    if (!validarCondiciones()) esValido = false;
    
    // Asegura que los campos de selección/plazo tengan valores.
    if (!productoSelect.value || !plazoInput.value) esValido = false;

    // Si la validacion falla, muestra una alerta y detiene el proceso.
    if (!esValido) {
      alert("Por favor, revise los errores antes de enviar.");
      return;
    }

    // Si esVálido es true:
    
    // Muestrar mensaje de éxito con el total final.
    alert("Presupuesto enviado con éxito.\nTotal: " + presupuestoFinalDiv.textContent);
    
    // Reinicia el formulario a sus valores iniciales.
    form.reset();
    
    // Asegurar que el total visible se restablezca a cero.
    presupuestoFinalDiv.textContent = "0.00 €";
  });

  // 6. Inicializacion

  // Calcula el presupuesto inicial al cargar la página (muestra 0.00 € o el valor por defecto).
  calcularPresupuesto();

});
