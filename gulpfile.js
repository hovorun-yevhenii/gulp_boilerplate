const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('css', () => {
    return gulp.src('src/css/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 1 version', 'iOS 6'], cascade: false}))
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
