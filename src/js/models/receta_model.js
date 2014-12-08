App.Receta = DS.Model.extend({
	nombre: DS.attr('string'),
	descripcion: DS.attr('string'),
	ingredientes: DS.attr('string'),
	preparacion: DS.attr('string'),
	tiempoPrep: DS.attr('number'),
	rendimiento: DS.attr('string'),
	imagenes: DS.hasMany('imagen', {async: false}),
	categorias: DS.hasMany('categoria', {async: true})
});

Ember.Inflector.inflector.irregular('receta', 'recetas');
