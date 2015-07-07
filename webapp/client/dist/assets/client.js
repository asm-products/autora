/* jshint ignore:start */

/* jshint ignore:end */

define('client/adapters/application', ['exports', 'client/config/environment', 'firebase', 'emberfire/adapters/firebase'], function (exports, config, Firebase, FirebaseAdapter) {

  'use strict';

  exports['default'] = FirebaseAdapter['default'].extend({
    firebase: new Firebase['default'](config['default'].firebase)
  });

});
define('client/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'client/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('client/application/adapter', ['exports', 'client/config/environment', 'firebase', 'emberfire/adapters/firebase'], function (exports, config, Firebase, FirebaseAdapter) {

    'use strict';

    exports['default'] = FirebaseAdapter['default'].extend({
        firebase: new Firebase['default'](config['default'].firebase)
    });

});
define('client/application/route', ['exports', 'ember', 'simple-auth/mixins/application-route-mixin'], function (exports, Ember, ApplicationRouteMixin) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(ApplicationRouteMixin['default']);

});
define('client/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "client/application/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","app-content container");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","app-header",[],["isLoggedIn",["subexpr","@mut",[["get","session.isAuthenticated"]],[]],"userEmail","justtal@gmail.com"]],
        ["content","outlet"],
        ["content","app-footer"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/application/view', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].View.extend({
        elementId: 'app'
    });

});
define('client/authenticators/firebase', ['exports', 'simple-auth/authenticators/base', 'firebase', 'client/config/environment'], function (exports, Base, Firebase, config) {

    'use strict';

    exports['default'] = Base['default'].extend({

        init: function init() {
            if (config['default'].firebase) {
                this.set('firebase', new Firebase['default'](config['default'].firebase));
            } else {
                throw new Error('\'firebase\' not defined in environment');
            }

            this._super();
        },
        firebase: null,
        restore: function restore(data) {

            var _this = this;

            return new Promise(function (resolve, reject) {

                if (data.token) {

                    _this.get('firebase').authWithCustomToken(data.token, function (error, success) {
                        Ember.run(function () {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(success);
                            }
                        });
                    });
                } else {
                    reject(new Error('Unable to restore Firebase session: no token found.'));
                }
            });
        },
        authenticate: function authenticate(options) {

            var _this = this;

            return new Promise(function (resolve, reject) {

                _this.get('firebase').authWithPassword({
                    'email': options.email,
                    'password': options.password
                }, function (error, authData) {
                    Ember.run(function () {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(authData);
                        }
                    });
                });
            });
        },
        invalidate: function invalidate(data) {

            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.get('firebase').unauth();
                resolve(data);
            });
        }
    });

});
define('client/components/app-footer/component', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        tagName: 'footer',
        classNames: ['app-footer']
    });

});
define('client/components/app-footer/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/app-footer/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("© AUTORA. Writing Just Got Collective.\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/components/app-header/component', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        classNames: ['app-header'],
        tagName: 'header'
    });

});
define('client/components/app-header/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 12
              },
              "end": {
                "line": 9,
                "column": 44
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Create");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 48
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Contribute");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 12
              },
              "end": {
                "line": 11,
                "column": 42
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Read");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child3 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 12
              },
              "end": {
                "line": 12,
                "column": 44
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Logout");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 14,
              "column": 8
            }
          },
          "moduleName": "client/components/app-header/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1,"class","profile-circle");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
          morphs[3] = dom.createMorphAt(fragment,7,7,contextualElement);
          morphs[4] = dom.createMorphAt(dom.childAt(fragment, [9]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["application"],[],0,null],
          ["block","link-to",["application"],[],1,null],
          ["block","link-to",["application"],[],2,null],
          ["block","link-to",["user.logout"],[],3,null],
          ["inline","gravatar-image",[],["email",["subexpr","@mut",[["get","userEmail"]],[]]]]
        ],
        locals: [],
        templates: [child0, child1, child2, child3]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 12
              },
              "end": {
                "line": 15,
                "column": 42
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Home");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 12
              },
              "end": {
                "line": 16,
                "column": 43
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("About");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 12
              },
              "end": {
                "line": 17,
                "column": 50
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("How It Works");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child3 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 12
              },
              "end": {
                "line": 18,
                "column": 42
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Login");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child4 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.0-beta.1",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 12
              },
              "end": {
                "line": 19,
                "column": 65
              }
            },
            "moduleName": "client/components/app-header/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Sign Up");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 20,
              "column": 8
            }
          },
          "moduleName": "client/components/app-header/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
          morphs[3] = dom.createMorphAt(fragment,7,7,contextualElement);
          morphs[4] = dom.createMorphAt(fragment,9,9,contextualElement);
          return morphs;
        },
        statements: [
          ["block","link-to",["application"],[],0,null],
          ["block","link-to",["application"],[],1,null],
          ["block","link-to",["application"],[],2,null],
          ["block","link-to",["user.login"],[],3,null],
          ["block","link-to",["user.signup"],["class","button-flat"],4,null]
        ],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "client/components/app-header/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-sm-4");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2,"class","nav navbar-nav navbar-left");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"class","logo");
        dom.setAttribute(el3,"src","images/logo.png");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-sm-8");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2,"class","nav navbar-nav navbar-right");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isLoggedIn"]],[],0,1]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('client/components/competing-entry/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('client/components/competing-entry/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/components/competing-entry/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Competing entry");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","yield"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/components/gravatar-image', ['exports', 'ember-cli-gravatar/components/gravatar-image'], function (exports, gravatarImage) {

	'use strict';

	exports['default'] = gravatarImage['default'];

});
define('client/components/project-item/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('client/components/project-item/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/project-item/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/components/successful-entry/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('client/components/successful-entry/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/components/successful-entry/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/dashboard/index/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/dashboard/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/dashboard/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/dashboard/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/dashboard/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/dashboard/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/entry/index/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/entry/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/entry/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/entry/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model(params) {
			return params.entry_id;
		}
	});

});
define('client/entry/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/entry/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/initializers/app-version', ['exports', 'client/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('client/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, EmberFireInitializer) {

	'use strict';

	exports['default'] = EmberFireInitializer['default'];

});
define('client/initializers/export-application-global', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('client/initializers/firebase-auth', ['exports', 'client/authenticators/firebase'], function (exports, FirebaseAuthenticator) {

	'use strict';

	exports['default'] = {
		name: 'firebase-auth',
		before: 'simple-auth',
		initialize: function initialize(container, app) {
			container.register('authenticator:firebase', FirebaseAuthenticator['default']);
		}
	};

});
define('client/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'client/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth'] || {});
      setup['default'](container, application);
    }
  };

});
define('client/project/create/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/project/create/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/project/create/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/project/index/entries/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/project/index/entries/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "client/project/index/entries/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus optio vero in pariatur numquam aliquam cum debitis esse qui, illo, voluptatum laboriosam? Quisquam voluptate perferendis nemo porro, dignissimos doloribus ducimus.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "client/project/index/entries/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","competing-entry",[],[],0,null],
        ["content","outlet"]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/project/index/new-entry/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/project/index/new-entry/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/project/index/new-entry/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/project/index/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model(params) {
			return params.project_id;
		}
	});

});
define('client/project/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "client/project/index/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet, nulla ut vero, aut consectetur inventore, ipsam dolorem nesciunt labore dolorum blanditiis. Alias ad tenetur consequatur minima maiores velit repellendus.\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "client/project/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Main site for project with id ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,3,3,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model"],
        ["block","successful-entry",[],[],0,null],
        ["content","outlet"]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/project/list/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/project/list/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/project/list/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/project/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/project/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/project/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/router', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('project', { path: './' }, function () {
      this.route('create');
      this.route('list', { path: './' });

      this.route('index', { path: '/:project_id' }, function () {
        this.route('new-entry');
        this.route('entries');
      });
    });
    this.route('user', function () {
      this.route('signup');
      this.route('login');
      this.route('welcome');
      this.route('index', { path: '/:user_id' }, function () {
        this.route('settings');
      });
      this.route('logout');
    });
    this.route('entry', { path: '/:entry_id' }, function () {});
    this.route('dashboard', function () {});
  });

  exports['default'] = Router;

});
define('client/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('client/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('client/tests/application/adapter.jshint', function () {

  'use strict';

  module('JSHint - application');
  test('application/adapter.js should pass jshint', function() { 
    ok(true, 'application/adapter.js should pass jshint.'); 
  });

});
define('client/tests/application/route.jshint', function () {

  'use strict';

  module('JSHint - application');
  test('application/route.js should pass jshint', function() { 
    ok(true, 'application/route.js should pass jshint.'); 
  });

});
define('client/tests/application/view.jshint', function () {

  'use strict';

  module('JSHint - application');
  test('application/view.js should pass jshint', function() { 
    ok(true, 'application/view.js should pass jshint.'); 
  });

});
define('client/tests/components/app-footer/component.jshint', function () {

  'use strict';

  module('JSHint - components/app-footer');
  test('components/app-footer/component.js should pass jshint', function() { 
    ok(true, 'components/app-footer/component.js should pass jshint.'); 
  });

});
define('client/tests/components/app-header/component.jshint', function () {

  'use strict';

  module('JSHint - components/app-header');
  test('components/app-header/component.js should pass jshint', function() { 
    ok(true, 'components/app-header/component.js should pass jshint.'); 
  });

});
define('client/tests/components/competing-entry/component.jshint', function () {

  'use strict';

  module('JSHint - components/competing-entry');
  test('components/competing-entry/component.js should pass jshint', function() { 
    ok(true, 'components/competing-entry/component.js should pass jshint.'); 
  });

});
define('client/tests/components/project-item/component.jshint', function () {

  'use strict';

  module('JSHint - components/project-item');
  test('components/project-item/component.js should pass jshint', function() { 
    ok(true, 'components/project-item/component.js should pass jshint.'); 
  });

});
define('client/tests/components/successful-entry/component.jshint', function () {

  'use strict';

  module('JSHint - components/successful-entry');
  test('components/successful-entry/component.js should pass jshint', function() { 
    ok(true, 'components/successful-entry/component.js should pass jshint.'); 
  });

});
define('client/tests/dashboard/index/route.jshint', function () {

  'use strict';

  module('JSHint - dashboard/index');
  test('dashboard/index/route.js should pass jshint', function() { 
    ok(true, 'dashboard/index/route.js should pass jshint.'); 
  });

});
define('client/tests/dashboard/route.jshint', function () {

  'use strict';

  module('JSHint - dashboard');
  test('dashboard/route.js should pass jshint', function() { 
    ok(true, 'dashboard/route.js should pass jshint.'); 
  });

});
define('client/tests/entry/index/route.jshint', function () {

  'use strict';

  module('JSHint - entry/index');
  test('entry/index/route.js should pass jshint', function() { 
    ok(true, 'entry/index/route.js should pass jshint.'); 
  });

});
define('client/tests/entry/route.jshint', function () {

  'use strict';

  module('JSHint - entry');
  test('entry/route.js should pass jshint', function() { 
    ok(true, 'entry/route.js should pass jshint.'); 
  });

});
define('client/tests/helpers/resolver', ['exports', 'ember/resolver', 'client/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('client/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('client/tests/helpers/start-app', ['exports', 'ember', 'client/app', 'client/router', 'client/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('client/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('client/tests/project/create/route.jshint', function () {

  'use strict';

  module('JSHint - project/create');
  test('project/create/route.js should pass jshint', function() { 
    ok(true, 'project/create/route.js should pass jshint.'); 
  });

});
define('client/tests/project/index/entries/route.jshint', function () {

  'use strict';

  module('JSHint - project/index/entries');
  test('project/index/entries/route.js should pass jshint', function() { 
    ok(true, 'project/index/entries/route.js should pass jshint.'); 
  });

});
define('client/tests/project/index/new-entry/route.jshint', function () {

  'use strict';

  module('JSHint - project/index/new-entry');
  test('project/index/new-entry/route.js should pass jshint', function() { 
    ok(true, 'project/index/new-entry/route.js should pass jshint.'); 
  });

});
define('client/tests/project/index/route.jshint', function () {

  'use strict';

  module('JSHint - project/index');
  test('project/index/route.js should pass jshint', function() { 
    ok(true, 'project/index/route.js should pass jshint.'); 
  });

});
define('client/tests/project/list/route.jshint', function () {

  'use strict';

  module('JSHint - project/list');
  test('project/list/route.js should pass jshint', function() { 
    ok(true, 'project/list/route.js should pass jshint.'); 
  });

});
define('client/tests/project/route.jshint', function () {

  'use strict';

  module('JSHint - project');
  test('project/route.js should pass jshint', function() { 
    ok(true, 'project/route.js should pass jshint.'); 
  });

});
define('client/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('client/tests/test-helper', ['client/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('client/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('client/tests/unit/application/adapter-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('client/tests/unit/application/adapter-test.jshint', function () {

  'use strict';

  module('JSHint - unit/application');
  test('unit/application/adapter-test.js should pass jshint', function() { 
    ok(true, 'unit/application/adapter-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/application/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/application/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/application');
  test('unit/application/route-test.js should pass jshint', function() { 
    ok(true, 'unit/application/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/application/view-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('view:application', 'Unit | View | application');

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var view = this.subject();
    assert.ok(view);
  });

});
define('client/tests/unit/application/view-test.jshint', function () {

  'use strict';

  module('JSHint - unit/application');
  test('unit/application/view-test.js should pass jshint', function() { 
    ok(true, 'unit/application/view-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/components/app-footer/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('app-footer', 'Unit | Component | app footer', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('client/tests/unit/components/app-footer/component-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components/app-footer');
  test('unit/components/app-footer/component-test.js should pass jshint', function() { 
    ok(true, 'unit/components/app-footer/component-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/components/app-header/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('app-header', 'Unit | Component | app header', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('client/tests/unit/components/app-header/component-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components/app-header');
  test('unit/components/app-header/component-test.js should pass jshint', function() { 
    ok(true, 'unit/components/app-header/component-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/components/competing-entry/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('entry-item', 'Unit | Component | entry item', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('client/tests/unit/components/competing-entry/component-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components/competing-entry');
  test('unit/components/competing-entry/component-test.js should pass jshint', function() { 
    ok(true, 'unit/components/competing-entry/component-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/components/project-item/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('project-item', 'Unit | Component | project item', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('client/tests/unit/components/project-item/component-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components/project-item');
  test('unit/components/project-item/component-test.js should pass jshint', function() { 
    ok(true, 'unit/components/project-item/component-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/components/successful-entry/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('successful-entry', 'Unit | Component | successful entry', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('client/tests/unit/components/successful-entry/component-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components/successful-entry');
  test('unit/components/successful-entry/component-test.js should pass jshint', function() { 
    ok(true, 'unit/components/successful-entry/component-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/dashboard/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:dashboard/index', 'Unit | Route | dashboard/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/dashboard/index/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/dashboard/index');
  test('unit/dashboard/index/route-test.js should pass jshint', function() { 
    ok(true, 'unit/dashboard/index/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/dashboard/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:dashboard', 'Unit | Route | dashboard', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/dashboard/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/dashboard');
  test('unit/dashboard/route-test.js should pass jshint', function() { 
    ok(true, 'unit/dashboard/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/entry/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:entry/index', 'Unit | Route | entry/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/entry/index/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/entry/index');
  test('unit/entry/index/route-test.js should pass jshint', function() { 
    ok(true, 'unit/entry/index/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/entry/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:entry', 'Unit | Route | entry', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/entry/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/entry');
  test('unit/entry/route-test.js should pass jshint', function() { 
    ok(true, 'unit/entry/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/application/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/pods/application/controller-test.jshint', function () {

  'use strict';

  module('JSHint - unit/pods/application');
  test('unit/pods/application/controller-test.js should pass jshint', function() { 
    ok(true, 'unit/pods/application/controller-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/application/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/pods/application/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/pods/application');
  test('unit/pods/application/route-test.js should pass jshint', function() { 
    ok(true, 'unit/pods/application/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/application/view-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('view:application', 'Unit | View | application');

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var view = this.subject();
    assert.ok(view);
  });

});
define('client/tests/unit/pods/application/view-test.jshint', function () {

  'use strict';

  module('JSHint - unit/pods/application');
  test('unit/pods/application/view-test.js should pass jshint', function() { 
    ok(true, 'unit/pods/application/view-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/stories/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:stories', 'Unit | Route | stories', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/pods/stories/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/pods/stories');
  test('unit/pods/stories/route-test.js should pass jshint', function() { 
    ok(true, 'unit/pods/stories/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/create/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project/create', 'Unit | Route | project/create', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/create/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project/create');
  test('unit/project/create/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/create/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/index/entries/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project/index/entries', 'Unit | Route | project/index/entries', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/index/entries/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project/index/entries');
  test('unit/project/index/entries/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/index/entries/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/index/new-entry/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project/index/new-entry', 'Unit | Route | project/index/new entry', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/index/new-entry/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project/index/new-entry');
  test('unit/project/index/new-entry/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/index/new-entry/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project/index', 'Unit | Route | project/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/index/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project/index');
  test('unit/project/index/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/index/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/list/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project/list', 'Unit | Route | project/list', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/list/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project/list');
  test('unit/project/list/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/list/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/project/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:project', 'Unit | Route | project', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/project/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/project');
  test('unit/project/route-test.js should pass jshint', function() { 
    ok(true, 'unit/project/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/index', 'Unit | Route | user/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/index/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/index');
  test('unit/user/index/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/index/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/index/settings/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/index/settings', 'Unit | Route | user/index/settings', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/index/settings/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/index/settings');
  test('unit/user/index/settings/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/index/settings/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/login/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:user/login', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/login/controller-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/login');
  test('unit/user/login/controller-test.js should pass jshint', function() { 
    ok(true, 'unit/user/login/controller-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/login/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/login', 'Unit | Route | user/login', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/login/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/login');
  test('unit/user/login/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/login/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/logout/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:user/logout', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/logout/controller-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/logout');
  test('unit/user/logout/controller-test.js should pass jshint', function() { 
    ok(true, 'unit/user/logout/controller-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/logout/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/logout', 'Unit | Route | user/logout', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/logout/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/logout');
  test('unit/user/logout/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/logout/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user', 'Unit | Route | user', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user');
  test('unit/user/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/signup/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:user/signup', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/signup/controller-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/signup');
  test('unit/user/signup/controller-test.js should pass jshint', function() { 
    ok(true, 'unit/user/signup/controller-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/signup/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/signup', 'Unit | Route | user/signup', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/signup/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/signup');
  test('unit/user/signup/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/signup/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/user/welcome/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:user/welcome', 'Unit | Route | user/welcome', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/user/welcome/route-test.jshint', function () {

  'use strict';

  module('JSHint - unit/user/welcome');
  test('unit/user/welcome/route-test.js should pass jshint', function() { 
    ok(true, 'unit/user/welcome/route-test.js should pass jshint.'); 
  });

});
define('client/tests/user/index/route.jshint', function () {

  'use strict';

  module('JSHint - user/index');
  test('user/index/route.js should pass jshint', function() { 
    ok(true, 'user/index/route.js should pass jshint.'); 
  });

});
define('client/tests/user/index/settings/route.jshint', function () {

  'use strict';

  module('JSHint - user/index/settings');
  test('user/index/settings/route.js should pass jshint', function() { 
    ok(true, 'user/index/settings/route.js should pass jshint.'); 
  });

});
define('client/tests/user/login/controller.jshint', function () {

  'use strict';

  module('JSHint - user/login');
  test('user/login/controller.js should pass jshint', function() { 
    ok(true, 'user/login/controller.js should pass jshint.'); 
  });

});
define('client/tests/user/login/route.jshint', function () {

  'use strict';

  module('JSHint - user/login');
  test('user/login/route.js should pass jshint', function() { 
    ok(false, 'user/login/route.js should pass jshint.\nuser/login/route.js: line 4, col 21, \'params\' is defined but never used.\n\n1 error'); 
  });

});
define('client/tests/user/logout/controller.jshint', function () {

  'use strict';

  module('JSHint - user/logout');
  test('user/logout/controller.js should pass jshint', function() { 
    ok(true, 'user/logout/controller.js should pass jshint.'); 
  });

});
define('client/tests/user/logout/route.jshint', function () {

  'use strict';

  module('JSHint - user/logout');
  test('user/logout/route.js should pass jshint', function() { 
    ok(true, 'user/logout/route.js should pass jshint.'); 
  });

});
define('client/tests/user/route.jshint', function () {

  'use strict';

  module('JSHint - user');
  test('user/route.js should pass jshint', function() { 
    ok(true, 'user/route.js should pass jshint.'); 
  });

});
define('client/tests/user/signup/controller.jshint', function () {

  'use strict';

  module('JSHint - user/signup');
  test('user/signup/controller.js should pass jshint', function() { 
    ok(false, 'user/signup/controller.js should pass jshint.\nuser/signup/controller.js: line 19, col 27, \'Firebase\' is not defined.\n\n1 error'); 
  });

});
define('client/tests/user/signup/route.jshint', function () {

  'use strict';

  module('JSHint - user/signup');
  test('user/signup/route.js should pass jshint', function() { 
    ok(true, 'user/signup/route.js should pass jshint.'); 
  });

});
define('client/tests/user/welcome/route.jshint', function () {

  'use strict';

  module('JSHint - user/welcome');
  test('user/welcome/route.js should pass jshint', function() { 
    ok(true, 'user/welcome/route.js should pass jshint.'); 
  });

});
define('client/user/index/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model(params) {
			return params.user_id;
		}
	});

});
define('client/user/index/settings/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/user/index/settings/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/user/index/settings/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Users's settings");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/user/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/user/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Profile for User with id ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model"],
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/user/login/controller', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({

        email: '',
        password: '',
        alert: '',

        actions: {
            login: function login() {
                // var self = this;
                this.get('session').authenticate('authenticator:firebase', {
                    'email': this.get('email'),
                    'password': this.get('password')
                }).then((function () {
                    this.transitionToRoute('user.welcome');
                }).bind(this), (function (error) {
                    var alertMessage = error;
                    switch (error.code) {
                        case 'INVALID_EMAIL':
                            alertMessage = 'Invalid email address!';
                            break;
                        case 'INVALID_PASSWORD':
                            alertMessage = 'Either the password or email address is not correct.';
                            break;
                        case 'INVALID_USER':
                            alertMessage = 'Either the password or email address is not correct.';
                            break;
                    }
                    this.set('alert', alertMessage);
                }).bind(this));
            },
            logout: function logout() {
                this.get('session').invalidate().then((function () {
                    this.transitionToRoute('user.login');
                }).bind(this));
            }
        }
    });

});
define('client/user/login/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model(params) {
			return null;
		},

		actions: {
			didTransition: function didTransition() {
				this.controller.setProperties({ 'alert': '', 'email': '', 'password': '' });
			}
		}
	});

});
define('client/user/login/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "client/user/login/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("hr");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","alert alert-danger");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
          return morphs;
        },
        statements: [
          ["content","alert"]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "client/user/login/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form-inline");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("Your email:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("Password:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","submit");
        dom.setAttribute(el2,"value","Login");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(element0,3,3);
        morphs[3] = dom.createMorphAt(element0,7,7);
        morphs[4] = dom.createMorphAt(fragment,6,6,contextualElement);
        return morphs;
      },
      statements: [
        ["block","if",[["get","alert"]],[],0,null],
        ["element","action",["login"],["on","submit"]],
        ["inline","input",[],["class","form-control","value",["subexpr","@mut",[["get","email"]],[]]]],
        ["inline","input",[],["type","password","class","form-control","value",["subexpr","@mut",[["get","password"]],[]]]],
        ["content","outlet"]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/user/logout/controller', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('client/user/logout/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		beforeModel: function beforeModel() {

			this.get('session').invalidate();
		}
	});

});
define('client/user/logout/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/user/logout/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/user/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/user/signup/controller', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		email: '',
		password: '',
		password2: '',
		name: '',
		alert: '',

		passwordsDontMatch: Ember['default'].computed('password', 'password2', function () {
			return this.get('password') !== this.get('password2') && this.get('password2') !== '';
		}),

		actions: {
			sendSignUpForm: function sendSignUpForm() {
				var self = this;
				var ref = new Firebase(config['default'].firebase);
				ref.createUser({
					email: this.get('email'),
					password: this.get('password')
				}, function (error, userData) {
					if (error) {
						console.log('Error creating user:', error);
						self.set('alert', {
							type: 'danger',
							message: error
						});
					} else {
						console.log('Successfully created user account with uid:', userData.uid);
						self.set('alert', {
							type: 'success',
							message: 'You have a profile now! Congratz!'
						});
						//ToDO: Create new profile and save it
					}
				});
			}
		}
	});

});
define('client/user/signup/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/user/signup/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-beta.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "client/user/signup/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0,0,0);
          return morphs;
        },
        statements: [
          ["attribute","class",["concat",["alert alert-",["get","alert.type"]]]],
          ["content","alert.message"]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 0
          }
        },
        "moduleName": "client/user/signup/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form");
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3,"class","control-label");
        var el4 = dom.createTextNode("Email address:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3,"class","control-label");
        var el4 = dom.createTextNode("Password:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3,"class","control-label");
        var el4 = dom.createTextNode("Password again:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","form-group");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3,"class","control-label");
        var el4 = dom.createTextNode("Username:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","submit");
        dom.setAttribute(el2,"class","btn btn-primary");
        dom.setAttribute(el2,"value","Sign up");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [5]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]),3,3);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]),3,3);
        morphs[4] = dom.createAttrMorph(element2, 'class');
        morphs[5] = dom.createMorphAt(element2,3,3);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [7]),3,3);
        morphs[7] = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","if",[["get","alert"]],[],0,null],
        ["element","action",["sendSignUpForm"],["on","submit"]],
        ["inline","input",[],["class","form-control","type","email","value",["subexpr","@mut",[["get","email"]],[]]]],
        ["inline","input",[],["class","form-control","type","password","value",["subexpr","@mut",[["get","password"]],[]]]],
        ["attribute","class",["concat",["from-group ",["subexpr","if",[["get","passwordsDontMatch"],"has-error"],[]]]]],
        ["inline","input",[],["class","form-control","type","password","value",["subexpr","@mut",[["get","password2"]],[]]]],
        ["inline","input",[],["class","form-control","value",["subexpr","@mut",[["get","name"]],[]]]],
        ["content","outlet"]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/user/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/user/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/user/welcome/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/user/welcome/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-beta.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/user/welcome/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Welcome user. You have been sign in.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet"]
      ],
      locals: [],
      templates: []
    };
  }()));

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('client/config/environment', ['ember'], function(Ember) {
  var prefix = 'client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("client/tests/test-helper");
} else {
  require("client/app")["default"].create({"name":"client","version":"0.0.0.ab0f411d"});
}

/* jshint ignore:end */
//# sourceMappingURL=client.map