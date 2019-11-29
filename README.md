# ProxyLogger

Factory to create proxy that log any method call. For debug purpose.

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