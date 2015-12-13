import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

const {computed, on} = Ember;

export default Ember.Component.extend(InViewportMixin, {

	tagName: "section",
	classNameBindings: ['name','viewportEntered:animate'],
	animate: 'animate',
	isInViewPort: false,

	svgPath: computed('svg', function(){
		return 'svg/' + this.get('svg');
	}),
	isOdd: computed('number', function(){
		return parseInt(this.get('number'))%2 !== 0;
	}),

	didEnterViewport(){
		this.set('isInViewPort', true);
	},

	viewportOptionsOverride: on('didInsertElement', function() {
	    Ember.setProperties(this, {
	      //viewportSpy: true,
	      // viewportTolerance: {
	      //   top    : -250,
	      // }
	    });
  })
});
