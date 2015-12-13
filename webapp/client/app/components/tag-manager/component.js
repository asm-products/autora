import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({

	tags: [],
	noTagsAdded: computed.equal('tags.length', 0),
	newTag: '',
	canAddTags: computed.lt('tags.length', 5),
	
	newTagAdd: computed('newTag','canAddTags', function(){
		
		var newTag = this.get('newTag');
		var regex = /^.+\ $/;
		if(this.get('spacelessTag') !== '' && this.get('canAddTags')){
			if(regex.test(newTag)){
				newTag = newTag.substring(0, newTag.length -1); //remove the space at the end
				this.get('tags').pushObject(newTag);
				this.set('newTag','');
			}
		}
	}),

	spacelessTag: computed('newTag', function(){
		return this.get('newTag').replace(/ /g,'');
	}),

	actions: {

		deleteTag(tag){
			this.get('tags').removeObject(tag);
		},
		addTag(){
			var newTag = this.get('spacelessTag');
			if(newTag !== '' && this.get('canAddTags')){
				this.get('tags').pushObject(newTag);
				this.set('newTag','');
			}
			
		}
	}
});
