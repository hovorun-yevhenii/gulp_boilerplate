const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    autoPrefix = require('gulp-autoprefixer'),
    vendors = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];

gulp.task('css', () => {
    return gulp.src('src/css/style.scss')
        .pipe(sass())
        .pipe(autoPrefix({browsers: vendors, cascade: false}))
        .pipe(gulp.dest('src/dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', () => {
    return gulp.src([
        'src/js/utils/*.js',
        'src/js/modules/*.js'
    ])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/dist'));
});

gulp.task('sync', () => {
    browserSync({
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('default', ['sync', 'css', 'js'], () => {
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
