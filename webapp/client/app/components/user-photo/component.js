import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({

    classNames: ['user-photo'],
    classNameBindings: ['isLoading'],
    
    placeholderUrl: 'http://app.autora.ink/images/profile.png',
    isLoading: false,

    imageService: inject.service('image'),
    
    imageUrl: computed('user.photo', function(){
        return this.get('imageService').generatePath(this.get('user.photo'),'user',400);
    }),
    didInsertElement(){

    }
});
