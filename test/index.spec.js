import { describe, Try } from 'riteway';
import { traceMethodCalls } from '../src/index';


// a function to test
const sum = (...args) => {
  if (args.some(v => Number.isNaN(v))) throw new TypeError('NaN');
  return args.reduce((acc, n) => acc + n, 0);
};

describe('traceMethodCalls()', async assert => {
  const object={};

  assert({
    given: 'an object',
    should: 'return the same object',
    actual: traceMethodCalls(object),
    expected: object
  });
});

describe('sum()', async assert => {
  const should = 'return the correct sum';

  assert({
    given: 'no arguments',
    should: 'return 0',
    actual: sum(),
    expected: 0
  });

  assert({
    given: 'zero',
    should,
    actual: sum(2, 0),
    expected: 2
  });

  assert({
    given: 'negative numbers',
    should,
    actual: sum(1, -4),
    expected: -3
  });

  assert({
    given: 'NaN',
    should: 'throw',
    actual: Try(sum, 1, NaN).toString(),
    expected: 'TypeError: NaN'
  });  
});