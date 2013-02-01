var PD = {
    lang : 'es-ES',
    head : document.getElementsByTagName('head')[0],
    body : null,
    components : null,
    currentComponent : null,
    routesFile  : '/js/routes.js',
    strings : new Array(),

    init : function(){
        PD.loadComponentFromCurrentUrl();
        PD.currentComponent
    },

    getComponentNameFromCurrentUrl : function(){
        var patt = /#([a-z]|_)+/i;

        return patt.exec(document.location.href)[0];
    },

    loadComponentFromCurrentUrl : function(){
        PD.loadComponent( PD.getComponentNameFromCurrentUrl() );
    },

    getInstance : function(){

    },
    
    loadComponent : function(ajaxUrl){
        var result = false;
        var componentName = PD.components[ajaxUrl];

        PD.loadJSFile(PD.routesFile);
        try
        {
            PD.loadJSFile("/js/components/" + componentName);
            PD.currentComponent = PD.getInstance(componentName);
            result = true;
        }
        catch(err)
        {
            result = "Error en getComponent url => " + url + " | " + err.message;
        }
      
        return result;
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
    },

    translateString : function(str){
        var patt = /%%([\w]+)%%/i;
        var result = patt.exec(str);
    		
        while (result != null)
        {
            eval("str = str.replace('" + result[0] + "', PD.strings[PD.lang]['"  + result[1] + "'])");
            result = patt.exec(str);
        }

        return str;
    }
        
};