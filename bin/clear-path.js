#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );

const clearPath = require( "../lib" );

const { info } = console;

/**
* ----------------------------------------------------------
*/

const filterConfig = ( config ) => {
  if ( typeof( config ) === "string" ) {
    return config.split( " " );
  }
  return config;
};

const displayError = ( title ) => {
  info( chalk.red( "*" ), chalk.bold.red( title ) );
  info( chalk.gray( "* read https://github.com/vkiss/clear-path/blob/main/README.md#configuration to learn how to configure clear-path.js" ) );
};

const getRoutine = ( args ) => {
  for ( const arg of args ) {
    if ( arg.split( "=" )[0] === "--routine" ) {
      return arg.split( "=" )[1];
    }
  }

  return undefined;
};

const clearPathArrayOrString = ( pathsToDelete, options ) => {
  if ( typeof( pathsToDelete ) === "string" ) {
    clearPath( pathsToDelete, options );
    return;
  }

  if ( Array.isArray( pathsToDelete ) ) {
    for ( const path of pathsToDelete ) {
      clearPath( path, options );
    }
    return;
  }

  return displayError( "wrong configuration" );
};

const runScript = () => {
  const { argv } = process;
  const isSilent = argv.includes( "--silent" );

  // Script start message
  if ( !isSilent ) {
    info( chalk.gray( "> clear-path.js" ) );
  }

  const config = {
    silent: false,
    callback: false
  };

  config.silent = isSilent;

  const explorer = cosmiconfig( "clearpath" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        return displayError( "configuration missing" );
      }

      const pathsToDelete = filterConfig( result.config );

      if ( pathsToDelete.routine ) {
        const argRoutine = getRoutine( argv.slice( 2 ) );

        if ( argRoutine ) {
          const routineToRun = pathsToDelete.routine[argRoutine];

          if ( routineToRun ) {
            return clearPathArrayOrString( routineToRun, config );
          }

          if ( pathsToDelete.routine.default ) {
            return clearPathArrayOrString( pathsToDelete.routine.default, config );
          }

          return displayError( `routine '${argRoutine}' not found` );
        }

        return displayError( "missing routine parameter" );
      }

      clearPathArrayOrString( pathsToDelete, config );

    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();
