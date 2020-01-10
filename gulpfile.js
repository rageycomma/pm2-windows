const gulp = require("gulp");
const gulpTypescript = require("gulp-typescript");
const del = require("del");

const COMPILE_OUT_DIR = "dist";
const TSCONFIG_NAME = "tsconfig.json"

/**
 * Builds out the typescript source code.
 *
 * @returns
 */
function buildTypescript() {
    const gulpTSProject = gulpTypescript.createProject(TSCONFIG_NAME);

    return gulp.src("src/**/*.ts")
        .pipe(gulpTSProject())
        .pipe(gulp.dest(COMPILE_OUT_DIR));
}

/**
 * Clears the build directory so that sources are up-to-date.
 */
async function clearBuildDirectory() {
    return del([COMPILE_OUT_DIR]);
}

// Definition of Gulp tasks
gulp.task("buildTypescript", buildTypescript);
gulp.task("clearBuildDirectory", clearBuildDirectory);

module.exports = {
    default: gulp.series("clearBuildDirectory", "buildTypescript"),
};