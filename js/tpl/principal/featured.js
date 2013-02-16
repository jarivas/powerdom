function featured(){
    this.html =
    '<aside id="featured" class="body"><article>'+
        '<figure>'+
        	'<img src="images/sm-logo.gif" alt="Smashing Magazine" />'+
		'</figure>'+
		'<hgroup>'+
		'<h2>{{cabecera}}</h2>'+
		'<h3><a href="#">{{subCabecera}}</a></h3>'+
		'</hgroup>'+
		'<p>{{contenido}}</p>'+
	'</article></aside><!-- /#featured -->';

}

featured.prototype = new Template();

Featured = new featured();
