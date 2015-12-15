import Ember from 'ember';

const {$} = Ember;

export default Ember.Component.extend({

	classNames: ['inline-block','dropdown-container'],

    dropdownToggled(){

    },

    didInsertElement(){
        
    	Ember.$(document).click(() => {
            if(this.isVisible){
    		  this.set('showDropdown', false);
            }
    	});

    	$('.' + this.get('selectorClass')).click(e => {
    		this.toggleProperty('showDropdown');
            this.dropdownToggled();
    		e.stopPropagation();
    	});
    },
    actions: {

    }
});
