
function plugFakeConsole() {
  const { console: originalConsole } = global;
  const console = new FakeConsole();
  global.console = console;
  const dispose = () => {
    global.console = originalConsole;
  }
  return {
    console,
    dispose
  };
}

class FakeConsole {
  constructor() {
    this.log = function () {
      this.logs.push([...arguments])
    };
    this.logs = [];
  }

  get lastLog() {
    const length = this.logs.length;
    return (length === 0) ? null : this.logs[length - 1];
  }
}

export {
  plugFakeConsole
};