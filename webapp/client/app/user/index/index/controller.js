import Ember from 'ember';

export default Ember.Controller.extend({

	sortBy: 'createdAt:desc',
	projectSorting: Ember.computed('sortBy', function(){
		var array = [];
		array[0] = this.get('sortBy');
		return array;
		// return [].push(this.get('sortBy'));
	}),
	sortOptions: [{id: 'createdAt:desc', text:'Newest'},
				  {id: 'createdAt:asc', text:'Oldest'},
				  {id: 'name:asc', text:'Name'}],
	// languageForms: [{id: 'prose', text: 'Prose'},{id: 'poetry', text: 'Poetry'}],


	projectsCount: Ember.computed('model.projects',function(){
		
		return this.get('model.projects.length');
	}),
	openProjectsCount: Ember.computed('model.projects', function(){
		return this.get('model.projects').filterBy('open',true).get('length');
	}),
	completedProjectsCount: Ember.computed('projectsCount','openProjectsCount', function(){
		return this.get('projectsCount') - this.get('openProjectsCount');
	}),

	searchValue: '',

	filteredProjects: Ember.computed('model.projects','searchValue','sortProperty', function(){
		var projects = this.get('model.projects');

		var regex = new RegExp(this.get('searchValue'));

		return projects.filter(function(project){

			return regex.test(project.get('name'));
		});


	}),

	sortedAndFilteredProjects: Ember.computed.sort('model.projects', 'projectSorting')
});
