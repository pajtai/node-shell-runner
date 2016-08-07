# node-shell-runner

Requires [child_process.execSync](https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options).

## Usage

```javascript
var runner = require('node-shell-runner');

runner.run([
    ['cp app build', 'Copying to build dir'],
    ['watch build bin/rerun', 'Starting build watcher', { async : true }]
]);
```

Require in npm and pass an array of commands to `.run`.

Each command is an array. The first item is the command, the second items is a descriptions, the optional third item
is [the options object for the command](https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options).

An additional option that is interpreted before being bassed to node is whether the command should be run in the bacgkround using `child_process.spawn`.
If `async` is truthy, it will.

Async commands will be split on spaces and put into and array. If this will break your command, make the command an
array or put the command in a separate bin instead:

```javascript
var runner = require('node-shell-runner');

runner.run([
    [
        ['watch', '"bin/util/sass output"', 'app/styles', 'app/views'],
        'Starting sass watcher',
        { async : true }
    ]
]);
```
