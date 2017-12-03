var gulp = require('gulp');
var rename = require('gulp-rename');
//var reactEasy = require('gulp-react-easy');
var rupture = require('rupture');
var stylus = require('gulp-stylus');
var nodemon = require('gulp-nodemon');

//Seta tasks que serão chamadas no início da execução do gulp
gulp.task('default', ['start-server', 'w', 'comp-stylus']);

gulp.task('start-server', function () {
	var stream = nodemon({
		script: 'server.js',
		ext: 'js',
		ignore:['site']
	})

	stream
		.on('restart', function () {
			console.log('restarted!')
		})
		.on('crash', function () {
			console.error('Application has crashed!\n')
			stream.emit('restart', 10) 
		})
});

//Adiciona tarefa de watcher
gulp.task('w', function () {
	//assite alterações no diretório /src/js e subdiretórios e se houver alguma alteração executa a task 'js'
	gulp.watch('./site/src/js/**/*', ['js']);
	gulp.watch('./site/stylus/**/*.styl', ['comp-stylus'])
});

//Task de compilação de stylus
gulp.task('comp-stylus', function () {
	var options = {
		//plugins usados com o stylus
		use: [rupture()]
	};

	return gulp.src('./site/stylus/general.styl') //arquivo principal do stylus
		.pipe(stylus(options))
		.pipe(rename('general.css')) //nome do arquivo compilado
		.pipe(gulp.dest('./site/dist/css/')); //destino do arquivo compilado
});

////task 'js'
//gulp.task('js', function () {
//	//gera a compilação do fonte em react
//	return reactEasy({
//			file: './site/src/js/app.jsx', //arquivo jsx a ser compilado/gerado
//			debug: true // optional, false by default
//		})
//		.to('app.js')
//		.pipe(gulp.dest('./site/dist/js/'));
//});