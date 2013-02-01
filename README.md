powerdom
========
Este proyecto está en desarrollo y este fichero sirve como
anotaciones para el mismo.

· Notación JSON para clases, que emulan clases estáticas 'static like'

· Notación normal para clases que van a ser instanciables normal además
tienen que implementar initialize, aunque el tema hay que analizarlo más
en profundidad para ver que es más correcto y conveniente

· Sólo un punto de entrada, index.html, el resto de url index.html
son sólo reescrituras:

	loquesea.html -> index.html#loquesea
	loquesea.html?param=value -> index.html#loquesea?param=value&...

	+ La url ajax 'loquesea' es un miembro del objeto PD.components, el valor de este
	miembro sirve para para cargar el controlador de esa página

	+ El carácter _ está permitido dentro de la url ajax

	+ La forma de navegar entre las páginas es cargando el component de esa págin

	+ PD.components se carga a traves de la carga del archivo /js/routes.js

· El controlador es un clase (analizar si static like o instancias tradicionales) que hereda de
Component

· El controlador es único por página, por ejemplo para index es principal

· El layer base va a ser el propio index.html aunque también puede cargar algún js
situado /js/tpl/nombre_componente/layers

· 