function Template(){
    this.html = null;
    
    this.getData = function(){
        alert('Implementar getData para' + this.idNode)
    };

    this.render = function(idNode){
        var data = this.getData();
        var result = this.html.replace(/%%([\w]+)%%/g, function(match, varName) { 
            return typeof data[varName] != 'undefined'
                ? data[varName] : match;
            });

        document.getElementById(idNode).outerHTML = result;
    };
}
