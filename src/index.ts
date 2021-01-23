import { Observable } from 'rxjs';

function forkJoinDeep(sources: any, cb?: (result: any) => void) {
  return new Observable((obs) => {
    if (!cb) {
      cb = (result) => obs.next(result);
    }

    if (sources instanceof Observable) {
      sources.subscribe((result) => {
        forkJoinDeep(result, cb).subscribe();
      });
      return;
    }

    if (Array.isArray(sources) || typeof sources === 'object') {
      const newSources: any = Array.isArray(sources) ? [] : {};
      let len = Array.isArray(sources)
        ? sources.length
        : Object.keys(sources).length;

      for (const key in sources) {
        if (Object.prototype.hasOwnProperty.call(sources, key)) {
          forkJoinDeep(sources[key]).subscribe((result) => {
            len -= 1;
            newSources[key] = result;
            if (len === 0 && cb) {
              cb(newSources);
            }
          });
        }
      }
      return;
    }

    cb(sources);
  });
}

export default function (sources: any) {
  return forkJoinDeep(sources);
}
