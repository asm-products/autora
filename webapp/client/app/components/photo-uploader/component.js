import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({

    classNames: ['photo-uploader'],
    imageService: inject.service('image'),

    url: computed('type', function () {
        return '/upload/s3/' + this.get('type');
    }),

    filePreviewUrl: computed('fileName', function(){
        return this.get('imageService').generatePath(this.get('fileName'),this.get('type'));
    }),

    actions: {
        uploadStart() {

            this.set('loading', true);
        },

        uploadDone(data) {

            this.set('loading', false);
            if (data.success) {
                // this.set('filePreviewUrl', data.filePath);
                this.set('fileName', data.fileName);
                this.sendAction('uploadSuccess', data.fileName);
            }
        },

        uploadError() {
            
        }
    }
});
