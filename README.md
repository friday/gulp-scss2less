# gulp-scss2less
Gulp plugin wrapping [less-plugin-sass2less](https://github.com/mediafreakch/less-plugin-sass2less)

There are several other similar projects, but less-plugin-sass2less was the most robust one I could find.

## Usage example

```js
const scss2less = require('gulp-scss2less');

gulp.task('scss2less', () => {
  gulp.src('src/scss/**/*.scss')
    .pipe(scss2less())
    .pipe(gulp.dest('dist/less'));
});
```

## Caveats (mainly the same as less-plugin-sass2less)
* Keep it simple. less-plugin-sass2less is converting line by line with regex rather than using AST transformation (like for example gonzales-pe), but due to similarities between LESS and SCSS this still works very well. You'll likely have to "dumben down" your SCSS a little, or it won't be possible to transpile due to features in SCSS that are not supported by LESS.
* `@elseif`, `@extend` and `@function` cannot be converted, and are hence not supported. `@function` can be supported experimentally by passing `{customFunctions: true}` as an optional parameter for `scss2less`. This will require you to also use [less-plugin-functions](https://github.com/seven-phases-max/less-plugin-functions) though (or if you're building a library, everyone using it would).
* !default attributes: Variables with the same name will not be ignored like in SASS. The most recent takes precedence over the previous one.
* @import statements: less-plugin-sass2less converts import statements to optional in order to support how SASS handles partials (file names with leading underscore). In effect, missing files and files with LESS errors will be ignored rather than the transpilation failing.
