var Html = {
    render : function(tag, attributes, text, children){
        var result = '<' + tag;
		
        for(var attr in attributes)
            result += ' '+ attr + '="' + attributes[attr] + '"';

        if ( (text == undefined) && (children == undefined) )
        {
            result += '/>';
        }
        else if ( (children == undefined) && (text != undefined))
        {
            result += '>' + text + '</' + tag + '>';
        }
        else if ( (children != undefined) && (text == undefined))
        {
            result += '>';

            for(var i = 0; i < children.length; ++i)
                result += Html.render(children[i].tag, children[i].attributes, children[i].text, children[i].children);

            result += '</' + tag + '>';
        }
			

        return result;
    },

    /***
	* @param attributes Atributos de la lista
	* @param list_items Array de {"attributes":"", "text":""} 
	* attributes es un mapa  "atributo" : "value", en el caso de no tener usar undefined
	***/
    ul : function(attributes, list_items){
        var children = Array();

        for(var i = 0; i < list_items.length; ++i){
            children[i] = {
                "tag": "li",
                "attributes" : list_items[i].attributes,
                "text" : list_items[i].text,
                "children" : undefined
            };
        }
        return Html.render('ul', attributes, undefined, children);
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