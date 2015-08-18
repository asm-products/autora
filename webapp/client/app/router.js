import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('about');
  this.route('how-it-works');

  this.route('project', function() {
    this.route('create');
    this.route('list');

    this.route('index',{path: '/:project_id'}, function() {
      this.route('entries', function () {
        this.route('new-entry');
      });
      this.route('entry',{path: '/:entry_id'}, function() {});
    });
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

  this.route('tag', function() {
    this.route('index', {path: '/:tag_name'});
  }); //Might move tag_id to tag.index later
  
  this.route('dashboard', function() {});
});

export default Router;
