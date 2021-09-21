/**
 * Imports
 */
const fs = require( "fs" );
const del = require("del");
const chalk = require("chalk");
const { info } = console;

/**
 * Where the magic happens
 */
const action = ( pathToDelete ) => {
  if ( fs.existsSync( pathToDelete ) ) {
    del( pathToDelete );
    info( chalk.red( `* Deleted path ${pathToDelete}` ) );
  } else {
    info( chalk.white.bgRed( `* Path not found: ${pathToDelete}` ) );
  }
}

/**
 * Export
 */
module.exports = action;
