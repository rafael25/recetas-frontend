App.Receta = DS.Model.extend({
	nombre: DS.attr('string'),
	detalles: DS.attr('string'),
	imagen: DS.attr('string')
});

App.Receta.FIXTURES = [
	{
		id: 1,
		nombre: 'Receta uno',
		detalles: 'Los detalles de la receta uno',
		imagen: 'img/192_ensalada.jpg'
	},
	{
		id: 2,
		nombre: 'Receta dos',
		detalles: 'Los detalles de la receta dos',
		imagen: 'img/191_ensalada.jpg'
	},
	{
		id: 3,
		nombre: 'Receta tres',
		detalles: 'Los detalles de la receta tres',
		imagen: 'img/193_ensalada.jpg'
	},
	{
		id: 4,
		nombre: 'Receta cuatro',
		detalles: 'Los detalles de la receta cuatro',
		imagen: 'img/194_ensalada.jpg'
	}
];
