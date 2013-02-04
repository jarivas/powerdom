function Component(){
    //Only change this when need it and do it private whithout prototype
    _templatePath = "/js/tpl/";

    _className = "Component";

    _nodes = null;
    
    Component.prototype.loadViewNode = function(templateName){
        PD.loadJSFile(_templatePath + _className + templateName + ".js");
    };
    
    Component.prototype.render = function(){
        alert('Implentar Component.render');
    }
}