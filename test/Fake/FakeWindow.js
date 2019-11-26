
function plugFakeWindow() {
    const window = new FakeWindow();
    global.window = window;
    return window;
}

class FakeWindow {
    constructor() {
        this.console = {
            log: (...args) => { this.logs.push([...args]) }
        };
        this.logs = [];
    }

    get lastLog() {
        const length = this.logs.length;
        return (length === 0) ? null : this.logs[length -1];
    }
}

export {
    plugFakeWindow
};