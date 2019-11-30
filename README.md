# ProxyDebugLogger

[![npm version](https://img.shields.io/npm/v/proxy-debug-logger.svg)](https://www.npmjs.com/package/proxy-debug-logger)
[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FDavid-Desmaisons%2FProxyDebugLogger%2Fbadge&label=build&logo=none)](https://actions-badge.atrox.dev/David-Desmaisons/ProxyDebugLogger/goto)
[![Coverage](https://codecov.io/gh/David-Desmaisons/ProxyDebugLogger/branch/master/graph/badge.svg)](https://codecov.io/gh/David-Desmaisons/ProxyDebugLogger)
[![MIT License](https://img.shields.io/github/license/David-Desmaisons/ProxyDebugLogger.svg)](https://github.com/David-Desmaisons/ProxyDebugLogger/blob/master/LICENSE)

Factory to create proxy that log any method call. For debug.

## Install
```
npm install proxy-debug-logger
```

## Usage

```javascript
import { traceMethodCalls } from 'proxy-debug-logger';

const originalObject ={
  doSomething(){},

  compute(value){
    return value * 2;
  }
}

const wrapped = traceMethodCalls(originalObject, "object-1");

wrapped.doSomething("with this");
wrapped.compute(13);
```

## Log result

```

object-1 doSomething["with this"] -> undefined
object-1 compute[13] -> 26

```