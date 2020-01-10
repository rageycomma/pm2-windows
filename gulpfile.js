const gulp = require("gulp");
const gulpTypescript = require("gulp-typescript");

function buildTypescript() {
    const project = gulpTypescript.createProject("tsconfig.json")

    return gulp.src("src/**/*.ts")
        .pipe(typescript({

        }))
}