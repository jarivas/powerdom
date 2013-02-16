function Template(){
    this.html = null;

    this.render = function(data, elementId){
        var result = this.html.replace(/{{([\w]+)}}/g, function(match, varName) { 
            return typeof data[varName] != 'undefined'
            ? data[varName] : match;
        });

        document.getElementById(elementId).outerHTML = result;
    };
}
