/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

/**
 * script.js
 * -------------------------------------------------------------------------
 * Lógica principal de comportamiento del sitio OASIS.
 *
 * Responsabilidades:
 *  - Ocultar el preloader al terminar la carga de la página.
 *  - Manejar el menú desplegable en viewports móviles (<992px).
 *  - Mostrar/ocultar el botón de regreso al inicio y fijar el header
 *    al hacer scroll (ambos se evalúan en el mismo listener).
 *  - Desplazarse suavemente al inicio al hacer clic en #scroll-to-top.
 *  - Cerrar el menú responsive al hacer clic en un enlace de scroll.
 *
 * Dependencias: jQuery (cargado globalmente desde plugins/jquery).
 * -------------------------------------------------------------------------
 */
(function ($) {
  'use strict';

  // -----------------------------------------------------------------------
  // PRELOADER
  // Espera a que todos los recursos de la página estén cargados (window.load)
  // antes de desvanecerse; usar $(document).ready causaría un parpadeo
  // porque las imágenes aún no habrían cargado.
  // -----------------------------------------------------------------------
  $(window).on('load', function () {
    $('#page-loader').fadeOut('slow', function () {
      $(this).remove(); // Elimina el nodo del DOM para liberar memoria
    });
  });


  // -----------------------------------------------------------------------
  // MENÚ DESPLEGABLE EN MÓVILES
  // Bootstrap 4 maneja dropdowns con JS propio en desktop; en mobile (<992px)
  // se reemplaza por una animación de altura toggle para evitar saltos.
  // -----------------------------------------------------------------------
  if ($(window).width() < 992) {
    $('.has-dropdown .dropdown-toggle').on('click', function () {
      $(this).siblings('.dropdown-menu').animate({
        height: 'toggle'
      }, 300);
    });
  }


  // -----------------------------------------------------------------------
  // SCROLL: botón "volver arriba" + header fijo
  // Se usa un único listener para ambas responsabilidades con el fin de
  // evitar registrar dos handlers separados sobre el mismo evento.
  // Umbral: 70px desde el tope de la página.
  // -----------------------------------------------------------------------
  var SCROLL_THRESHOLD = 70;

  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop() > SCROLL_THRESHOLD;

    // Muestra u oculta el botón de regreso al inicio
    $('.scroll-to-top').toggleClass('reveal', scrolled);

    // Aplica fondo blanco al header al salir de la zona hero
    $('.site-navigation, .trans-navigation').toggleClass('header-white', scrolled);
  });


  // -----------------------------------------------------------------------
  // BOTÓN REGRESO AL INICIO (#scroll-to-top)
  // Anima el scroll del documento a la posición 0 en 600ms.
  // La guarda "if length" previene errores en páginas sin este botón.
  // -----------------------------------------------------------------------
  if ($('#scroll-to-top').length) {
    $('#scroll-to-top').on('click', function () {
      $('body, html').animate({ scrollTop: 0 }, 600);
      return false; // Previene el comportamiento por defecto del enlace (<a href="#">)
    });
  }


  // -----------------------------------------------------------------------
  // CIERRE DE MENÚ RESPONSIVE AL NAVEGAR CON SCROLL-TRIGGER
  // Los enlaces con .js-scroll-trigger desplazan la página a una sección;
  // en móvil el menú debe cerrarse automáticamente después del clic.
  // -----------------------------------------------------------------------
  $('.js-scroll-trigger').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

})(jQuery);
