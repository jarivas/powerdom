var Html = {
    render : function(tag, attributes, text, children){
        var result = '<' + tag;
		
        for(var attr in attributes)
        {
            result += ' '+ attr + '="' + attributes[attr] + '"';
        }

        if ( (text == undefined) && (children == undefined) )
        {
            result += '/>';
        }
        else if ( (children == undefined) && (text != undefined) )
        {
            result += '>' + text + '</' + tag + '>';
        }
        else if ( (children != undefined) && (text == undefined) )
        {
            result += '>';

            for(var i = 0; i < children.length; ++i)
            {
                result += Html.render(children[i].tag, children[i].attributes, children[i].text, children[i].children);
            }

            result += '</' + tag + '>';
        }
        
        return result;
    },
    
    itemList : function(tag, attributes, list_items){
        var children = Array();

        for(var i = 0; i < list_items.length; ++i)
        {
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
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param list_items Array de {"attributes":"", "text":""} 
    * attributes es un mapa  "atributo" : "value"
    ***/
    ul : function(attributes, list_items){
        return Html.itemList('ul', attributes, list_items);
    },
    
    /***
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param list_items Array de {"attributes":"", "text":""} 
    * attributes es un mapa  "atributo" : "value"
    ***/
    ol: function(attributes, list_items){
        return Html.itemList('ol', attributes, list_items);
    },

    optionList : function(options){
        var children = Array();

        for(var i = 0; i < options.length; ++i)
        {
            children[i] = {
                "tag": "option",
                "attributes" : {"value" : options[i].value},
                "text" : options[i].text,
                "children" : undefined
            };
            
        }

        return children;
    }
    
    /***
    * Genera una lista desplegable
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param options Array de {"value":"", "text":""} 
    * attributes es un mapa  "atributo" : "value"
    ***/
    select : function(attributes, options){
        return Html.render('select', attributes, undefined, Html.optionList(options));
    },
    
    /***
     * @param cols array de string nombre de los campos que van a aparecer en los header
     * @param rows array de arrays de string filas de la tabla
     * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
     * @param ColsAttributes atributos de los th, en el caso de no tener usar undefined
     * @param RowsAttributes atributos de los td, en el caso de no tener usar undefined
     * los atributos es un mapa  "atributo" : "value"
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
    * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
    * @param content string que va a ser contenida
    * attributes es un mapa  "atributo" : "value"
    ***/
    nav : function(attributes, content){
        return Html.render('nav', attributes, content, undefined);
    },

    /***
    * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
    * @param text string que va a ser contenida
    * attributes es un mapa  "atributo" : "value"
    ***/
    a : function(attributes, text){
        return Html.render('a', attributes, text, undefined);
    },
    
    /***
    * Genera un input de tipo text
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    text : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = "text";

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo password
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    password  : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = "password";

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo password
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    radio : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = "radio";

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo checkbox
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    checkbox : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = "checkbox";

        return Html.render('input', a);
    },
    
    /***
    * Genera un botón submit
    * @param attributes
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    submit : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = "submit";

        return Html.render('input', a);
    },
    
    /***
    * Genera un input textearea
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    textarea : function(attributes){
        return Html.render('textarea', attributes);
    },
    
    /***
    * Genera un botón
    * @param attributes
    * attributes es un mapa  "atributo" : "value"
    ***/
    button : function(attributes){
        return Html.render('button', attributes);
    }

    /***
    * Genera un campo autocompletar
    * @param attributes atributos del elemento list
    * @param options Array de {"value":"", "text":""} 
    * @param listID es el valor que enlazar este campo con datalist
    * Ejemplo de uso http://w3schools.com/tags/tag_datalist.asp
    * attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
    ***/
    autoComplete : function(attributes, options, listID){
        var a = (attributes != undefined) ? attributes : {};
        a.list = listID;

        return Html.render('input', a) + Html.render('datalist', {"id":listID}, undefined, Html.optionList(options));
    },

    /***
    * Genera un campo de autogenerar contraseña
    * @param attributes
    * Ejemplo de uso http://w3schools.com/tags/tag_keygen.asp
    * attributes es un mapa  "atributo" : "value"
    ***/
    keygen : function(attributes){
        return Html.render('keygen', attributes);
    },

    formItemList : function(attributes, list_items){
        var children = Array();

        for(var i = 0; i < list_items.length; ++i)
        {
            children[i] = {
                "tag": "li",
                "attributes" : list_items[i].attributes,
                "text" : list_items[i].text,
                "children" : undefined
            };
        }

        return children;
    },

    /***
    * Genera una grupo de elementos de formulario relacionados
    * @param attributes
    * @param forms_items es un Array de {input, id, name}
    * attributes es un mapa  "atributo" : "value"
    ***/
    fieldSet: function(attributes, listType, forms_items){
        var children = Html.formItemList();

        return {
                "tag": "fieldset",
                "attributes" : attributes,
                "text" : undefined,
                "children" : [{
                        "tag": listType,
                        "attributes" : attributes,
                        "text" :undefined,
                        "children" : children
                }]
        };
    },

    /***
    * Genera un formulario y su contenido
    * @param formAttributes atributos del formulario
    * @param fieldSets Array de {attributes, listType, [{input, id, name}]}
    * los atributos son un mapa  "atributo" : "value"
    ***/
    form : function(attributes, fieldSets){
        var children = Array();

        for(var i = 0; i < fieldSets.length; ++i){
            children.push(Html.fieldSet(fieldSets[i].attributes, fieldSets[i].listType, fieldSets[i].forms_items));
        }
        
        return Html.render('form', attributes, undefined, children);
    }
    

}