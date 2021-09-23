# clear-path
[![npm version](https://badge.fury.io/js/clear-path.svg)](https://badge.fury.io/js/clear-path)

A node library for deleting a path if exists using [del](https://www.npmjs.com/package/del).

## Instalation

```bash
npm i clear-path --save-dev
```

## How
```json
# package.json
{
  "scripts": {
    "clean": "clear-path"
  },
  "clearpath": "dist"
}
```

The `clearpath` value can a string, or an array of strings of glob patterns.

## Configuration

You must add a configuration either within `package.json`, or creating a `.clearpathrc`

#### Using `package.json`

```json
{
  "clearpath": [
    "dist/*.png",
    "dist/*.jpg"
  ],
}
```

#### Using `.clearpathrc`

```yml
dist/*.png
dist/*.jpg
```

## How (in JS)
```js
const clearPath = require( "clear-path" );

clearPath("dist");
```