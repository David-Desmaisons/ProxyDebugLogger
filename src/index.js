function traceMethodCalls(obj) {
  const handler = {
    get(target, propKey) {
      const origMethod = target[propKey];
      if (typeof origMethod !== "function") {
        return origMethod;
      }
      return function(...args) {
        let result = origMethod.apply(target, args);
        window.console.log(
          propKey + JSON.stringify(args) + " -> " + JSON.stringify(result)
        );
        return result;
      };
    }
  };
  return new Proxy(obj, handler);
}

export {
  traceMethodCalls
};