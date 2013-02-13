function banner(){
    this.html = '<header id="banner" class="body">'+
        '<h1><a href="#">%%headerTitle%%</a></h1>'+
        '%%nav_menu%%'+
	'</header><!-- /#banner -->';

    this.nav_menu = function(){
    	var result = null;

    	var list_items = [
            {
                "attributes" : {"class" : "active"},
                "text"  : Html.a({"href":"#home"},"Home")
            },
            {
                "text"  : Html.a({"href":"#portfolio"},"portfolio")
            },
            {
                "text"  : Html.a({"href":"#"},"blog")
            },
            {
                "text"  : Html.a({"href":"#"},"contact")
            },
        ];

    	result = Html.nav(undefined, Html.ul(undefined, list_items));

    	return result;
    };

}

banner.prototype = new Template();

Banner = new banner();