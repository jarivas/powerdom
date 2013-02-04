function Template(){
    Template.prototype.html = null;
    
    Template.prototype.render = function(data){
        return Template.html.replace(/%%([\w]+)%%/g, function(match, varName) { 
            return typeof data[varName] != 'undefined'
                ? data[varName] : match;
            });
    }
}