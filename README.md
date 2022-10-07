# Pointer

Simple library for getting and setting object values via [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901.html) or dot-delimited formats.

## Highlights

- 🔥 Zero dependencies
- 💻 Works in browser
- 🗜 Tidy and compact, only ~500 bytes minified uncompressed
- ⚡️ Blazing fast

## Usage

```ts
import * as pointer from '@flexent/pointer';

const object = {
    foo: {
        items: [
            { bar: 'one' },
            { bar: 'two' },
            { bar: 'three' },
        ]
    }
};

// If pointer starts with /, then it's interpreted
// as RFC6901 compliant JSON Pointer
pointer.get(object, '/foo/items/1/bar'); // 'two'

// Otherwise it's a dot-delimited path
pointer.get(object, 'foo.items.0'); // { bar: 'one' }

// Set modifies the object, creating additional objects and arrays as needed
const newObj = {}
pointer.set(newObj, 'foo.items.0.bar', '123');
// newObj is now { foo: { items: [{ bar: '123' }] } }
```
