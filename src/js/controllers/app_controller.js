App.ApplicationController = Ember.Controller.extend({
	actions: {
		toggleTopbar: function() {
			$('nav.top-bar').foundation('topbar', 'toggle');
		}
	}
});
