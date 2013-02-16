function banner(){
    this.html = '<header id="banner" class="body">'+
        '<h1><a href="#">{{headerTitle}}</a></h1>'+
        '{{nav_menu}}'+
	'</header><!-- /#banner -->';
}

banner.prototype = new Template();

Banner = new banner();