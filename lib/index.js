/**
 * Imports
 */
import chalk from "chalk";
import del from "del";
import path from "path";

const { info } = console;

/**
 * Constants
 */

const defaultOptions = {
  silent: false,
  callback: false,
};

/**
 * Where the magic happens
 */
const action = ( pathToDelete, options = defaultOptions ) => {
  const resolvedPath = path.resolve( pathToDelete );

  ( async () => {
    const deletedFilePaths = await del( resolvedPath );

    if ( !options.silent ) {
      if ( deletedFilePaths.length === 0 ) {
        info( chalk.gray( "*" ), chalk.bgGray.white( pathToDelete ), chalk.gray( "does not exist" ) );
      } else {
        for ( const deletedPath of deletedFilePaths ) {
          info( chalk.gray( "*" ), chalk.red.strikethrough( deletedPath.replace( path.resolve( "./" ), "" ) ), chalk.red( "deleted" ) );
        }
      }
    }

    if ( options.callback && typeof options.callback === "function" ) {
      options.callback( deletedFilePaths );
    }
  } )();
};

export default action;
