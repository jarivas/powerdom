function Component(){
    //Only change this when need it and do it private whithout prototype
    _templatePath = "/js/tpl/";

    _className = "Component";

    nodes = null;
    
    Component.prototype.loadTemplate = function(templateName){
        PD.loadJSFile(Component._templatePath + Component._className + templateName + ".js");
    };
    
    Component.prototype.getDataTemplate = function(idNode){
        var method = 'getDataNode_[0]();';
        method = method.format(idNode);
        return eval(invoke);
    };
    
    Component.prototype.render = function(){
        var tpl = null;
        var dataTemplate = null;
        
        for(idNode in nodes){
            dataTemplate = Component.getDataTemplate(idNode);
            tpl = Component.loadTemplate(Component.nodes[idNode]);
            tpl.render(dataTemplate);
        }
    };
}