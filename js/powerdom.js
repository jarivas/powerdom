var PD = {
    lang : 'es-ES',
    head : document.getElementsByTagName('head')[0],
    body : null,
    components : null,
    currentComponent : null,
    routesFile  : 'js/routes.js',
    strings : new Array(),

    init : function(){
        PD.body = document.getElementsByTagName('body')[0];
        PD.loadComponentFromCurrentUrl();
        PD.currentComponent.render();
    },

    loadComponentFromCurrentUrl : function(){
        PD.loadComponent( PD.getComponentNameFromCurrentUrl() );
    },

    getComponentNameFromCurrentUrl : function(){
        var patt = /#([a-z]|_)+/i;
        var componentName = patt.exec(document.location.href);

        return (componentName != null) ? componentName[0] : 'principal';
    },

    setCurrentComponent : function(componentName){
        var className = componentName[0].toUpperCase() + componentName.substr(1);
        eval('PD.currentComponent = ' + className);
    },
    
    loadComponent : function(componentName){        
        try
        {
            PD.loadJSFile(PD.routesFile);
            PD.loadJSFile("js/components/" + componentName + '.js');
            PD.setCurrentComponent(componentName);
        }
        catch(err)
        {
            alert("Error en loadComponent url => " + componentName + " | " + err.message);
            return 0;
        }
    },

    loadJSFile : function(file){
        if(document.getElementById(file) == undefined)
        {
            var req = new XMLHttpRequest();
            req.open('GET', file, false);
            req.send();
            eval(req.responseText);
			
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = file;
            PD.head.appendChild(script);
        }
		
    },
	
    loadCSSFile : function(file){
        if (document.getElementById(file) == undefined)
        {
            var css = document.createElement('link');
            css.href = file;
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.id = file;

            var cssAdded = false;
	 
            css.onload = css.onreadystatechange = function () {
                if (!cssAdded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'))
                {
                    cssAdded = true;
                    css.onload = css.onreadystatechange = null;
                };
            };
	 
            PD.head.appendChild(css);
        }
    },

    getExtension : function(file){
        var pattern = /js/g;
        return (pattern.test(file)) ? 'js' : 'css';
    }
        
};