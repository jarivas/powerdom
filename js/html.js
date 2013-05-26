var Html = {
    renderAttributes : function(attributes){
        var result = '';

        for(var attr in attributes)
        {
            result += ' '+ attr + '="' + attributes[attr] + '"';
        }

        return result;
    },

    render : function(tag, attributes, text, children){
        var result = '<' + tag;
		
        result += Html.renderAttributes(attributes);

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

    /***
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param list_items Array de {'attributes':'', 'text':''} 
    * attributes es un mapa  'atributo' : 'value'
    ***/
    ul : function(attributes, list_items){
        return Html.itemList('ul', attributes, list_items);
    },
    
    /***
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param list_items Array de {'attributes':'', 'text':''} 
    * attributes es un mapa  'atributo' : 'value'
    ***/
    ol: function(attributes, list_items){
        return Html.itemList('ol', attributes, list_items);
    },
    
    /***
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param dt_items Array de elementos dt
    * @param dd_items Array de elementos dd
    * attributes es un mapa  'atributo' : 'value'
    ***/
    dl: function(attributes, dt_items, dd_items){
        var result = '<dl>';

        result += Html.renderAttributes(attributes);
        for(var i = 0; i < dt_items.length; ++i)
        {
            result += '<dt>' + dt_items[i] + '</dt><dd>' +  dd_items[i] + '</dd>';
        }
        result += '</dl>';

        return result;

    },

    itemList : function(tag, attributes, list_items){
        var result = '<' + tag + '>';

        result += Html.renderAttributes(attributes);
        for(var list_item in list_items)
        {
            result += '<li ' + Html.renderAttributes(list_item.attributes) + '>' + list_item.text + '</li>';
        }
        result += '</' + tag + '>';
        
        return result;
    },
    
    /***
    * Genera una lista desplegable
    * @param attributes Atributos de la lista, en el caso de no tener usar undefined
    * @param options Array de {'value':'', 'text':''} 
    * attributes es un mapa  'atributo' : 'value'
    ***/
    select : function(attributes, options){
        var result = '<select>';

        result += Html.renderAttributes(attributes);
        for(var option in options)
        {
            result += '<option value="' + option.value + '">' + option.text + '</option>';
        }
        result += '</select>';
        
        return result;
    },

    /***
     * @param cols array de string nombre de los campos que van a aparecer en los header
     * @param rows array de arrays de string filas de la tabla
     * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
     * @param ColsAttributes atributos de los th, en el caso de no tener usar undefined
     * @param RowsAttributes atributos de los td, en el caso de no tener usar undefined
     * los atributos es un mapa  'atributo' : 'value'
     ***/
    table : function(cols, rows, attributes, ColsAttributes, RowsAttributes){
        var result = '<table ' + Html.renderAttributes(attributes) + '>';
        result += Html.row('th', cols, ColsAttributes);
        
        for(var row in rows){
            result += Html.row('td', row, RowsAttributes);
        }

        return result;
    },
    
    row : function(cellType, cells, attributes){
        var result = '<tr ' + Html.renderAttributes(attributes) + '>';
        
        for(var cell in cells){
            result += '<' + cellType + '>' + cell + '</' + cellType + '>';
        }
        
        result += '</tr>';
        
        return result;
    },

    /***
    * Genera un formulario con sus campos
    * @param attributes atributos del formulario
    * @param listType tipo de lista que va a contener los elementos del form 'ol', 'ul'
    * @param listAttributes atributos de la lista
    * @param fieldSets Array de {legend:text, fields:[{inputType:text, params:{}, label:text}]
    * legend es la leyenda del fieldset
    * inputType cualquiera de las etiquetas expuestas en esta clase
    * params los parámetros que se le van a pasar en la llamada a la función que pinta la etiqueta
    * label el texto que se pintará dentro del label que acompañará al campo y también será su atributo name y id
    * los atributos son un mapa  'atributo' : 'value'
    ***/
    form : function(attributes, listType, listAttributes, fieldSets){
        var result = '<form ' + Html.renderAttributes(attributes) + '>';
        
        result += '<' + listType + ' ' + listAttributes + '>';
        
        for(var fieldSet in fieldSets){
            result += Html.fieldSet(fieldSet);
        }
        
        result += '<' + listType + '>' + '</form>';
        
        return result;
    },
    
    renderFieldSet : function(fieldSet){
        var result = '<fieldset><legend>' + fieldSet.legend + '</legend>';
        
        for(var field in fieldSet.fields){
            result += '<li><label for="' + field.label + '">' + field.label + '</label>';
            result += Html.renderField(field) + '</li>';
        }
        
        return result;
    },
    
    renderField : function(field){
        var f = 'Html.' + field.inputType + '(';
        
        for(var key in Object.keys(field.params)){
            f += 'field.' + key + ',';
        }
        
        f = substr(0, -1) + ')';
        
        return eval(f);
    },

    /***
    * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
    * @param content string que va a ser contenida
    * attributes es un mapa  'atributo' : 'value'
    ***/
    nav : function(attributes, content){
        return Html.render('nav', attributes, content, undefined);
    },

    /***
    * @param attributes Atributos de la etiqueta, en el caso de no tener usar undefined
    * @param text string que va a ser contenida
    * attributes es un mapa  'atributo' : 'value'
    ***/
    a : function(attributes, text){
        return Html.render('a', attributes, text, undefined);
    },
    
    /***
    * Genera un input de tipo text
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    text : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = 'text';

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo password
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    password  : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = 'password';

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo password
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    radio : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = 'radio';

        return Html.render('input', a);
    },
    
    /***
    * Genera un input de tipo checkbox
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    checkbox : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = 'checkbox';

        return Html.render('input', a);
    },
    
    /***
    * Genera un botón submit
    * @param attributes
    * attributes es un mapa  'atributo' : 'value', en el caso de no tener usar undefined
    ***/
    submit : function(attributes){
        var a = (attributes != undefined) ? attributes : {};
        a.type = 'submit';

        return Html.render('input', a);
    },
    
    /***
    * Genera un input textearea
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    textarea : function(attributes){
        return Html.render('textarea', attributes);
    },
    
    /***
    * Genera un botón
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    button : function(attributes){
        return Html.render('button', attributes);
    },

    /***
    * Genera un campo autocompletar
    * @param attributes atributos del elemento list
    * @param options Array de {'value':'', 'text':''} 
    * @param listID es el valor que enlazar este campo con datalist
    * Ejemplo de uso http://w3schools.com/tags/tag_datalist.asp
    * attributes es un mapa  'atributo' : 'value', en el caso de no tener usar undefined
    ***/
    autoComplete : function(attributes, options, listID){
        var a = (attributes != undefined) ? attributes : {};
        a.list = listID;

        return Html.render('input', a) + Html.render('datalist', {'id':listID}, undefined, Html.optionList(options));
    },

    /***
    * Genera un campo de autogenerar contraseña
    * @param attributes
    * Ejemplo de uso http://w3schools.com/tags/tag_keygen.asp
    * attributes es un mapa  'atributo' : 'value'
    ***/
    keygen : function(attributes){
        return Html.render('keygen', attributes);
    },

    /***
    * Genera una imagen
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    img : function(attributes){
        return Html.render('img', attributes);
    },

    /***
    * Genera un header 1
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    h1 : function(attributes){
        return Html.render('h1', attributes);
    },

    /***
    * Genera un header 2
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    h2 : function(attributes){
        return Html.render('h2', attributes);
    },

    /***
    * Genera un header 3
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    h3 : function(attributes){
        return Html.render('h3', attributes);
    },

    /***
    * Genera un párrrafo
    * @param attributes
    * attributes es un mapa  'atributo' : 'value'
    ***/
    p : function(attributes){
        return Html.render('p', attributes);
    },

    /***
    * Genera un salto de línea
    ***/
    br : function(){
        return Html.render('br', undefined);
    },

    /***
    * Genera un mapa de imagen
    * @param attributes atributos del elemento list
    * @param areas Array de {shape,coords,href,alt}
    * @param mapName es el valor que enlaza la imagen con las areas
    * Ejemplo de uso http://w3schools.com/tags/tag_map.asp
    * attributes es un mapa  'atributo' : 'value', en el caso de no tener usar undefined
    ***/
    imageMap : function(attributes, areas, mapName){
        var a = (attributes != undefined) ? attributes : {};
        var result = '<map name="' + mapName + '">';

        a.usemap = '#' + mapName;

        for(var area in areas){
            result += '<area ' + Html.renderAttributes(area) + '>';
        }
        
        result += '</map>';

        return Html.render('img', a) + result;
    }


}