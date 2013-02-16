var Html = {
    render : function(tag, attributes, text, children){
        var result = '<' + tag;
		
        for(var attr in attributes)
            result += ' '+ attr + '="' + attributes[attr] + '"';

        if ( (text == undefined) && (children == undefined) )
            result += '/>';
        else if ( (children == undefined) && (text != undefined))
            result += '>' + text + '</' + tag + '>';
        else if ( (children != undefined) && (text == undefined))
        {
            result += '>';

            for(var i = 0; i < children.length; ++i)
                result += Html.render(children[i].tag, children[i].attributes, children[i].text, children[i].children);

            result += '</' + tag + '>';
        }
        
        return result;
    },
    
    list : function(tag, attributes, list_items){
        var children = Array();

        for(var i = 0; i < list_items.length; ++i){
            children[i] = {
                "tag": "li",
                "attributes" : list_items[i].attributes,
                "text" : list_items[i].text,
                "children" : undefined
            };
        }
        return Html.render(tag, attributes, undefined, children);
    },

    /***
    * @param attributes Atributos de la lista
    * @param list_items Array de {"attributes":"", "text":""} 
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    ul : function(attributes, list_items){
        return Html.list('ul', attributes, list_items);
    },
    
    /***
    * @param attributes Atributos de la lista
    * @param list_items Array de {"attributes":"", "text":""} 
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    ol: function(attributes, list_items){
        return Html.list('ol', attributes, list_items);
    },
    
    /***
    * @param attributes Atributos de la lista
    * @param options Array de {"value":"", "text":""} 
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    select : function(attributes, options){
        var children = Array();

        for(var i = 0; i < options.length; ++i){
            children[i] = {
                "tag": "option",
                "attributes" : {"value" : options[i].value},
                "text" : options[i].text,
                "children" : undefined
            };
        }
        return Html.render('select', attributes, undefined, children);
    },
    
    /***
     * @param attributes atributos de la tabla
     * @param cols nombre de los campos que van a aparecer en los header
     * @param rows filas de la tabla
     * @param paginator objeto con información para dibujar el paginador
     *
     ***/
    table : function(attributes, cols, rows, paginatorInfo){
        
    },

    /***
    * @param attributes Atributos de la etiqueta
    * @param content string que va a ser contenida
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    nav : function(attributes, content){
        return Html.render('nav', attributes, content, undefined);
    },

    /***
    * @param attributes Atributos de la etiqueta
    * @param text string que va a ser contenida
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    a : function(attributes, text){
        return Html.render('a', attributes, text, undefined);
    }
    
    

}