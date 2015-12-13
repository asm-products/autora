import Ember from 'ember';
import EmberUploader from 'ember-uploader';

const {isEmpty} = Ember;

export default EmberUploader.FileField.extend({

    filesDidChange(files) {
        var uploadUrl = this.get('url');

        var uploader = EmberUploader.Uploader.create({
            url: uploadUrl
        });

        this.sendAction('uploadStart');

        uploader.on('didUpload', function(e) {
            this.sendAction('uploadDone', e);
        }.bind(this));

        uploader.on('didError', function(e) {
            this.sendAction('uploadError', e);
        }.bind(this));

        if (!isEmpty(files)) {
            uploader.upload(files[0]);
        }
    }
});
