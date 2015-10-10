import Ember from 'ember';
import config from 'client/config/environment';


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
                // this.set('filePreviewUrl', data.filePath);
                this.set('filePreviewUrl', config.s3Url + 'project/.w400.' + data.fileName);
                this.sendAction('uploadSuccess', data.fileName);
            }
        },

        uploadError: function () {
        }
    }
});
