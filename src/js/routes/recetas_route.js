App.RecetasRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('receta');
	}
});
