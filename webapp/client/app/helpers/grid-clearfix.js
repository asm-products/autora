import Ember from 'ember';

export function gridClearfix(params) {
	var n = params[0];
	var inputType = params[1];
	console.log(inputType);

	var output = "";

	if(n !== 0){
		if(inputType === 'word'){
			if(n%4 === 0){
				output = output+'<div class="clearfix visible-lg"></div>';
			}
			if(n%3 === 0){
				output = output+'<div class="clearfix visible-md"></div>';
			}
			if(n%2 === 0){
				output = output+'<div class="clearfix visible-sm"></div>';
			}
		} else if(inputType === 'line' || inputType === 'sentence'){
			if(n%3 === 0){
				output = output+'<div class="clearfix visible-lg"></div>';
			}
			if(n%2 === 0){
				output = output+'<div class="clearfix visible-sm visible-md"></div>';
			}
		} else if(inputType === 'paragraph'){
			if(n%2 === 0){
				output = output+'<div class="clearfix visible-lg"></div>';
			}
		}
	}

		return Ember.String.htmlSafe(output);
}

export default Ember.Helper.helper(gridClearfix);
