import Ember from 'ember';

export default Ember.Component.extend({
	classNames: null,

	value: {
		value: ''
	},

	charactersLeft: Ember.computed('value','maxlength', function(){
		var valueLength = (typeof this.get('value.length') === 'number' ? this.get('value.length') : 0);
		return this.get('maxlength') - valueLength; // this looks funny, probably could be done better
	}),

    focusInput: function () {
        if (this.get('focus')) {
            setTimeout(function() {
              this.$().find('input, textarea').focus();
            }.bind(this), 0);
        }
    }.on('didInsertElement')
});
