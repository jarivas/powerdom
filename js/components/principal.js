function principal(){
    this.className = 'principal';
    this.nodes = {
            "banner" : "banner",
            "featured" : "featured"
    };
    
}

principal.prototype = new Component();

Principal = new principal();