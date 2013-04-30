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
     * @param cols array de string nombre de los campos que van a aparecer en los header
     * @param rows array de arrays de string filas de la tabla
     * @param attributes Atributos de la etiqueta
     * @param ColsAttributes atributos de los th
     * @param RowsAttributes atributos de los td
     * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
     ***/
    table : function(cols, rows, attributes, ColsAttributes, RowsAttributes){
        var children = Array();
        
        children.push(Html.row('th', cols, ColsAttributes));

        for(var i = 0; i < rows.length; ++i){
            children.push(Html.row('td', rows[i], RowsAttributes));
        }
        
        return Html.render('table', attributes, undefined, children);
    },
    
    row : function(cellType, cells, attributes){
        var row = {
                "tag": "tr",
                "attributes" : attributes,
                "text" : undefined,
                "children" : undefined
        };
        var children = Array();
        
        for(var i = 0; i < cells.length; ++i){
            children[i] = {
                "tag": cellType,
                "attributes" : attributes,
                "text" : cells[i],
                "children" : undefined
            };
        }
        row.children = children;
        
        return row;
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