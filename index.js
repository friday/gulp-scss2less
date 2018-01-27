const through = require('through2');
const PluginError = require('plugin-error');
const Converter = require('less-plugin-sass2less/lib');

const {process} = new Converter();

const convert = (input, options = {}) => {
	const unsupported = ['@elseif', '@extend'];
	if (!options.customFunctions) { // this can be supported with less-plugin-functions
		unsupported.push('@function');
	}

	unsupported
		.filter(feature => input.includes(feature))
		.forEach(feature => {
			throw new Error(`${feature} cannot be converted to less`);
		});

	return process(input, {})
		.split('.scss";')
		.join('.less";');
};

module.exports = options => through.obj((file, enc, next) => {
	if (!file.isNull()) {
		try {
			const scss = file.contents.toString('utf8');
			const less = convert(scss, options);
			const contents = Buffer.from(less);
			const path = file.path.replace(/\.scss$/, '.less');
			Object.assign(file, {path, contents});
		} catch (err) {
			return next(new PluginError('gulp-scss2less', err));
		}
	}
	return next(null, file);
});
