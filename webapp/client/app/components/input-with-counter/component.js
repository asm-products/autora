import Ember from 'ember';

const {computed, on} = Ember;

export default Ember.Component.extend({
	classNames: null,

	value: {
		value: ''
	},

	charactersLeft: computed('value','maxlength', function(){
		var valueLength = (typeof this.get('value.length') === 'number' ? this.get('value.length') : 0);
		return this.get('maxlength') - valueLength; // this looks funny, probably could be done better
	}),

    focusInput: on('didInsertElement', function () {
    	
        if (this.get('focus')) {
            setTimeout(function() {
              this.$().find('input, textarea').focus();
            }.bind(this), 0);
        }
    })
});
