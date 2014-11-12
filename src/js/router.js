App.Router.map(function () {
	this.resource('recetas', { path: '/recetas' }, function() {
		this.route('add');
	});
});
