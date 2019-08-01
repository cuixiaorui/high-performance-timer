const Heap = require("./heap.js");
const { comparisonHandler, getTimeoutHandler } = require("./handler");
module.exports = class Timer {
  constructor(opts = {}) {
    this._opts = opts;

    let ch = this._opts.comparisonHandler
      ? this._opts.comparisonHandler
      : comparisonHandler;

    this._getTimeoutHandler = this._opts.getTimeoutHandler
      ? this._opts.getTimeoutHandler
      : getTimeoutHandler;

    this._heap = new Heap(ch);
    this._timeoutId = null;
    // 未执行的任务 key
    this._taskMap = Object.create(null);
  }

  _reset() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  _createTimer() {
    this._reset();
    const timeout = this._getTimeoutHandler(this._heap.peep());
    if (timeout < 0) return;
    this._timeoutId = setTimeout(this._executeHandler, timeout);
  }

  _executeHandler() {
    let currentHandleData = this._heap.removeMin();
    this._removeTaskMap(currentHandleData.key);
    currentHandleData && currentHandleData.cb && currentHandleData.cb();
    if (!this._heap.empty()) {
      this._createTimer();
    }
  }

  _removeTaskMap(key) {
    if (this._taskMap[key]) {
      delete this._taskMap[key];
    }
  }

  _getIndexByKey(key) {
    const list = this._heap.getList();
    return list.findIndex(task => {
      if (task) return task.key === key;
    });
  }

  set(key, opts) {
    if (this._taskMap[key]) {
      console.log(`当前 key 已存在：${key}`);
      return;
    }
    this._taskMap[key] = true;
    this._heap.insert(new Task(key, opts));
    this._createTimer();
  }

  delete(key) {
    if (!this._taskMap[key]) {
      console.log(`不存在的 key :${key}`);
      return;
    }
    let index = this._getIndexByKey(key);
    this._heap.removeByIndex(index);
  }

  clear() {
    this._taskMap = Object.create(null);
    this._reset();
    this._heap.reset();
  }
};

class Task {
  constructor(key, opts) {
    this.key = key;
    Object.keys(opts).forEach(key => {
      this[key] = opts[key];
    });
  }
}
