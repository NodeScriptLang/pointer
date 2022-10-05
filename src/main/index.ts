export function get(data: any, pointer: string): unknown {
    let value = data;
    const path = parsePath(pointer);
    for (const comp of path) {
        if (value != null) {
            value = value[comp];
        }
    }
    return value;
}

export function set(data: any, pointer: string, value: unknown) {
    const path = parsePath(pointer);
    deepApply(data, path, value);
}

/**
 * Parses a string into components. If it starts with `/`,
 * then treats it as a RFC6901-compliant JSON pointer, otherwise
 * treats it as dot-delimited path.
 */
export function parsePath(pointer: string): string[] {
    if (pointer.startsWith('/')) {
        return pointer.split('/').slice(1).map(_ => escapeJsonPointer(_));
    }
    return pointer.split('.').filter(Boolean);
}

function escapeJsonPointer(str: string) {
    return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

function deepApply(data: Record<string, any>, path: string[], value: any): void {
    if (!path.length) {
        return;
    }
    const [comp, ...rest] = path;
    const isArray = Array.isArray(data);
    const val = path.length === 1 ? value :
        data[comp] ?? (isArrayComp(rest[0]) ? [] : {});
    if (isArray && comp === '-') {
        data.push(val);
    } else {
        data[comp] = val;
    }
    deepApply(val, rest, value);
}

function isArrayComp(comp: string) {
    return comp === '-' || !isNaN(Number(comp));
}
