_This repository is based on the [Webpack boilerplate repository](https://github.com/taniarascia/webpack-boilerplate)_ 
# SQL Frames + React DEMO

This repository provides a working example of how to integrate [SQL Frames](https://sqlframes.com) with React. Each application is unique in its needs and dependencies. Hence, this should only be taken as a reference and should not rely on this for a complete solution for the application to work with many other internal/external dependencies. A strong understanding of Webpack, ES Modules and AMD (require.js) can come a long way to solve complex application specific bundling requirements.

***
DISCLAIMER - This code is provided only as an example and does not come with any implied guarantee of support. Official support is only available through the commercial licensing of **SQL Frames**.
***

## Theory

You can skip this and directly go to [Install & Start](#install_start) to get started right away. However, understanding this section is important to solve the unique requirements of your app that leverages **SQL Frames**.

### Why the complexity?

**SQL Frames** is an in-browser in-memory data, visualization and intelligence platform with several building blocks. Not all application need all the functionality of **SQL Frames**. In a traditional desktop or server-side software, there is usually no need worry to about the final executable size. However, that is not the case with code within the browser as it needs to be downloaded, compiled and executed and that can increase the initial load and render times. Hence, **SQL Frames** is designed to have several types of dependencies

1. required dependencies - these are must to make **SQL Frames** to work
1. optional dependencies - these are optional and certain features of **SQL Frames** will not work if these dependencies are not provided
1. dynamic optional dependencies - these dependencies are not loaded initially and only loaded when the associated functionality is required. The reason why all optional dependencies are not dynamic is that making a dependency dynamic results in async execution (that is, the dependency has to be first resolved before the feature code can start executing) making either 1) the API complicated 2) slightly slower compared to a non-async API.

In addition, **SQL Frames** is designed to work in different environments

1. browsers
1. electronjs
1. node
1. scripting engines (GraalVM)

Each of these environments have some limitations and some features may or may not be available.

All of this adds complexity, but also provides a solid platform for creating advanced solutions.

### Why AMD (require.js)?

In order to support the optional and dynamic dependencies and the ability to make use of CDN for 3rd party dependencies, **SQL Frames** leverages the AMD format and resolves the dependencies on the client-side.

```
Note: **SQL Frames** libraries are available as both UMD and ESM formats. Hence, custom build can be setup to pre-bundle all the dependencies of SQL Frames and not use the require.js based approach at all. Or the custom build can pre-bundle the required dependencies and leave out optional dependencies that may not be used at all.

Unlike some 3rd party dependencies **SQL Frames** gives the control to the app in how all the dependencies are resolved.
```

All the 3rd party javascript dependencies of **SQL Frames** are listed in `@sqlframes/repl-app/dist/libs.js`. They are not explicitly listed in the package.json (that may change) since the default approach is to resolve the dependencies on the client via CDN and not bundle them. The default require.js configuration is provided at `@sqlframes/repl-app/dist/main.js` which includes the previously mentioned `libs.js`. Usage of both these files is completely optional. This repository uses them to show how to setup the dependencies on the client-side.

### Webpack configuration

The main change to the webpack configuration is in the `webpack.common.js` file. All the dependencies are listed as externals so they are not pre-bundled. In addition, the output format is setup as `amd-require` so the entire app is wrapped in a `require(...)` call with all the dependencies listed. In addition the `libs.js` and `main.js` files are copied to `static/js` directory. The `main.js` file is used in the `template.html` file to setup the client-side dependencies before letting the `main.bundle.js` take over to execute the application code.

### Themes

**SQL Frames** supports `light` and `dark` themes. These are two separate css files and at any time one of them is active. Hence these theme files can't be bundled into a single css file. Hence, `webpack.common.js` has code to copy the `@sqlframes/repl-app/dist/styles/themes/` to `static/styles` directory so they can be directly referenced within the `template.html`

### Building wrappers

The `@sqlframes/repl/react` entry point exposes three namespaces, `sqlframes`, `repl` and `repl_react`. Refer to [App.js](/src/js/App.js) to see all the top level classes/objects exposed in each of these namespaces.

## <a name='install_start'></a> Install & Start

At this time **SQL Frames** is not distributed via npm. Assuming you have downloaded the **SQL Frames** package (typically a `sqlframes-repl-app-<version>.tgz` file), following steps can be followed.

1. Clone this repository

```sh
git clone https://github.com/dirslashls/sqlframes-react-demo
```

2. Change to sqlframes-react-demo directory

```sh
cd sqlframes-react-demo
```

3. Add **SQL Frames** library dependency

```sh
yarn add <path-to-sqlframes-repl-app-<version>.tgz>
```

4. Install other dependencies

```sh
yarn install
```

5. Start the server

```sh
yarn start
```

