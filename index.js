'use strict';

var childProcess    = require('child_process'),
    exec            = childProcess.execSync,
    chalk           = require('chalk'),
    children        = [],
    spawn           = childProcess.spawn,
    stopped         = false,
    _               = require('lodash');

process.on('SIGINT' , cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
process.on('exit'   , cleanExit);

module.exports = {
    run : runCommands
};

function runCommands(commands) {
    commands.forEach(function(commandInfo) {
        var command = commandInfo[0],
            comment = commandInfo[1],
            options = commandInfo[2];

        comment && console.log(chalk.green('> '), comment);
        if (options && options.async) {
            execBg(command, options);
        } else {
            options = _.extend({ stdio : 'inherit' }, options);
            exec(command, options);
        }
    });
}

function execBg(command, options) {

    command = _.isArray(command) ? command : command.split(' ');
    var args = command.splice(1);
    console.log('bg command:', chalk.yellow(command[0], ' args:', args));
    var child;

    try {
        options = _.extend({ stdio : 'inherit' }, options);
        child = spawn(command[0], args, options);
        children.push(child);
    } catch(e) {
        console.log(chalk.red('error'), e);
    }
}

function cleanExit() {
    var count = 0;
    if (stopped) {
        return;
    }
    console.log();
    console.log(chalk.red('--- Exiting ---'));
    children.forEach(function(child) {
        console.log('Stopping', chalk.blue(++count));
        child.kill();
    });
    stopped = true;
    process.exit();
}
