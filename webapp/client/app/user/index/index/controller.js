import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({

	searchValue: '',
	sortBy: 'createdAt:desc',
	sortOptions: [{id: 'createdAt:desc', text:'Newest'},
				  {id: 'createdAt:asc', text:'Oldest'},
				  {id: 'name:asc', text:'Name'}],
				  
	projectsCount: computed.alias('model.projects.length'),
	sortedAndFilteredProjects: Ember.computed.sort('model.projects', 'projectSorting'),
	
	projectSorting: computed('sortBy', function(){
		var array = [];
		array[0] = this.get('sortBy');
		return array;
		// return [].push(this.get('sortBy'));
	}),

	openProjectsCount: computed('model.projects', function(){
		return this.get('model.projects').filterBy('open',true).get('length');
	}),
	
	completedProjectsCount: computed('projectsCount','openProjectsCount', function(){
		return this.get('projectsCount') - this.get('openProjectsCount');
	}),


	filteredProjects: computed('model.projects','searchValue','sortProperty', function(){
		var projects = this.get('model.projects');

		var regex = new RegExp(this.get('searchValue'));

		return projects.filter(function(project){

			return regex.test(project.get('name'));
		});


	}),

});
