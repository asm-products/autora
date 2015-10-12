import Ember from 'ember';

export default Ember.Component.extend({
    url: Ember.computed('type', function () {
        return '/upload/s3/' + this.get('type');
    }),
    classNames: ['photo-uploader'],
    imageService: Ember.inject.service('image'),
    filePreviewUrl: Ember.computed('fileName', function(){
        return this.get('imageService').generatePath(this.get('fileName'),this.get('type'));
    }),
    actions: {
        uploadStart: function () {
            this.set('loading', true);
        },

        uploadDone: function (data) {
            this.set('loading', false);

            if (data.success) {
                // this.set('filePreviewUrl', data.filePath);
                this.set('fileName', data.fileName);
                this.sendAction('uploadSuccess', data.fileName);
            }
        },

        uploadError: function () {
        }
    }
});
