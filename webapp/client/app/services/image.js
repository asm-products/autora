import Ember from 'ember';
import config from 'client/config/environment';

export default Ember.Service.extend({
	generatePath(fileName,type,size = 400,host = config.s3Url){
		if(fileName){
			return `${host + type}/w${size}.${fileName}`;
		} else {
			return false;
		}
	}
});
