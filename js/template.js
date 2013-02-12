function Template(){
    this.html = null;

    this.render = function(data){
        return this.html.replace(/%%([\w]+)%%/g, function(match, varName) { 
            return typeof data[varName] != 'undefined'
                ? data[varName] : match;
            });
    }
}
