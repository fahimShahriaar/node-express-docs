## node-express-docs ##

node express documentation

### L-4-globalObjectAndModuleSystem ###
**Concept:** <br />
Global Object in Node.js is kind of window object in Browser. Each js file is a module in node.js. 3 types of module present in Node.
1. Core Module
2. Custom/own module
3. External module/npm module <br />

Each modules are wrapped in a hidden module wrapper function which is nothing but a IIFE function. This function have some parameters which are **exports, require, module, __filename, __dirname**. These are objects. That's why we can access these objects anywhere in our node application. <br />

To use our own module in root module we have to export the module from our module file and import it in our root module. <br />
Code example: https://github.com/fem97/node-express-docs/tree/main/L-4-globalObjectAndModuleSystem <br />

### L-5-nodeServerAndCoreModules ###
**Core Modules** <br />
**FS Module:** Read, Write and manipulate file system. Read, write with sync and async way. <br />
**HTTP:** Create HTTP server and send response. [Note: you can use express.js for this] <br />
**OS:** There are lots of method in OS module. To get CPU information, free memory, host name, arch, osPlatform and many more information about system use OS module. <br />
**Path:** To get pathname, directory name. Manipulate path in server. <br />

### L-6-streamAndBuffer ###
In terms of large data you should use streaming and buffering. The main concept is data is delivered and received in a small pieces of chunk. Example: Suppose you have a large text file size 10mb. If you don't stream the file to send or receive the process will be slow. The full file will be loaded based on the internet speed and you get the full data. But in terms of streaming the concept is - you send or receive small pieces of data or chunk of data and you can see or manipulate the data. 