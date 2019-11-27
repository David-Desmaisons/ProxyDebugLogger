function getFunctionHandler(propKey) {
  return {
    apply(target, thisArg, argumentsList) {
      const result = target.apply(thisArg, argumentsList);
      window.console.log(
        propKey + JSON.stringify(argumentsList) + " -> " + JSON.stringify(result)
      );
      return result;
    }
  };
};

function getProxyFunction(propKey, original) {
  const handler = getFunctionHandler(propKey);
  return new Proxy(original, handler);
}


function getHandler() {
  const cache = {};
  return {
    get(target, propKey) {
      const res = cache[propKey];
      if (res) {
        return res;
      }
      const originalValue = target[propKey];
      if (typeof originalValue !== "function") {
        return originalValue;
      }
      const newFunction = getProxyFunction(propKey, originalValue);
      cache[propKey] = newFunction;
      return newFunction;
    }
  };
}

function traceMethodCalls(obj) {
  const handler = getHandler();
  return new Proxy(obj, handler);
}

export {
  traceMethodCalls
};