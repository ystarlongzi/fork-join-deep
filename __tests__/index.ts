import { of } from 'rxjs';
import forkJoinDeep from '../src';

describe('forkJoinDeep', () => {
  it('should support primitive values', (done) => {
    const source = {
      a: 0,
      b: '0',
      c: true,
      d: undefined,
      e: null,
    };
    forkJoinDeep(source).subscribe((result) => {
      expect(result).toEqual(source);
      done();
    });
  });

  it('should return its own property', (done) => {
    const source = Object.create({
      p1: 'p1',
      p2: of('p2'),
    });
    Object.assign(source, {
      ownP1: 'p1',
      ownP2: of('p2'),
    });
    forkJoinDeep(source).subscribe((result) => {
      expect(result).toEqual({
        ownP1: 'p1',
        ownP2: 'p2',
      });
      done();
    });
  });

  it('should support array', (done) => {
    const source = {
      a: [1, '2'],
    };
    forkJoinDeep(source).subscribe((result) => {
      expect(result).toEqual(source);
      done();
    });
  });

  it('should support observable', (done) => {
    const source = {
      a: [1],
      b: [of('b1'), of('b2')],
      c: of(of('c')),
    };
    forkJoinDeep(source).subscribe((result) => {
      expect(result).toEqual({
        a: [1],
        b: ['b1', 'b2'],
        c: 'c',
      });
      done();
    });
  });

  it('should support nested object', (done) => {
    const source = {
      a: {
        a1: {
          a11: of('a11'),
        },
        a2: of(of('a2')),
      },
      b: 1,
    };
    forkJoinDeep(source).subscribe((result) => {
      expect(result).toEqual({
        a: {
          a1: {
            a11: 'a11',
          },
          a2: 'a2',
        },
        b: 1,
      });
      done();
    });
    done();
  });
});