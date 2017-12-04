var express = require('express');
var async = require('async');
var app = express();
var https = require('https');


app.use(express.static(__dirname + "/site"));

app.get('/api/items/:id', function (req, res) {
	//	res.json({id:req.params.id});	
	https.get('https://api.mercadolibre.com/items/' + req.params.id, (resp) => {
		let data = '';
		let retorno = {};

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			data = JSON.parse(data);

			retorno.author = {
				name: 'Guilherme',
				lastname: 'Ventura de Souza'
			};

			retorno.item = {
				id: data.id,
				title: data.title,
				price: {
					currency: data.currency_id,
					amount: Math.floor(data.price),
					decimal: ((data.price % 1).toFixed(2) * 100)
				},
				picture: data.pictures[0].url,
				condition: data.condition,
				free_shipping: data.shipping.free_shipping,
				sold_quantity: data.sold_quantity,
				description: ''
			}

			let getCurrency = function (callback) {
				https.get('https://api.mercadolibre.com/currencies/' + retorno.item.price.currency, (resp) => {
					let curStr = '';
					resp.on('data', (chunk) => {
						curStr += chunk;
					}).on('end', () => {
						curStr = JSON.parse(curStr);
						retorno.item.price.currency = curStr.symbol;

						callback();
					}).on('error', (err) => {
						res.json({
							erro: err.message
						});
					})
				});
			}

			let getDescription = function (callback) {
				https.get('https://api.mercadolibre.com/items/' + retorno.item.id + '/description', (resp) => {
					let curStr = '';
					resp.on('data', (chunk) => {
						curStr += chunk;
					}).on('end', () => {
						curStr = JSON.parse(curStr);
						retorno.item.description = curStr.plain_text;
						callback();
					}).on('error', (err) => {
						res.json({
							erro: err.message
						});
					})
				});
			}

			getCurrency(function () {
				getDescription(function () {
					res.json(retorno);
				});
			});

		});


	}).on('error', (err) => {
		res.json({
			erro: err.message
		});
	});
});

app.get('/api/items', function (req, res) {
	https.get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + req.query.q, (resp) => {
		let data = '';
		let retorno = {};

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			data = JSON.parse(data);

			retorno.author = {
				name: 'Guilherme',
				lastname: 'Ventura de Souza'
			};

			retorno.categories = [];
			retorno.items = [];

			data.available_filters.map(function (value) {
				if (value.id == 'category') {
					value.values.map(function (cat) {
						retorno.categories.push(cat.name);
					});
				}
			});

			data.results.map(function (value) {
				retorno.items.push({
					id: value.id,
					title: value.title,
					price: {
						currency: value.currency_id,
						amount: Math.floor(value.price),
						decimal: ((value.price % 1).toFixed(2) * 100)
					},
					condition: value.condition,
					free_shipping: value.shipping.free_shipping,
					picutre: value.thumbnail

				});
			});

			let getCurrencies = function () {
				//Mapeia os simbolos de moedas
				async.map(retorno.items, function (item, callback) {
					https.get('https://api.mercadolibre.com/currencies/' + item.price.currency, (resp) => {
						let curStr = '';
						resp.on('data', (chunk) => {
							curStr += chunk;
						}).on('end', () => {
							curStr = JSON.parse(curStr);
							let aux = curStr;
							curStr = item;
							curStr.price.currency = aux.symbol;
							callback(null, curStr);

						}).on('error', (err) => {
							return callback(null, err);
						})
					});


				}, function (err, extend) {
					if (err) {
						res.json({
							erro: err.message
						});
					}

					retorno.items = extend;
					res.json(retorno);
				});
			}

			getCurrencies();
		});

	}).on("error", (err) => {
		res.json({
			erro: err.message
		});
	})
});

app.listen(3000, function () {
	console.log("Server started!");
});