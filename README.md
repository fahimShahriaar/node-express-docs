## node-express-docs ##

node express documentation

### L-4-globalObjectAndModuleSystem ###
Global Object in Node.js is kind of window object in Browser. Each js file is a module in node.js. # types of module present in Node.
1. Core Module
2. Custom/own module
3. External module / npm module
Each modules are wrapped in a hidden module wrapper function which is nothing but a IIFE function. This function have some parameters which are **exports, require, module, __filename, __dirname**. These are objects. \n
That's why we can access these objects anywhere in our node application.
