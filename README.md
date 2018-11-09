# Webpack FE starter using yarn  

## Usage  
Install **yarn:** [Installation instructions](https://yarnpkg.com/en/docs/install)  

## Development setup
* Clone the repository ```git clone <repo url>```
* Navigate to project directory and run ```yarn install``` to install required modules

## Project setup
* Define design specific dimensions variables at **src/scss/variables/_v--dimensions.scss**
* Adjust variables and mixins to meet the design specifics; for example, if there is no design for tablet, delete the additional argument called in ```font-size-vw()``` in **src/scss/variables/_v--typography.scss** (also delete the additional argument from ```font-size-vw()``` mixin in **src/scss/mixins/_m--font-size.scss**), and delete tablet entries from the font-size and line-height mixins
* Define fonts and font variables in **src/scss/variables/_v--typography.scss**
* Adjust base wrappers in **src/scss/layouts/_wrappers.scss**
* Code away

### Assets folders:
**Put assets here:**
* Fonts: **html/assets/fonts/**
* Images: **html/assets/images/**

### Compilation paths:
* CSS (styles.css) is compiled to: **html/css/**
* Javascript (master.bundle.js) is compiled to: **html/js/**

#### Important note about paths:
* For JavaScript, require assets relative to the path of the file you are requiring them from
* For SCSS, require assets relative to the path of the main **style.scss**

### Commands:
* ```yarn run dev-local``` - Runs webpack-dev-server for development mode, use when working on local static project
* ```yarn run dev``` - Runs webpack in watch mode, use when working on the development server in vagrant
* ```yarn run build``` - Bundle code once, and exit
* ```yarn run prod``` - Bundle code for production, includes css and javascript minification

### Command simplification:
If working on Linux or Mac, in order to simplify the commands, you can add an alias to your shell configuration file (.bashrc, .zshrc, etc). Navigate to home folder in the terminal, type ```nano .bashrc``` (or .zshrc).

At the end of the file, add ```alias dev-local='yarn run dev-local'```. Restart the terminal, and now you can type only ```dev-local``` in the project folder, to start the webpack dev server. If needed, create aliases for other commands as well.

**Note: Make sure you don't name your alias the same as some other system command, and that it does not conflict with other alias's names.**

## Bundle analysis
A tool for bundle analysis, provides useful information about the state of the bundle, errors, warnings, module interconnectivity, etc.

1. Generate webpack stats file, from project root enter ```webpack --profile --json --config=webpack_config/build.config.js > stats.json```
2. Go to: [http://webpack.github.io/analyse/](http://webpack.github.io/analyse/)
3. Upload the generated stats.json file
