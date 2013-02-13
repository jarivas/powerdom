function principal(){
    this.className = 'principal';
    this.nodes = {
        "banner" : "banner",
        "featured" : "featured"
    };
    
    this.getDataNode_banner = function(){
        var headerTitle = 'Smashing <strong>Simple Page Interface</strong>';
        var nav_menu = Banner.nav_menu();
        
        return {
            "headerTitle" : headerTitle,
            "nav_menu" : nav_menu
        }
    };

    this.getDataNode_featured = function(){
        return {
            "cabecera" : "PowerDOM",
            "subCabecera" : "El marco de trabajo JavaScript ligero y eficiente que os sorprenderá",
            "contenido" : "Contenido de principal"
        }
    };
    
}

principal.prototype = new Component();

Principal = new principal();