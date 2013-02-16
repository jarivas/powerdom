function Component(){
    this.className = 'Component';
    this.templatePath = "js/tpl/";
    this.nodes = null;
    this.currentTemplate = null;

    this.setCurrentTemplate = function(templateName){
        var className = templateName[0].toUpperCase() + templateName.substr(1);
        eval('this.currentTemplate = ' + className);
    };
    
    this.getTemplate = function(templateName){
        PD.loadJSClass(this.templatePath + this.className + "/" + templateName + ".js");
        this.setCurrentTemplate(templateName);
    };
    
    this.getDataTemplate = function(idNode){
        var method = 'this.getDataNode_idNode();'.replace('idNode', idNode);
        return eval(method);
    };

    this.updateAjaxLinks = function(){
        var links = document.getElementsByTagName("a");
        var sharpPos = -1;
        var domainPos = -1;
        
        for(var i = 0; i < links.length; ++i){
            sharpPos = links[i].href.indexOf('#');

            if(sharpPos != -1){
                domainPos = links[i].href.indexOf(document.domain);

                if(domainPos != -1){
                    links[i].onclick = function(){PD.go(this.href)};
                }
            }
        }

    };
    
    this.render = function(){
        var dataTemplate = null;

        for(var idNode in this.nodes){
            this.getTemplate(this.nodes[idNode]);
            dataTemplate = this.getDataTemplate(idNode);
            this.currentTemplate.render(dataTemplate, idNode);
        }

        this.updateAjaxLinks();
    };
}