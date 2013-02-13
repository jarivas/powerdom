function featured(){
    this.html =
    '<aside id="featured" class="body"><article>'+
        '<figure>'+
        	'<img src="images/sm-logo.gif" alt="Smashing Magazine" />'+
		'</figure>'+
		'<hgroup>'+
		'<h2>%%cabecera%%</h2>'+
		'<h3><a href="#">%%subCabecera%%</a></h3>'+
		'</hgroup>'+
		'<p>%%contenido%%</p>'+
	'</article></aside><!-- /#featured -->';
    
    this.getData = function(){
        return {
            "cabecera" : "PowerDOM",
            "subCabecera" : "El marco de trabajo JavaScript ligero y eficiente que os sorprenderá",
            "contenido" : "El marco de trabajo JavaScript ligero y eficiente que os sorprenderá"
        }
    };

}

featured.prototype = new Template();

Featured = new featured();