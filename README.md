powerdom
========

TODO:
	· Input
        · Form

INFO:

Este proyecto está en desarrollo y este fichero sirve como
anotaciones para el mismo.

· URL de ejemplo http://media.smashingmagazine.com/wp-content/uploads/images/smashing-html5/files/index.html

· Sólo un punto de entrada, index.html, el resto de url index.html
son sólo reescrituras:

	loquesea.html -> index.html#loquesea
	loquesea.html?param=value -> index.html#loquesea?param=value&...

	+ La url ajax 'loquesea' es un miembro del objeto PD.components, el valor de este
	miembro sirve para para cargar el controlador de esa página

	+ El carácter _ está permitido dentro de la url ajax

	+ La forma de navegar entre las páginas es cargando el component de esa página

	+ PD.components se carga a traves de la carga del archivo /js/routes.js

· El controlador es un clase que hereda de Component

· El controlador es único por página, por ejemplo para index.html es Principal,
y se carga del elemento home del archivo de rutas

· El controlador es un tipo 'static like' (mirar principal.js)

· El layer base va a ser el propio index.html aunque también puede cargar algún js
situado /js/tpl/nombre_componente/layers

· Si el componente va a sobreescribir algún método recordar que si se antepone .prototype
se sobreescribe globalmente, esta práctica no está recomendada ya que obligaría a recargar
Component si este comportamiento no es deseado

· Cada template es una clase 'static like' que hereda de Template

· Para facilitar el pintado de html existe una clase 'static like' que general etiquetas
aunque obvia añadir eventos de JS para que se genere código no obstrusivo
