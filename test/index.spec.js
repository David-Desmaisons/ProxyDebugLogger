import { describe } from 'riteway';
import { plugFakeConsole } from './Fake/FakeConsole';
import { traceMethodCalls } from '../src/index';

describe('traceMethodCalls()', async assert => {

  const {console, dispose} = plugFakeConsole();

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
  {
    const objectWithMethod = {
      id: (value) => value
    };

    const transformed = traceMethodCalls(objectWithMethod);

    ["abc", 1, null, undefined, ["a", "b"], []].forEach(value => {
      const { id } = transformed;
      assert({
        given: 'a proxified object method',
        should: `return a method performing same transformation as original: ${value} => ${value} `,
        actual: id(value),
        expected: value
      });
    });

    ["abc", 1, null, undefined, ["a", "b"], []].forEach(value => {
      const { id } = transformed;
      id(value);
      assert({
        given: 'a proxified object method',
        should: `log operation for entry ${value}`,
        actual: console.lastLog,
        expected: [`id${JSON.stringify([value])} -> ${JSON.stringify(value)}`]
      });
    });
  }
  {
    const prefix = "myPrefix";
    const objectWithMethod = {
      id: (value) => value
    };

    const transformed = traceMethodCalls(objectWithMethod, prefix);

    ["abc", 1, null, undefined, ["a", "b"], []].forEach(value => {
      const { id } = transformed;
      id(value);
      assert({
        given: 'a proxified object method with prefix',
        should: `log operation for entry ${value} with a prefix`,
        actual: console.lastLog,
        expected: [`${prefix} id${JSON.stringify([value])} -> ${JSON.stringify(value)}`]
      });
    });
  }
  {
    class MyObject {
      constructor(value) {
        this.value = value;
      }

      getValue() { return this.value; }
    }

    ["value", 13].forEach(value => {
      const object = new MyObject(value);
      const transformed = traceMethodCalls(object);

      assert({
        given: 'a method',
        should: `use the proxified object as this context and return ${value}`,
        actual: transformed.getValue(),
        expected: object.getValue()
      });
    });
  }
  dispose();
});