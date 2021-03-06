/**
 * Starting the first Build
 **/

import gulp from 'gulp';
import runSequence from 'run-sequence';

const initTask = (cb) => {
    runSequence(
        'boilerplates',
        'views',
        'systemFiles',
        'createDirs',
        'favicons',
        'js-modernizr',
        'compile:js',
        'scss',
        'js-plugins',
        'js-move',
        'js-scripts',
        'images',
        'svg-single',
        'svg-sprite',
        cb
    )
}

gulp.task('init', initTask);
module.exports = initTask;