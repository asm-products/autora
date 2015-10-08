import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.reopen({
  notifyGoogleAnalytics: function(u) {
    var url = window.location.href;

    return ga('send', 'pageview', {
        'page': location.pathname
      });
  }.on('didTransition')
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('about');
  this.route('how-it-works');

  this.route('project', function() {
    this.route('create');
    
    this.route('read');
    this.route('contribute');

    this.route('index',{path: '/:project_id'}, function() {
      this.route('entries', function () {
        this.route('new-entry');
      });
    });
  });

  this.route('entry', function() {
    this.route('index', {path: '/:entry_id'});
  });
  // ember simple auth needs this for some reason
  this.route('index');

  this.route('user', function() {
    this.route('signup');
    this.route('login');
    this.route('welcome');
    this.route('index',{path: '/:user_id'}, function() {
      this.route('settings');
      this.route('about');
      this.route('how-it-works');
    });
    this.route('logout');
    this.route('reset');
  });

  //Might move tag_id to tag.index later
  this.route('tag', function() {
    this.route('index', {path: '/:tag_name'});
  });

  this.route('dashboard', function() {});
});

export default Router;
