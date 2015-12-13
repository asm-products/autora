import Ember from 'ember';
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {

	titleToken(model) {
		return model.get('name');
	},

	title(tokens) {
		return  'Autora.ink | Project | ' + tokens[0];
	},

	model(params){
		return this.store.find('project',params.project_id);
	},

	afterModel(model){
		var metaTags = {
			'property': {
				'og:name': model.get('name'),
				'og:image': model.get('imageHost') + model.get('image')
		    },
			'name': {
				'description' : model.get('description'),
				'keywords'    : model.get('name')
			}
		};

		this.set('meta', metaTags);
	},

	actions: {
		willTransition(){
			this.controller.get('model').rollbackAttributes();
		}
	}
});
