function banner(){
    this.html = '<header id="banner" class="body">'+
        '<h1><a href="#">%%headerTitle%%></a></h1>'+
        '<nav>%%nav_menu%%</nav>'+
	'</header><!-- /#banner -->';

    this.nav_menu = function(){
    	var result = null;

    	var list_items = [
    		{
    			"attributes" : {"class" : "active"},
    			"text"  : "Home"
    		},
    		{
    			"text"  : "portfolio"
    		},
    		{
    			"text"  : "blog"
    		},
    		{
    			"text"  : "contact"
    		},
    	];

    	result = Html.nav(undefined, Html.ul(undefined, list_items));

    	return result;
    };

}

banner.prototype = new Template();

Banner = new banner();