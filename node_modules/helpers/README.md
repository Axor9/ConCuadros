### node-helpers

Node.js methods to help in getting paths relative to current script and in requiring relative modules

#### why

When using relative paths that use '.' the paths are sometimes not resolved correctly if the current working directory is not the same as the script that requires the relative path.  The solution is to use __dirname.  This is not really an issue when requiring modules, as require is very robust in Node.js, however functionality for requiring relative paths and from a 'lib' subdir are included to help reduce boilerplate code and generally speed up development time for my projects.  This is mostly seen when working with many and/or deeply nested paths in a module.  For just a few require statements this module isn't really helpful as it will not save that much in terms of repetitive coding.  However, to keep the examples succint, they are of course contrived and as such may not be very illustrative of if and when the usefulness of this module becomes more apparent.

suppose you have a directory structure like
<pre>
/lib
  - index.js
  - foo.js
  - bar.js
</pre>

and assuming this module is required like so

    var h = require('helpers')(__dirname, exports);

then the following method examples would apply

##### require
require relative modules

    var lib = h.require('lib'),
        foo = h.require('lib/foo'),
        bar = h.require('lib/bar');


##### exports
export a module by name relative to the current module's directory

normally the code for this might be something like

    exports.lib = require(__dirname + '/lib');
    exports.libFoo = require(__dirname + '/lib/foo');
    exports.libBar = require(__dirname + '/lib/bar');
    // etc ad nauseum...

using the helpers exports method reduces this to

    h.exports('lib')
    h.exports('lib/lib1')
    h.exports('lib/lib2')

The above examples are equivalent.  Dash, slash, space, and '.' separated file-names will be converted to camelCase, e.g.

    h.exports('foo/bar/buz')

will result in the buz module being exported as a property with identifier 'fooBarBuz' from the current module


##### imports
extends the properties of a module's exports object with the exported properties of a module at a relative path to the current script

    h.imports('lib')

if the **lib** module had two exported properties 'foo' & 'bar', the current module will now be exporting those properties in addition to any existing and later exports, if any.


#### lib
lib can be prepended to the above methods when you want to require from a relative subdir called 'lib' - so for example, for the exports method, you could use

    h.lib.exports('foo')

The above would export the module foo.js in the lib subdir as a property called 'foo' of the current script's module.  This is useful for me in that I often structure Node.js projects such that all of the code is in a lib subdir and the entry-point for main in package.json points to an index.js file that simply aggregates the library submodules - a pretty common pattern for npm packages.

####tests
More detailed examples can be seen in the test/test.js file.  If you wish to actually run the tests, cd into the dir node-helpers is installed in.  If you do not already have mocha, chai, and should.js installed globally, you can install them by typing

    npm install

although for mocha, at least, it is recommended that it be installed globally, so you can simply type

    mocha

to run the tests.

#### installation

npm install helpers

#### license: MIT
see LICENSE.txt for more info
