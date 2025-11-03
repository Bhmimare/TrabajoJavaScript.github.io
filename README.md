# Trabajo Final: Desarrollo de Sitio Web con HTML, CSS y JavaScript

## Introducción

El presente documento tiene como objetivo describir de manera detallada el trabajo final realizado con las tecnologías **HTML**, **CSS** y **JavaScript**. El proyecto consiste en la creación de un sitio web funcional y dinámico compuesto por cuatro páginas principales: **Inicio (index)**, **Galería**, **Presupuesto** y **Contacto**, además de un archivo en formato **JSON** destinado a almacenar información de noticias.

El propósito principal de este trabajo es demostrar la integración de las tres tecnologías fundamentales del desarrollo web front-end, aplicando conceptos de estructura, diseño visual e interactividad. A través de la creación de estas páginas, se busca reflejar una comprensión integral del flujo de trabajo en el desarrollo de un sitio web moderno.

---

## Desarrollo

### 1. Estructura general del proyecto

El proyecto se compone de una serie de archivos organizados en carpetas para mantener un orden lógico y profesional. La estructura es la siguiente:

* **index.html:** Página principal que presenta la información inicial del sitio y las noticias dinámicas.
* **galeria.html:** Página que muestra una galería de imágenes en miniatura, con visualización organizada mediante CSS.
* **presupuesto.html:** Página que contiene un formulario funcional para calcular presupuestos de servicios según las opciones seleccionadas por el usuario.
* **contacto.html:** Página de contacto con un mapa dinámico e interactivo, que muestra la ubicación de referencia del proyecto.
* **data/noticias.json:** Archivo JSON utilizado como fuente de datos para las noticias cargadas en la página principal.
* Carpetas de **CSS**, **JS** e **imágenes**, que almacenan los recursos de diseño, funcionalidad y contenido visual, respectivamente.

Esta organización favorece la modularidad, el mantenimiento y la escalabilidad del proyecto.

---

### 2. Descripción funcional de las páginas

#### a) Página principal: *index.html*

La página de inicio tiene como función principal presentar al usuario una vista general del sitio web. En ella se incluyen secciones de bienvenida y un espacio destinado a las **noticias**, las cuales se cargan dinámicamente desde un archivo externo en formato JSON.

Gracias a esta estructura, el contenido de las noticias puede modificarse o ampliarse fácilmente sin alterar el código HTML, aplicando así el principio de separación entre contenido y presentación.

#### b) Galería: *galeria.html*

La página de galería presenta un conjunto de **imágenes en miniatura**, organizadas en una cuadrícula visual atractiva. Cada miniatura se encuentra almacenada en la carpeta de imágenes del proyecto y es mostrada mediante etiquetas HTML e instrucciones de estilo en CSS.

El diseño de esta sección se centra en la presentación visual, priorizando el orden, la simetría y la adaptación a distintos tamaños de pantalla (diseño responsive). Al hacer clic en una miniatura, se puede ampliar la imagen.

#### c) Presupuesto: *presupuesto.html*

La página de presupuesto ofrece un **formulario funcional** que permite al usuario calcular un presupuesto estimado en base al tipo de servicio seleccionado y la cantidad de horas de trabajo requeridas.

El cálculo del costo se realiza de manera automática mediante JavaScript, que procesa los datos ingresados y muestra el resultado en pantalla. Este apartado evidencia la aplicación de eventos, funciones lógicas y validaciones, reforzando la comprensión de la interacción entre el usuario y el sistema.

#### d) Contacto: *contacto.html*

La página de contacto integra un **mapa dinámico** que permite visualizar la ubicación del negocio o del proyecto. Para lograr esta funcionalidad, se utiliza una librería de mapas como **Leaflet**. El mapa es interactivo, permite acercar o alejar la vista y muestra un marcador con la posición deseada.

Además, puede incluir un formulario de contacto para la comunicación con el usuario, consolidando la sección como un espacio de interacción directa.

---

### 3. Archivo JSON: noticias dinámicas

El archivo **`noticias.json`** contiene una colección de objetos estructurados en formato **JSON**, cada uno con un título, una descripción y una imagen. Este archivo funciona como fuente de datos para la sección de noticias de la página principal.

El uso del formato JSON aporta flexibilidad y permite mantener la información actualizada sin necesidad de editar el código fuente del sitio. Asimismo, refleja un enfoque profesional de manejo de datos en entornos web.

---

### 4. Integración de tecnologías

El sitio web combina de forma coherente las tres tecnologías fundamentales del desarrollo front-end:

* **HTML (HyperText Markup Language):** proporciona la estructura del contenido, organizando secciones, encabezados, párrafos, formularios e imágenes.
* **CSS (Cascading Style Sheets):** define la presentación visual, colores, fuentes, márgenes y disposición de los elementos, garantizando un diseño atractivo y adaptable a diferentes dispositivos.
* **JavaScript:** agrega la interactividad y dinamismo necesarios, permitiendo cargar datos externos, validar formularios, calcular presupuestos y generar mapas dinámicos.

El resultado es un sitio web interactivo, visualmente coherente y funcional, donde cada página cumple un propósito específico dentro de una experiencia de usuario integral.

---

## Conclusión

El trabajo final de HTML, CSS y JavaScript constituye una experiencia práctica completa que demuestra el dominio de las herramientas esenciales del desarrollo web. A través de las cuatro páginas principales y el uso de un archivo JSON, el estudiante logra integrar la estructura del contenido, el diseño visual y la lógica funcional de manera eficiente.

La correcta organización del proyecto, la interactividad mediante JavaScript y la presentación estética de la galería en miniatura reflejan un nivel de comprensión adecuado para la creación de sitios web modernos. En conjunto, este trabajo representa una base sólida para continuar avanzando hacia desarrollos más complejos y profesionales en el ámbito del diseño y programación web.
