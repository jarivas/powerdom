function Component(){
    this._nodes = null;
    this._templatePath = "/js/tpl/";
    this._className = "Component";
    this.templates = null;
    
    Component.prototype.getViewNode = function(idNode){
        PD.loadJSFile(this._templatePath + this._className + idNode + ".js");
        return this.templates[idNode];
    };
    
    Component.prototype.renderViewNode = function(idNode){
        alert("Implementar Component.renderViewNode");
    };
    
    Component.prototype.getData = function(){
        alert("Implementar Component.getData");
    };
    
    Component.prototype.render = function(){
        alert("Implementar Component.render");
    }
}