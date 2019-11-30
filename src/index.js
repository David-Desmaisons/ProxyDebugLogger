function getFunctionHandler(propKey, prefix) {
  const realPrefix = (prefix!==null) ? `${prefix} ` : "";
  return {
    apply(target, thisArg, argumentsList) {
      const result = target.apply(thisArg, argumentsList);
      console.log(
        `${realPrefix}${propKey}${ JSON.stringify(argumentsList)} -> ${JSON.stringify(result)}`
      );
      return result;
    }
  };
};

function getProxyFunction(propKey, original, prefix) {
  const handler = getFunctionHandler(propKey, prefix);
  return new Proxy(original, handler);
}

function getHandler(prefix) {
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
      const newFunction = getProxyFunction(propKey, originalValue, prefix);
      cache[propKey] = newFunction;
      return newFunction;
    }
  };
}

function traceMethodCalls(obj, prefix=null) {
  const handler = getHandler(prefix);
  return new Proxy(obj, handler);
}

export {
  traceMethodCalls
};