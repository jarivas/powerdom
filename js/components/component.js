function Component(){
    //Only change this when need it and do it private whithout prototype
    _templatePath = "/js/tpl/";

    _className = "Component";

    nodes = null;
    
    Component.prototype.getTemplate = function(templateName){
        PD.loadJSFile(Component._templatePath + Component._className + templateName + ".js");
        return eval("new " + templateName + "();");
    };
    
    Component.prototype.getDataTemplate = function(idNode){
        var method = 'this.getDataNode_idNode();'.replace('idNode', idNode);
        return eval(method);
    };
    
    Component.prototype.render = function(){
        var tpl = null;
        var dataTemplate = null;

        for(idNode in nodes){
            dataTemplate = Component.getDataTemplate(idNode);
            tpl = Component.getTemplate(Component.nodes[idNode]);
            tpl.render(dataTemplate);
        }
    };
}