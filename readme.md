# Vai Kai Website

Static, responsive website for Vai Kai UG.

## Build

### Install

First, pull the git repository locally, then open a terminal and cd to the repository's local folder to run the following commands:

1. Make sure nodeJS > 4 is installed

    First, verify the current node version installed with `node -v`. If the version is below 4.0, update node using one of the following methods:

    + Via the installer provided on [nodejs.org](https://nodejs.org/en/download/)

    + Via npm directly:

        [more info](http://theholmesoffice.com/node-js-fundamentals-how-to-upgrade-the-node-js-version/)

            sudo npm cache clean -f
            sudo npm install -g n
            sudo n stable 

    + Via Node Version Manager:

        Find instructions it the following [article](https://davidwalsh.name/nvm) about using nvm.

2. Make sure xcode and the command-line tools are installed

    If you are running on Mac OSX 10.10 or higher (Yosemite or El Capitan), install xcode from the [app store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

    If you are running on an older version of Mac OSX, download the xcode installer for your version on the apple [developer's website](https://developer.apple.com/downloads/)

    Run xcode at least once and accept the User Agreement.

    Install the Command Line Tools by running the following command in your terminal:

        xcode-select --install

3. Install build/frontend dependencies

    Global dependencies

        sudo npm install -g gulp
        sudo npm install -g bower

    Project dependencies (reads the `package.json` and `bower.json` files to install all needed modules/components)

        npm install
        bower install

### Build project

Open a terminal and cd to the project's folder to run one of the following commands:

    gulp build
    gulp build --dev
    gulp build --dev --watch

Running gulp build without any arguments will build the static website inside the 'www' folder, after bundling and minifying all assets. Caution: this will use `http://vaikai.com` for urls so it should only be used for pushing the website online – the built website won't work locally.

If you use the `--dev` argument, it will build the static website inside the 'www' folder without minifying assets. Use the *serve* task instead if you want to see the built static website in a browser.

Additionally, you can use the `--watch` flag when developing. This will re-compile js and css assets whenever you edit the source files in the `src` folder.

**Note**: for now `--watch` doesn't look for changes in the `src/content` folder. This will be fixed soon but in the mean time you need to re-run `gulp build --dev --watch` whenever you change the content files.

### Serve project

To see the build website in a browser, run the `gulp serve` command which will start a local http server and open it in google chrome using [browsersync](http://www.browsersync.io/). The serve task accepts the same arguments as the build task.

    gulp serve
    gulp serve --dev
    gulp serve --dev --watch

* passing the `--dev` flag will build and serve assets without minifying them
* passing the `--watch` flag will re-compile assets and re-load the browser whenever you make a change in the source files.

**Note**: To stop the server, type `ctrl + C` in the terminal. Also, don't forget to close the tab that was opened in google chrome when running `gulp serve`, otherwise you will have two tabs re-loading next time you run `gulp serve --watch` and that is quite unnecessary.

### Update production website

1. Open an FTP client and connect to `vaikai.com` (ask Matas for connection details).

2. Build the project for production by running `gulp clean`  and then `gulp build` (see above). Running `gulp clean` first will empty the 'www' folder so we are sure only the necessary files get uploaded to the server.

3. Create a folder called '_new' on the server and push the local 'www' inside it.

4. Create a folder called '_old' on the server and move all the files currently on the server's root inside it. **Caution: always leave the htaccess where it is**.

5. Move the files inside the '_new' folder to the server's root.

6. Go to `http://vaikai.com` to verify if everything worked - test thorougly! 

7. If something went wrong, move the files from the server's root back into '_new' and put the files in '_old' back on the root. If the update went fine, remove the '_new' and '_old' folders from the server.

## Updating content

The website's content is encoded in yaml files inside the 'src/content' folder
You can edit the content inside all the yaml files you find there and it will be shipped in the next build.

Each file in that folder represent's a page on the website – it corresponds to a template file with the same name inside the 'src/tempaltes/pages' folder.

Each file in the sub-folders represent a section of the page with the same name as the sub-folder's name. For example 'src/content/company/intro' is a section of the 'company' page.

You can safely add html to any yaml value. If doing so throws an error when building the website, make sure you use a "pipe" sign in front of the yaml value, and put your html on a new line like so:

    description: |
        <p>Morbi leo risus, porta ac consectetur ac,<br />vestibulum at eros. Cum sociis natoque penatibus et <a href="http://example.com/some-page/">magnis dis parturient</a>, montes nascetur ridiculus mus.</p>
        <p>Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.</p>

**Caution: Don't change the structure of the yaml files as it will break the website**

## Front-end

All front-end files are located in the 'src/assets' and 'src/templates' folders

### Stylesheets

Stylesheets are written in [Sass](http://sass-lang.com/) and are compiled with compass. They are organised using an architecture inspired by [SMACSS](https://smacss.com/) and the [BEM methodology](https://en.bem.info/).

*More infos soon*

### Javascripts

Javascript files are written in javascript (no pre-compiler), and are bundled together using [webpack](https://webpack.github.io/). The javascript code is organised into modules which use the commonJS(http://wiki.commonjs.org/wiki/CommonJS) spec.

Only the files directly inside the 'src/assets/scripts' folder (not files in sub-folders) can be loaded on the front-end. They typically correspond to a page from the website and ideally they do nothing else but require the modules they use from the sub-folders. For example:

'src/assets/scripts/toys.js'

    require('modules/menu');
    require('widgets/carousel');

**Note**: javascript files inside the 'src/assets/scripts/vendor' folder are not bundled with the other files and they are loaded separately in the templates.

**Note**: jQuery and Modernizr are automatically made available inside all javascript files accross the project. You'll never have to write `require('jquery');` or `require('modernizr);` but you can always do something like `$('.my-classname)` or `Modernizr.prefixed('transition')`.

*More infos soon*

### Templates

Templates are written with the [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) templating engine.

Inside the templates, a few global variables are available:

- `app`: contains paths and configuration settings
- `data`: corresponds to the 'src/data.json' file
- `page`: contains the page's content. Corresponds to the page's yaml file with the added `sections` key which is an array of objects.

**Note** Each object inside `page.sections` corresponds to a yaml file inside the 'src/content/pages/{page-name}' folder. The order is defined by the `section_order` key in the page's own yaml file.

You can always inspect a given variable with the `log` filter which will output the variable's value in the terminal. For example:

    {{ app|log }}

*more infos soon*

## Credits

Client: [Vai Kai UG](http://vaikai.com)
Project Management: [Katleen Roggeman](katleen@vaikai.co)
Design: [Donatas Vainilaitis](hello@lazyfuture.com)
Development: [Yoannis Jamar](yoannis.j@gmail.com)