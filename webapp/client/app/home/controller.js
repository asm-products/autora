import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({

	blankProject: {
		description: '',
		name: ''
	},
	projectsSorting: ['updatedAt:desc'],
	sortedProjects: computed.sort('model','projectsSorting')
});
