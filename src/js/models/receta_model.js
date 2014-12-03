App.Receta = DS.Model.extend({
	nombre: DS.attr('string'),
	descripcion: DS.attr('string'),
	ingredientes: DS.attr('string'),
	preparacion: DS.attr('string'),
	tiempoPrep: DS.attr('number'),
	rendimiento: DS.attr('string')
});

Ember.Inflector.inflector.irregular('receta', 'recetas');

App.Receta.FIXTURES = [
	{
		id: 1,
		nombre: 'Receta Uno',
		descripcion: 'Descripcion de la receta uno',
		ingredientes: 'Los ingredientes\nUn ingrediente\nDos ingedientes',
		preparacion: 'Estas son las instrucciones de preparacion',
		tiempoPrep: 25,
		rendimiento: '2 porciones'
	},
	{
		id: 2,
		nombre: 'Receta Dos',
		descripcion: 'Descripcion de la receta Dos',
		ingredientes: 'Los ingredientes\nUn ingrediente\nDos ingedientes',
		preparacion: 'Estas son las instrucciones de preparacion',
		tiempoPrep: 25,
		rendimiento: '2 porciones'
	},
	{
		id: 3,
		nombre: 'Receta Tres',
		descripcion: 'Descripcion de la receta Tres',
		ingredientes: 'Los ingredientes\nUn ingrediente\nDos ingedientes',
		preparacion: 'Estas son las instrucciones de preparacion',
		tiempoPrep: 25,
		rendimiento: '2 porciones'
	},
	{
		id: 4,
		nombre: 'Receta Cuatro',
		descripcion: 'Descripcion de la receta Cuatro',
		ingredientes: 'Los ingredientes\nUn ingrediente\nDos ingedientes',
		preparacion: 'Estas son las instrucciones de preparacion',
		tiempoPrep: 25,
		rendimiento: '2 porciones'
	},
	{
		id: 5,
		nombre: 'Receta Cinco',
		descripcion: 'Descripcion de la receta Cinco',
		ingredientes: 'Los ingredientes\nUn ingrediente\nDos ingedientes',
		preparacion: 'Estas son las instrucciones de preparacion',
		tiempoPrep: 25,
		rendimiento: '2 porciones'
	}
];
