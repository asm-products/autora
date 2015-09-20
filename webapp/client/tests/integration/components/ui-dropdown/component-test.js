import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ui-dropdown', 'Integration | Component | ui dropdown', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-dropdown}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-dropdown}}
      template block text
    {{/ui-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
