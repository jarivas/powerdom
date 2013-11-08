<?php

class Html {

	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	public static function renderAttributes($attributes) {
		$result = '';

		if ($attributes) {
			foreach ($attributes as $key => $value) {
				$result .= ' ' . $key . '="' . $value . '"';
			}
		}

		return $result;
	}

	/**
	 * @param {string} tag
	 * @param {attribute{String}:value{String}} attributes 
	 * @param {string} text
	 * @param {array[tag, attributes, text, children]} children
	 * @returns {String}
	 */
	public static function render($tag, $attributes = null, $text = null, $children = null) {
		$result = '<' . $tag;

		$result .= self::renderAttributes($attributes);

		if ((!$text) && (!$children)) {
			$result .= '/>';
		} else if ((!$children) && ($text)) {
			$result .= '>' . $text . '</' . $tag . '>';
		} else if ($children){
			$result .= '>';

			for ($i = 0; i < count($children); ++$i) {
				$result .= self::render($children[$i]->tag, $children[$i]->attributes, $children[$i]->text, $children[$i]->children);
			}

			$result . '</' . tag . '>';
		}

		return $result;
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes 
	 * @param [['attributes'{String}, 'text'{String}]] list_items
	 * @returns {String}
	 * * */

	public static function ul($attributes, $list_items) {
		return self::itemList('ul', $attributes, $list_items);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes 
	 * @param [['attributes'{String}, 'text'{String}]] list_items
	 * @returns {String}
	 * * */

	public static function ol($attributes, $list_items) {
		return self::itemList('ol', $attributes, $list_items);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes 
	 * @param ['text'{String}] dt_items
	 * @param ['text'{String}] dd_items
	 * @returns {String}
	 * * */

	public static function dl($attributes, $dt_items, $dd_items) {
		$result = '<dl';

		$result .= self::renderAttributes($attributes) . '>';
		for ($i = 0; $i < count($dt_items); ++$i) {
			$result .= '<dt>' . $dt_items[$i] . '</dt><dd>' . $dd_items[$i] . '</dd>';
		}
		$result .= '</dl>';

		return $result;
	}

	public static function itemList($tag, $attributes, $list_items) {
		$result = '<' . tag;

		$result .= self::renderAttributes($attributes) . '>';

		for ($i = 0; $i < count($list_items); ++$i) {
			$result .= '<li' . self::renderAttributes($list_items[$i][0]) . '>' . $list_items[$i][1] . '</li>';
		}
		$result .= '</' . $tag . '>';

		return $result;
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes 
	 * @param {value{String}:text{String}} options
	 * @param {String} selectedOption
	 * @returns {String}
	 * * */

	public static function select($attributes, $options, $selectedOption = '') {
		$result = '<select';
		$result .= self::renderAttributes($attributes) . '>';

		for ($i = 0; $i < count($options); ++$i) {
			if (is_string($options[$i])) {
				$result .= '<option value="' . $options[$i] . '"';
				$result .= ($options[$i] === $selectedOption) ? ' selected="selected"' : '';
				$result .= '>' . $options[$i] . '</option>';
			} else {
				if(is_string($selectedOption)){
					$selected = ($options[$i]->value === $selectedOption) ? ' selected="selected"' : '';
				} else if( is_array($selectedOption) && (count($selectedOption) > 0) ){
					$selected = (in_array($options[$i]->value, $selectedOption)) ? ' selected="selected"' : '';
				} else {
					$selected = '';
				}
				
				$result .= '<option value="' . $options[$i]->value . '"';
				$result .= $selected;
				$result .= '>' . $options[$i]->text . '</option>';
				
			}
		}

		return $result.= '</select>';
	}

	/*	 * *
	 * @param [columns_name{String}] cols
	 * @param [ [cell{String}] ] rows
	 * @param {attribute{String}:value{String}} attributes
	 * @param {attribute{String}:value{String}} ColsAttributes 
	 * @param {attribute{String}:value{String}} RowsAttributes
	 * @returns {String}
	 * * */

	public static function table($cols, $rows, $attributes = null, $ColsAttributes, $RowsAttributes) {
		$result = '<table' . self::renderAttributes($attributes) . '>';
		$result .= self::row('th', $cols, $ColsAttributes);

		foreach ($rows as $row) {
			$result .= self::row('td', $row, $RowsAttributes);
		}

		return $result;
	}

	public static function row($cellType, $cells, $attributes) {
		$result = '<tr' . self::renderAttributes($attributes) . '>';

		foreach ($cells as $cell) {
			$result .= '<' . $cellType . '>' . $cell . '</' . $cellType . '>';
		}

		$result .= '</tr>';

		return $result;
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} listType possible values 'ol', 'ul'
	 * @param {attribute{String}:value{String}} listAttributes
	 * @param [ {legend{String}, fields[{inputType{String}, params{}, label{String}]} ] fieldSets
	 * @param {attribute{String}:value{String}} liAttributes
	 * @returns {String}
	 * * */

	public static function form($attributes, $listType, $listAttributes, $fieldSets, $liAttributes) {
		$result = '<form ' . self::renderAttributes($attributes) . '>';

		$result .= '<' . $listType . ' ' . self::renderAttributes($listAttributes) . '>';

		for ($i = 0; $i < count($fieldSets); ++$i) {
			$result .= self::renderFieldSet($fieldSets[$i], $liAttributes);
		}

		$result .= '</' . $listType . '></form>';

		return $result;
	}

	public static function renderFieldSet($fieldSet, $liAttributes) {
		$result = '<fieldset>';
		$field = null;

		if ($fieldSet->legend) {
			$result .= '<legend>' . $fieldSet->legend . '</legend>';
		}

		for ($i = 0; $i < count($fieldSet->fields); ++$i) {
			$field = $fieldSet->fields[$i];

			$result .= ($field->inputType !== 'hidden') ? '<li' . self::renderAttributes($liAttributes) . '>' : '';

			if ($field->label) {
				$result .= '<label for="' . $field->label . '">' . $field->label . '</label>';
			}

			$result .= self::renderField($field);
			$result .= ($field->inputType !== 'hidden') ? '</li>' : '';
		}

		return $result;
	}

	public static function renderField($field) {
		$args = array();
		foreach ($field->params as $param) {
			$args[] = $param;
		}
		return call_user_func_array('Website_Tool_Html::'.$field->inputType, $args);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} content
	 * @returns {String}
	 * * */

	public static function nav($attributes, $content) {
		return self::render('nav', $attributes, $content);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 * * */

	public static function a($attributes, $text) {
		return self::render('a', $attributes, $text);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function text($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'text';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function number($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'number';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function hidden($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'hidden';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function password($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'password';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function radio($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'radio';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function checkbox($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'checkbox';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function submit($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'submit';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {String} text
	 * @returns {String}
	 * * */

	public static function textarea($attributes, $text) {
		$result = '<textarea ';
		$result .= self::renderAttributes($attributes) . '>';

		return $result . $text . '</textarea>';
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function button($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'button';

		return self::render('input', $a);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {attribute{String}:value{String}} options 
	 * @param {String} listID
	 * @returns {String}
	 * * */

	public static function autoComplete($attributes, $options, $listID) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->list = $listID;

		$datalist = new stdClass();
		$datalist->id = $listID;

		$optioList = '';
		for ($i = 0; $i < count($options); ++$i) {
			$optioList .= '<option value="' . $options[$i] . '">';
		}

		return self::render('input', $a) . self::render('datalist', $datalist, $optioList);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function keygen($attributes) {
		return self::render('keygen', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function img($attributes) {
		return self::render('img', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function h1($attributes) {
		return self::render('h1', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function h2($attributes) {
		return self::render('h2', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function h3($attributes) {
		return self::render('h3', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function h4($attributes) {
		return self::render('h4', $attributes);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @param {string} text
	 * @returns {String}
	 * * */

	public static function p($attributes, $text) {
		return self::render('p', $attributes, $text);
	}

	/*	 * *
	 * @param {attribute:value} attributes
	 * @param [{shape,coords,href,alt}]
	 * @param {String} mapName
	 * @returns {String}
	 * * */

	public static function imageMap($attributes, $areas, $mapName) {
		$a = ($attributes) ? $attributes : new stdClass();
		$result = '<map name="' . $mapName . '">';

		$a->usemap = '#' . mapName;

		foreach ($areas as $area) {
			$result .= '<area ' . self::renderAttributes($area) . '>';
		}

		$result .= '</map>';

		return self::render('img', $a) . $result;
	}

	/**
	 * @param {attribute:value} attributes
	 * @param {string} text
	 * @param {array[tag, attributes, text, children]} children
	 * @returns {String}
	 */
	public static function div($attributes, $text, $children) {
		return self::render('div', $attributes, $text, $children);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function span($attributes, $text) {
		return self::render('span', $attributes, $text);
	}

	/*	 * *
	 * @param {attribute{String}:value{String}} attributes
	 * @returns {String}
	 * * */

	public static function meta($attributes) {
		return self::render('meta', $attributes);
	}

	/**
	 * @param {attribute:value} attributes
	 * @param [{String}] listTypes
	 * @param Boolean multiple
	 * @returns {String}
	 */
	public static function file($attributes, $listTypes = null, $multiple = null) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'file';
		$a->accept = $listTypes;

		if ($multiple) {
			$a->multiple = 'multiple';
		}
		return self::render('input', $a);
	}

	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	public static function date($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'date';

		return self::render('input', $a);
	}

	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	public static function datetime($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();	
		$a->type = 'datetime';

		return self::render('input', $a);
	}


	/**
	 * @param {attribute:value} attributes
	 * @returns {String}
	 */
	public static function email($attributes) {
		$a = ($attributes) ? $attributes : new stdClass();
		$a->type = 'email';

		return self::render('input', $a);
	}

}