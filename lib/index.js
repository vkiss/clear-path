/**
 * Imports
 */
const del = require("del");
const chalk = require("chalk");
const path = require("path");
const { info } = console;

/**
 * Where the magic happens
 */
const action = ( pathToDelete ) => {
  const resolvedPath = path.resolve( pathToDelete );

  (async () => {
    const deletedFilePaths = await del(resolvedPath);

    if ( deletedFilePaths.length === 0 ) {
      info( chalk.gray( "> not path found with this pattern" ), chalk.bgGray.white( pathToDelete ) );
    } else {
      for ( const deletedPath of deletedFilePaths ) {
        info( chalk.gray( ">" ), chalk.red.strikethrough( deletedPath ), chalk.red( "deleted" ) );
      }
    }
  })();
}

/**
 * Export
 */
module.exports = action;
