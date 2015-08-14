import Ember from 'ember';

export default Ember.Controller.extend({
	tag: Ember.computed.alias('model.firstObject')
});
