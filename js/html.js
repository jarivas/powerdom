var Html = {
	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	renderAttributes: function(attributes) {
		var result = '';

		for (var attr in attributes)
		{
			result += ' ' + attr + '="' + attributes[attr] + '"';
		}

		return result;
	},
	/**
	 * @param {string} tag
	 * @param {attribute{String}:value{String}} attributes 
	 * @param {string} text
	 * @param {array[tag, attributes, text, children]} children
	 * @returns {String}
	 */
	render: function(tag, attributes, text, children) {
		var result = '<' + tag;

		result += Html.renderAttributes(attributes);

		if ((text === undefined) && (children === undefined))
		{
			result += '/>';
		}
		else if ((children === undefined) && (text !== undefined))
		{
			result += '>' + text + '</' + tag + '>';
		}
		else if ((children !== undefined) && (text === undefined))
		{
			result += '>';

			for (var i = 0; i < children.length; ++i)
			{
				result += Html.render(children[i].tag, children[i].attributes, children[i].text, children[i].children);
			}

			result += '</' + tag + '>';
		}

		return result;
	},
	/***
	 * @param {attribute{String}:value{String}} attributes 
	 * @param [['attributes'{String}, 'text'{String}]] list_items
	 * @returns {String}
	 ***/
	ul: function(attributes, list_items) {
		return Html.itemList('ul', attributes, list_items);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes 
	 * @param [['attributes'{String}, 'text'{String}]] list_items
	 * @returns {String}
	 ***/
	ol: function(attributes, list_items) {
		return Html.itemList('ol', attributes, list_items);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes 
	 * @param ['text'{String}] dt_items
	 * @param ['text'{String}] dd_items
	 * @returns {String}
	 ***/
	dl: function(attributes, dt_items, dd_items) {
		var result = '<dl';

		result += Html.renderAttributes(attributes) + '>';
		for (var i = 0; i < dt_items.length; ++i)
		{
			result += '<dt>' + dt_items[i] + '</dt><dd>' + dd_items[i] + '</dd>';
		}
		result += '</dl>';

		return result;

	},
	itemList: function(tag, attributes, list_items) {
		var result = '<' + tag;

		result += Html.renderAttributes(attributes) + '>';

		for (var i = 0; i < list_items.length; ++i)
		{
			result += '<li' + Html.renderAttributes(list_items[i][0]) + '>' + list_items[i][1] + '</li>';
		}
		result += '</' + tag + '>';

		return result;
	},
	/***
	 * @param {attribute{String}:value{String}} attributes 
	 * @param {value{String}:text{String}} options
	 * @param {String} selectedOption
	 * @returns {String}
	 ***/
	select: function(attributes, options, selectedOption) {
		var result = '<select';
		var selected = '';
		
		selectedOption = (selectedOption !== undefined) ? selectedOption : '';
		result += Html.renderAttributes(attributes) + '>';

		for (var i = 0; i < options.length; ++i)
		{
			if (typeof options[i] === 'string') {
				result += '<option value="' + options[i] + '"';
				result += (options[i] === selectedOption) ? ' selected="selected"' : '';
				result += '>' + options[i] + '</option>';
			} else {
				if (typeof selectedOption === 'string') {
					selected = (options[i].value === selectedOption) ? ' selected="selected"' : '';
				} else if( (selectedOption instanceof Array) && (selectedOption.length > 0) ){
					selected = (selectedOption.indexOf(options[i].value) !== -1) ? ' selected="selected"' : '';
				} else {
					selected = '';
				}
				result += '<option value="' + options[i].value + '"';
				result += selected;
				result += '>' + options[i].text + '</option>';
			}

		}
		result += '</select>';

		return result;
	},
	/***
	 * @param [columns_name{String}] cols
	 * @param [ [cell{String}] ] rows
	 * @param {attribute{String}:value{String}} attributes
	 * @param {attribute{String}:value{String}} ColsAttributes 
	 * @param {attribute{String}:value{String}} RowsAttributes
	 * @returns {String}
	 ***/
	table: function(cols, rows, attributes, ColsAttributes, RowsAttributes) {
		var result = '<table' + Html.renderAttributes(attributes) + '>';
		result += Html.row('th', cols, ColsAttributes);

		for (var row in rows) {
			result += Html.row('td', row, RowsAttributes);
		}

		return result;
	},
	row: function(cellType, cells, attributes) {
		var result = '<tr' + Html.renderAttributes(attributes) + '>';

		for (var cell in cells) {
			result += '<' + cellType + '>' + cell + '</' + cellType + '>';
		}

		result += '</tr>';

		return result;
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} listType possible values 'ol', 'ul'
	 * @param {attribute{String}:value{String}} listAttributes
	 * @param [ {legend{String}, fields[{inputType{String}, params{}, label{String}]} ] fieldSets
	 * @param {attribute{String}:value{String}} liAttributes
	 * @returns {String}
	 ***/
	form: function(attributes, listType, listAttributes, fieldSets, liAttributes) {
		var result = '<form ' + Html.renderAttributes(attributes) + '>';

		result += '<' + listType + ' ' + Html.renderAttributes(listAttributes) + '>';

		for (var i = 0; i < fieldSets.length; ++i) {
			result += Html.renderFieldSet(fieldSets[i], liAttributes);
		}

		result += '</' + listType + '></form>';

		return result;
	},
	renderFieldSet: function(fieldSet, liAttributes) {
		var result = '<fieldset>';
		var field = null;

		if (fieldSet.legend !== undefined) {
			result += '<legend>' + fieldSet.legend + '</legend>';
		}

		for (var i = 0; i < fieldSet.fields.length; ++i) {
			field = fieldSet.fields[i];
			result += (field.inputType !== 'hidden') ? '<li' + Html.renderAttributes(liAttributes) + '>' : '';

			if (field.label !== undefined) {
				result += '<label for="' + field.label + '">' + field.label + '</label>';
			}

			result += Html.renderField(field);
			result += (field.inputType !== 'hidden') ? '</li>' : '';
		}

		return result;
	},
	renderField: function(field) {
		var f = 'Html.' + field.inputType + '(';
		var keys = Object.keys(field.params);
		var result = null;

		for (var i = 0; i < keys.length; ++i) {
			f += 'field.params.' + keys[i] + ',';
		}

		f = f.substr(0, f.length - 1) + ');';
		result = eval(f);
		return result;
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} content
	 * @returns {String}
	 ***/
	nav: function(attributes, content) {
		return Html.render('nav', attributes, content);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	a: function(attributes, text) {
		return Html.render('a', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	text: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'text';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	number: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'number';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	hidden: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'hidden';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	password: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'password';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	radio: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'radio';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	checkbox: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'checkbox';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	submit: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'submit';

		return Html.render('input', a);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	textarea: function(attributes, text) {
		var result = '<textarea ';
		result += Html.renderAttributes(attributes) + '>';

		return result + text + '</textarea>';
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	button: function(attributes, text) {
		return Html.render('button', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {attribute{String}:value{String}} options 
	 * @param {String} listID
	 * @returns {String}
	 ***/
	autoComplete: function(attributes, options, listID) {
		var a = (attributes !== undefined) ? attributes : {};
		a.list = listID;
		
		var optioList = '';
		for(var i = 0; i < options.length; ++i){
			optioList += '<option value="' + options[i] + '">';
		}

		return Html.render('input', a) + Html.render('datalist', {'id': listID}, optioList);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	keygen: function(attributes) {
		return Html.render('keygen', attributes);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	img: function(attributes) {
		return Html.render('img', attributes);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	h1: function(attributes, text) {
		return Html.render('h1', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	h2: function(attributes, text) {
		return Html.render('h2', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	h3: function(attributes, text) {
		return Html.render('h3', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	h4: function(attributes, text) {
		return Html.render('h4', attributes, text);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 ***/
	p: function(attributes, text) {
		return Html.render('p', attributes, text);
	},
	/***
	 * @returns {String}
	 ***/
	br: function() {
		return Html.render('br');
	},
	/***
	 * @param {attribute:value} attributes
	 * @param [{shape,coords,href,alt}]
	 * @param {String} mapName
	 * @returns {String}
	 ***/
	imageMap: function(attributes, areas, mapName) {
		var a = (attributes !== undefined) ? attributes : {};
		var result = '<map name="' + mapName + '">';

		a.usemap = '#' + mapName;

		for (var area in areas) {
			result += '<area ' + Html.renderAttributes(area) + '>';
		}

		result += '</map>';

		return Html.render('img', a) + result;
	},
	/**
	 * @param {attribute:value} attributes
	 * @param {string} text
	 * @param {array[tag, attributes, text, children]} children
	 * @returns {String}
	 */
	div: function(attributes, text, children) {
		return Html.render('div', attributes, text, children);
	},
	/***
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 ***/
	span: function(attributes, text) {
		return Html.render('span', attributes, text);
	},
	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	meta: function(attributes) {
		return Html.render('meta', attributes);
	},
	/**
	 * @param {attribute:value} attributes
	 * @param [{String}] listTypes
	 * @param Boolean multiple
	 * @returns {String}
	 */
	file: function(attributes, listTypes, multiple) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'file';
		a.accept = listTypes;

		if (multiple) {
			a.multiple = 'multiple';
		}
		return  Html.render('input', a);
	},
	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	date: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'date';
		return Html.render('input', a);
	},
	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	datetime: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'datetime';
		return Html.render('input', a);
	},
	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	email: function(attributes) {
		var a = (attributes !== undefined) ? attributes : {};
		a.type = 'email';
		return Html.render('input', a);
	}
}