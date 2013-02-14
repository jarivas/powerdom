var Common = {
    nav_menu : function(activeItem){
        var result = null;

        var list_items = [
        {
            "text"  : Html.a({
                "href":"#home"
            },"Home")
        },
        {
            "text"  : Html.a({
                "href":"#portfolio"
            },"portfolio")
        },
        {
            "text"  : Html.a({
                "href":"#"
            },"blog")
        },
        {
            "text"  : Html.a({
                "href":"#"
            },"contact")
        },
        ];
        
        for(var i = 0; i < list_items.length; ++i){
            if (list_items[i].text.indexOf(activeItem) != -1){
                list_items[i].attributes = {
                    "class" : "active"
                };
            }
        }

        result = Html.nav(undefined, Html.ul(undefined, list_items));

        return result;
    },
    
    getContent : function(){
        PD.ajax('getTime', null, PD.loadInnerHtml, true);
    }
}
