// html-beautify options - more infos:
// @link https://github.com/beautify-web/js-beautify#css--html
module.exports = function(config, env) {

  return {
    indent_size: 2,
    indent_char: " ",
    indent_scripts: 'normal',
    extra_liners: ['head', 'body', '!--=header--', '!--=main--', '!--=footer--', '!--=scripts--', '/html']
  };

};