import { describe } from 'riteway';
import { plugFakeWindow } from './Fake/FakeWindow';
import { traceMethodCalls } from '../src/index';

describe('traceMethodCalls()', async assert => {
  {
    const simpleObject = {
      "one": 1,
      "two": "two",
      "three": [
        "v1",
        "v2",
        "v3"
      ]
    };

    assert({
      given: 'an object without method',
      should: 'return the same object',
      actual: traceMethodCalls(simpleObject),
      expected: simpleObject
    });
  }

  {
    const window = plugFakeWindow();

    const objectWithMethod = {
      id: (value) => value
    };

    const transformed = traceMethodCalls(objectWithMethod);
    const { id } = transformed;

    ["abc", 1, null, undefined, ["a", "b"], []].forEach(value => {
      assert({
        given: 'a proxified object method',
        should: `return a method performing same transformation as original: ${value} => ${value} `,
        actual: id(value),
        expected: value
      });
    });

    ["abc", 1, null, undefined, ["a", "b"], []].forEach(value => {
      id(value);
      const expected = [`id${JSON.stringify([value])} -> ${JSON.stringify(value)}`];
      assert({
        given: 'a proxified object method',
        should: `log operation for entry ${value}`,
        actual: window.lastLog,
        expected
      });
    });
  }
});