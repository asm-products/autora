import Ember from 'ember';

const {inject} = Ember;

export default Ember.Component.extend({
	classNames: ['inline-block'],

	session: inject.service('session'),

});
