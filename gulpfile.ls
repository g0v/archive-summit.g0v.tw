require! <[ gulp gulp-util gulp-livescript gulp-stylus tiny-lr path gulp-livereload gulp-jade ]>

server = tiny-lr!
build-path = '_public'

gulp.task \html <[jade]> ->
  gulp.src 'src/**/*.html'
    .pipe gulp.dest "#build-path"
    .pipe gulp-livereload server

gulp.task \jade ->
  gulp.src 'src/**/*.jade'
    .pipe gulp-jade!
    .pipe gulp.dest '_public'

gulp.task \ls ->
  gulp.src 'src/**/*.ls'
    .pipe gulp-livescript!
    .pipe gulp.dest "#build-path"
    .pipe gulp-livereload server

gulp.task \css <[styl]> ->
  gulp.src \src/*.css
    .pipe gulp.dest "#build-path"
    .pipe gulp-livereload server

gulp.task 'styl' ->
  gulp.src './src/**/*.styl'
  .pipe gulp-stylus use: <[nib]>
  .pipe gulp.dest "#build-path/css"
  .pipe gulp-livereload server

gulp.task 'files' ->
  gulp.src <[src/**/*.json src/**/*.csv]>
    .pipe gulp.dest "#build-path"
  gulp.src <[src/img/*]>
    .pipe gulp.dest "#build-path/img"

gulp.task \express, ->
  require! express
  app = express!
  EXPRESSPORT = 3000
  app.use require('connect-livereload')!
  app.use express.static path.resolve "#build-path"
  app.listen EXPRESSPORT
  gulp-util.log "Server available at http://localhost:#EXPRESSPORT"

gulp.task \watch, ->
  LIVERELOADPORT = 35729
  server.listen LIVERELOADPORT, ->
    return gulp-util.log it if it
  gulp.watch \src/**/*.html, <[html]>
  gulp.watch \src/**/*.jade, <[jade]>
  gulp.watch \src/**/*.ls, <[ls]>
  gulp.watch \src/**/*.css, <[css]>
  gulp.watch \src/**/*.styl, <[styl]>

gulp.task \build <[ html ls css files]>
gulp.task \default <[ build express ]>
gulp.task \dev <[ build express watch ]>

# vi:et:ft=ls:nowrap:sw=2:ts=2
