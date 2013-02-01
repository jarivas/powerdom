function Component(){
    this._nodes = null;
    this._templatePath = "/js/tpl/";
    this._className = "Component";
    
    Component.prototype.loadViewNode = function(idNode){
        PD.loadJSFile(this._templatePath + this._className + this._nodes[idNode] + ".js");
    };
    
    Component.prototype.render = function(){
        alert("Implementar Component.render");
    }
}