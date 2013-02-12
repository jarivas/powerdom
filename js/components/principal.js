function principal(){
    this.className = 'principal';
    this.nodes = {
            "banner" : "banner"
    };
    
    this.getDataNode_banner = function(){
        var headerTitle = 'Smashing <strong>Simple Page Interface</strong>';
        var nav_menu = Banner.nav_menu();
        
        return {
            "headerTitle" : headerTitle,
            "nav_menu" : nav_menu
        }
    };
    
}

principal.prototype = new Component();

Principal = new principal();