var PD = {
    lang : 'es-ES',
    head : document.getElementsByTagName('head')[0],
    body : '',
    components : '',
    currentComponent : '',
    routesFile  : '/js/routes.js',
    strings : new Array(),
    
    getCurrentComponenet : function(){
        //Se recorta la url ajax con el #
        var sharpIndex = window.location.href.indexOf('#');
        var url = 'default';
			
        if (sharpIndex != -1)
            url = window.location.href.substr(sharpIndex + 1);
        
        return PD.getComponenet(url);
    },
    getComponenet : function(url){
        var result = {
            "componenet" : null,
            "errors" : []
        };
        var componentName = "";
      
        PD.loadJSFile(PD.routesFile);
        try
        {
            componentName = PD.componenets[url];
            PD.loadJSFile("/js/components/" + componentName);
            result.componenet = eval("new " + componentName +"()");
        }
        catch(err)
        {
            result.errors[0] = "Error en getComponenet url => " + url + " | " + err.message;
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

String.prototype.format = function() {
var args = arguments;
return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
        ? args[number]
    : match
    ;
});
};
