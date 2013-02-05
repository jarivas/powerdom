var Html = {
	render : function(tag, attributes, text, children){
		var result = '<' + tag;
		
		for(attr in attributes)
			result += ' '+ attr + ' = "' + attributes[attr] + '"';

		if ( (text == undefined) && (child == undefined) )
		{
			result += '/>';
		}
		else if (child == undefined)
		{
			result += '>' + text + '</' tag + '>';
		}
		else if (text == undefined)
		{
			result += '>';

			for(child in children)
				result += Html.render(child[tag], child[attributes], child[text], child[children]);

			result += '</' tag + '>';
		}
			

		return result;
	},

	/***
	* @param attributes Atributos del la lista
	* @param list_items Array de {"attributes":"", "text":""} 
	* attributes es un mapa  "atributo" : "value"
	***/
	ul : function(attributes, list_items){
		var children = Array();

		for(var i = 0; i < list_items.length; ++i)
			children[] = 

		return Html.render('ul', attributes, undefined, children);
	}

}