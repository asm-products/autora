import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Component.extend(InViewportMixin, {
	tagName: "section",
	classNameBindings: ['name','viewportEntered:animate'],
	animate: 'animate',
	isInViewPort: false,

	svgPath: Ember.computed('svg', function(){
		return 'svg/' + this.get('svg');
	}),
	isOdd: Ember.computed('number', function(){
		return parseInt(this.get('number'))%2 !== 0;
	}),

	// didEnterViewPort(){
	// 	this.set('isInViewPort', true);
	// 	console.log('here we go');
	// },

	viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportTolerance: {
        top    : -250,
      }
    });
  })
});
