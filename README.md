powerdom
========
Este proyecto está en desarrollo y este fichero sirve como
anotaciones para el mismo.

· Sólo un punto de entrada, index.html, el resto de url index.html
son sólo reescrituras:

	loquesea.html -> index.html#loquesea
	loquesea.html?param=value -> index.html#loquesea?param=value&...

	+ La url ajax 'loquesea' es un miembro del objeto PD.components, el valor de este
	miembro sirve para para cargar el controlador de esa página

	+ El carácter _ está permitido dentro de la url ajax

	+ PD.components se carga a traves de la carga del archivo /js/routes.js

· El controlador de es un clase (recordar que no puede ser estática por herencia) que hereda de
Component

· El controlador es único por página, por ejemplo para index es principal

· El layer base va a ser el propio index.html aunque también puede cargar algún js
situado /js/tpl/layer/nombre_componente/layers

· 