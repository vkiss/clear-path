#!/usr/bin/env node

import { cosmiconfig } from "cosmiconfig";
import chalk from "chalk";

import clearPath from "../lib/index.js";

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

const clearPathArrayOrString = ( pathsToDelete ) => {
  if ( typeof( pathsToDelete ) === "string" ) {
    clearPath( pathsToDelete );
    return;
  }

  if ( Array.isArray( pathsToDelete ) ) {
    for ( const path of pathsToDelete ) {
      clearPath( path );
    }
    return;
  }

  return displayError( "wrong configuration" );
};

const runScript = () => {
  // Script start message
  info( chalk.gray( "> clear-path.js" ) );

  const explorer = cosmiconfig( "clearpath" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        return displayError( "configuration missing" );
      }

      const pathsToDelete = filterConfig( result.config );

      if ( pathsToDelete.routine ) {
        const args = process.argv.slice( 2 );
        const argRoutine = getRoutine( args );

        if ( argRoutine ) {
          const routineToRun = pathsToDelete.routine[argRoutine];

          if ( routineToRun ) {
            return clearPathArrayOrString( routineToRun );
          }

          if ( pathsToDelete.routine.default ) {
            return clearPathArrayOrString( pathsToDelete.routine.default );
          }

          return displayError( `routine '${argRoutine}' not found` );
        }

        return displayError( "missing routine parameter" );
      }

      clearPathArrayOrString( pathsToDelete );

    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();
