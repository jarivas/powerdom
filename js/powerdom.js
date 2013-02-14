var PD = {
    lang : 'es-ES',
    head : document.getElementsByTagName('head')[0],
    body : null,
    components : null,
    currentComponent : null,
    routesFile  : 'js/routes.js',
    urlAjax : 'ajax.php',
    strings : new Array(),

    init : function(){
        PD.loadComponentFromCurrentUrl();
        PD.currentComponent.render();
    },

    loadComponentFromCurrentUrl : function(){
        PD.loadComponent( PD.getComponentNameFromCurrentUrl() );
    },

    getComponentNameFromCurrentUrl : function(url){
        var patt = /#(([a-z]|_)+)+/i;
        var ajaxUrl = null;

        PD.loadJSFile(PD.routesFile);

        if(url == undefined)
            url = document.location.href;

        ajaxUrl = patt.exec(url);
        ajaxUrl = (ajaxUrl != null) ? ajaxUrl[1] : 'home';

        return PD.components[ajaxUrl];
    },

    setCurrentComponent : function(componentName){
        var className = componentName[0].toUpperCase() + componentName.substr(1);
        eval('PD.currentComponent = ' + className);
    },
    
    loadComponent : function(componentName){        
        try
        {
            PD.loadJSClass("js/components/" + componentName + '.js');
            PD.setCurrentComponent(componentName);
        }
        catch(err)
        {
            alert("Error en loadComponent url => " + componentName + " | " + err.message);
            return 0;
        }
    },

    go : function(url){
        if (url != undefined){
            document.location.href = url;
        }
        PD.init();         
    },
    
    loadJSClass : function(file){
        var req = PD.getXmlHttpObject();
        req.open('GET', file, false);
        req.send();
        eval(req.responseText);
		
    },

    loadJSFile : function(file){
        if(document.getElementById(file) == undefined)
        {
            var req = PD.getXmlHttpObject();
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
    
    ajax : function(controller, params, callback, async){
        var url = '';
        var xmlhttp = PD.getXmlHttpObject();

        url = PD.urlAjax + '?controller='+controller;

        for(var param in params)
            url += '&'+ param + '=' + params[param];

        xmlhttp.onreadystatechange = function(){
            PD.stateChanged(callback, xmlhttp);
        };
        
        if(async == undefined)
            async = true;
        
        xmlhttp.open('GET',url,async);
        xmlhttp.send(null);
    },

    getXmlHttpObject : function(){
        if (window.XMLHttpRequest)
            return new XMLHttpRequest();
        else if (window.ActiveXObject)
            return new ActiveXObject('Microsoft.XMLHTTP');
    },

    stateChanged : function(callback, xmlhttp){
        if (xmlhttp.readyState == 4)
        {
            var json = eval('(' + xmlhttp.responseText + ')');
            callback(json);
        }
    },

    loadInnerHtml : function(json){
        if(json.error == undefined)
            document.getElementById(json.id).innerHTML = json.data;
        else
            alert(json.error);
    }

}