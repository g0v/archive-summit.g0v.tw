require! <[gulp gulp-util express connect-livereload gulp-jade gulp-livereload path]>
require! <[gulp-if gulp-livescript gulp-less gulp-stylus gulp-concat gulp-json-editor gulp-commonjs gulp-insert streamqueue gulp-uglify gulp-open gulp-plumber gulp-rename gulp-jsonminify gulp-xgettext gulp-concat-po gulp-exec]>

gutil = gulp-util

app = express!

build_path = '_public'
production = true if gutil.env.env is \production

gulp.task 'i18n', ->
  gulp.src 'i18n/src/*.ls'
    .pipe gulp-livescript({+json,+bare}).on 'error', gutil.log
    .pipe gulp-jsonminify!
    .pipe gulp-insert.prepend -> '- var ' + (it.path.match /\/([a-zA-Z]+)\.js(on)?$/ .1) + '_i18n = '
    .pipe gulp-rename extname: '.jade'
    .pipe gulp.dest "i18n/gen"

gulp.task 'pot' ->
  gulp.src 'app/**/*.jade'
    .pipe gulp-xgettext do
      language: 'jade'
      keywords: [name: '_']
      bin: 'node_modules/.bin/jsxgettext'
    .pipe gulp-concat-po 'messages.pot'
    .pipe gulp.dest "i18n/templates"

gulp.task 'update-po' ->
  console.log \meh
  gulp.src 'i18n/*/messages.po'
    .pipe gulp-exec 'msgmerge -U <%= file.path %> i18n/templates/messages.pot'
    .pipe gulp-exec.reporter {+err, +stderr, +stdout}


gulp.task 'translations', <[i18n]> ->
  require! <[fs gettext-parser]>
  # we don't have md files for now.
  # so unlike g0v.tw, we list langs explicitly instead of readDir('md').
  langs = <[zh-tw en-us]>
  for let lang in langs
    real-lang = lang.replace /(\w+-)(\w+)/, (,$1,$2) -> $1+$2.toUpperCase!
    lang-in-jade = lang.replace /-.+$/, ""
    po = gettextParser.po.parse fs.readFileSync(path.resolve("i18n/#lang/messages.po")), "utf-8"
    translations = {[msgid, msgstr.join ''] for msgid, {msgstr} of po.translations['']}

    gulp.src 'app/partials/*.jade'
      .pipe gulp-jade do
        locals:
          lang: lang-in-jade
          _: -> translations[it] || it
          translations: translations
      .pipe gulp.dest "#{build_path}/#{real-lang}"

gulp.task 'html', <[translations]>, ->
  gulp.src 'app/*.jade'
    .pipe gulp-plumber!
    .pipe gulp-jade do
      locals:
        _: -> it
    .pipe gulp.dest "#{build_path}"

require! <[gulp-bower main-bower-files gulp-filter]>

gulp.task 'bower' ->
  gulp-bower!

gulp.task 'js:vendor' <[bower]> ->
  bower = gulp.src main-bower-files!
    .pipe gulp-filter -> it.path is /\.js$/

  vendor = gulp.src 'vendor/scripts/*.js'

  s = streamqueue { +objectMode }
    .done bower, vendor
    .pipe gulp-concat 'vendor.js'
    .pipe gulp-if production, gulp-uglify!
    .pipe gulp.dest "#{build_path}/js"

gulp.task 'js:app', ->
  env = gulp.src 'app/**/*.jsenv'
    .pipe gulp-json-editor (json) ->
      for key of json when process.env[key]?
        json[key] = that
      json
    .pipe gulp-insert.prepend 'module.exports = '
    .pipe gulp-commonjs!

  app = gulp.src 'app/**/*.ls'
    .pipe gulp-plumber!
    .pipe gulp-livescript({+bare}).on 'error', gutil.log

  streamqueue { +objectMode }
    .done env, app
    .pipe gulp-concat 'app.js'
    .pipe gulp-if production, gulp-uglify!
    .pipe gulp.dest "#{build_path}/js"

gulp.task 'css', ->
  compress = production
  gulp.src 'app/styles/app.styl'
    .pipe gulp-plumber!
    .pipe gulp-stylus!
    .pipe gulp.dest "#{build_path}/css"

gulp.task 'assets', ->
  gulp.src 'app/assets/**/*'
    .pipe gulp-filter -> it.path isnt /\.ls$/
    .pipe gulp.dest "#{build_path}"

gulp.task 'server', <[ build ]> ->
  app.use connect-livereload!
  app.use express.static path.resolve "#build_path"
  app.all '/**', (req, res, next) ->
    res.sendFile __dirname + "/#{build_path}/404.html"
  app.listen 3333
  gulp-util.log gulp-util.colors.bold.inverse 'Listening on port 3333'

gulp.task 'open' <[build server]> ->
  require! 'os'
  app = switch os.platform!
  | 'linux' => 'google-chrome'
  | 'win32' => 'Chrome'
  | 'darwin' => 'Google Chrome'
  | otherwise => 'Google Chrome' # TODO: findout other os

  gulp.src "#{build_path}/index.html"
    .pipe gulp-open '', do
      url: 'http://localhost:3333'
      app: app

gulp.task 'watch', <[ build server ]> ->
  gulp-livereload.listen silent: true
  gulp.watch [
    'app/**/*.jade'
    'md/**/*.md'
    'i18n/gen/**/*.jade'
  ], <[ html ]> .on \change, gulp-livereload.changed
  gulp.watch 'app/**/*.styl' <[ css ]> .on \change gulp-livereload.changed
  gulp.watch 'app/**/*.ls' <[ js:app ]> .on \change gulp-livereload.changed
  gulp.watch 'i18n/src/**/*.ls' <[ i18n ]>

gulp.task 'build', <[i18n html js:vendor js:app assets css]>
gulp.task 'dev', <[ open watch ]>
gulp.task 'default', <[build]>
