import { Observable } from 'rxjs';

function isType(source: any, typeName: string) {
  return Object.prototype.toString.call(source) === `[object ${typeName}]`;
}

function walk<T>(source: T, cb?: (result: any) => void): Observable<T> {
  return new Observable((obs) => {
    if (!cb) {
      cb = (result) => obs.next(result);
    }

    const resolveError = (err: any) => {
      if (!(err instanceof Error)) {
        err = new Error(err);
      }

      // TODO: throw error or return error as result?
      cb!(err);
    };

    if (source instanceof Promise) {
      source.then((result) => {
        walk(result, cb).subscribe();
      }, resolveError);
      return;
    }

    if (source instanceof Observable) {
      let latestValue: any;
      source.subscribe((result) => {
        latestValue = result;
      }, resolveError, () => {
        walk(latestValue, cb).subscribe();
      });
      return;
    }

    if (isType(source, 'Array') || isType(source, 'Object')) {
      const newSource: any = Array.isArray(source) ? [] : {};
      let len = Array.isArray(source)
        ? source.length
        : Object.keys(source).length;

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          walk(source[key]).subscribe((result) => {
            len -= 1;
            newSource[key] = result;
            if (len === 0 && cb) {
              cb(newSource);
            }
          });
        }
      }
      return;
    }

    cb(source);
  });
}

export default function forkJoinDeep<T extends {[key: string]: any}>(source: T): Observable<T> {
  return walk(source);
}
