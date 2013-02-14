function principal(){
    this.className = 'principal';
    this.nodes = {
        "banner" : "banner",
        "featured" : "featured",
        "content" : "content"
    };
    
    this.getDataNode_banner = function(){
        var headerTitle = 'Smashing <strong>Simple Page Interface</strong>';
        var nav_menu = Common.nav_menu('#home');
        
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
    
    this.getDataNode_content = function(){
        return Common.getContent();
    };
    
}

principal.prototype = new Component();

Principal = new principal();