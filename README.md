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

The `clearpath` value can a string, or an array of glob patterns strings.

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

## Multiple clear-path routines

### Example: package.json

Chose either one of the configurations samples below.

```json
# package.json
{
  "scripts": {
    "clean": "clear-path --routine=all",
    "clean:dist": "clear-path --routine=dist"
  },
  "clearpath": {
    "routine": {
      "all": [
        "dist",
        "public"
      ],
      "dist": "dist",
    }
  }
}
```

### Example: clearpath.rc

```yml
routine:
  all:
    dist
    public
  dist: dist
```
