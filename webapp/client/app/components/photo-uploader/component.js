import Ember from 'ember';

export default Ember.Component.extend({
    url: Ember.computed('type', function () {
        return '/upload/s3/' + this.get('type');
    }),
    classNames: ['photo-uploader'],
    actions: {
        uploadStart: function () {
            this.set('loading', true);
        },

        uploadDone: function (data) {
            this.set('loading', false);

            if (data.success) {
                this.set('filePreviewUrl', data.filePath);
                this.sendAction('uploadSuccess', data.filePath);
            }
        },

        uploadError: function () {
        }
    }
});
