import Ember from 'ember';

export default Ember.Component.extend({
    url: '/s3/upload',
    classNames: ['photo-uploader'],
    actions: {
        uploadDone: function (data) {
            if (data.success) {
                this.set('filePreviewUrl', data.filePath);
                this.sendAction('uploadSuccess', data.filePath);
            }
        },

        uploadError: function (jqXHR, textStatus, errorThrown) {
            debugger;
        }
    }
});
