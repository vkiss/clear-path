#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );

const clearPath = require( "../lib" );

const { info } = console;

/**
* ----------------------------------------------------------
*/

const filterConfig = ( config ) => {
  if (typeof(config) === "string") {
    return config.split(" ");
  }
  return config;
}

const runScript = () => {
  // Script start message
  info( chalk.gray( "> clear-path.js" ) );

  const explorer = cosmiconfig( "clearpath" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        info( chalk.red( ">" ), chalk.bold.red("configuration missing") );
        info( chalk.gray( "> read https://github.com/vkiss/clear-path/blob/main/README.md#configuration to learn how to configure clear-path.js" ) );
        return;
      }
      const pathsToDelete = filterConfig( result.config );

      if ( typeof( pathsToDelete ) === "string" ) {
        clearPath( pathsToDelete );
        return;
      }

      for ( const path of pathsToDelete ) {
        clearPath(path)
      }
    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();
