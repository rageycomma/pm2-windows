const gulp = require('gulp');
const gulpTypescript = require('gulp-typescript');
const del = require('del');
const jest = require('gulp-jest').default;
const jestConfig = require('./jest.config');

// Constants, in case file names of dependencies change
const COMPILE_OUT_DIR = 'dist';
const TSCONFIG_NAME = 'tsconfig.json';
const SPEC_DIR = 'spec';

/**
 * Builds out the typescript source code.
 *
 * @returns object
 */
function buildTypescript() {
  const gulpTSProject = gulpTypescript.createProject(TSCONFIG_NAME);

  return gulp.src('src/**/*.ts')
    .pipe(gulpTSProject())
    .pipe(gulp.dest(COMPILE_OUT_DIR));
}

/**
 * Clears the build directory so that sources are up-to-date.
 *
 * @returns Promise<boolean>
 */
async function clearBuildDirectory() {
  return del([COMPILE_OUT_DIR]);
}


/**
 * Runs Jest to perform unit test coverage.
 *
 */
function jestTestsAndCoverage() {
  return gulp.src(SPEC_DIR)
    .pipe(jest(jestConfig));
}

// Definition of Gulp tasks
gulp.task('buildTypescript', buildTypescript);
gulp.task('clearBuildDirectory', clearBuildDirectory);
gulp.task('jestTestsAndCoverage', jestTestsAndCoverage);

module.exports = {
  default: gulp.series('clearBuildDirectory', 'buildTypescript', 'jestTestsAndCoverage'),
};
