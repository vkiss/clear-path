/**
 * Imports
 */
const del = require( "del" );
const chalk = require( "chalk" );
const path = require( "path" );
const { info } = console;

/**
 * Where the magic happens
 */
const action = ( pathToDelete ) => {
  const resolvedPath = path.resolve( pathToDelete );

  ( async () => {
    const deletedFilePaths = await del( resolvedPath );

    if ( deletedFilePaths.length === 0 ) {
      info( chalk.gray( ">" ), chalk.bgGray.white( pathToDelete ), chalk.gray( "does not exist" ) );
    } else {
      for ( const deletedPath of deletedFilePaths ) {
        info( chalk.gray( ">" ), chalk.red.strikethrough( deletedPath.replace( path.resolve( "./" ), "" ) ), chalk.red( "deleted" ) );
      }
    }
  } )();
};

/**
 * Export
 */
module.exports = action;
