import Ember from 'ember';

export default Ember.Controller.extend({
	projectsSorting: ['updatedAt:desc'],
	sortedProjects: Ember.computed.sort('model','projectsSorting'),
	blankProject: {
		description: '',
		name: ''
	}
});
