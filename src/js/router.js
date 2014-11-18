App.Router.map(function () {
	this.resource('recetas', { path: '/recetas' }, function() {
		this.resource('receta', {path: '/:receta_id'});
		this.route('new');
	});
});
