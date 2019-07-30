const Heap = require("./heap.js");
module.exports = class Timer {
  constructor() {
    this._heap = new Heap();
    this._timeoutId = null;
    // 未执行的任务 key
    this._takeMap = Object.create(null);
  }

  _reset() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }
  _getTimestampByFirstData() {
    let firstData = this._heap.peep();
    if (!firstData) return 0;
    return firstData.date.getTime();
  }

  _createTimer() {
    this._reset();
    const expirationTime = this._getTimestampByFirstData();
    const timeout = expirationTime - new Date().getTime();
    if (timeout < 0) return;
    this._timeoutId = setTimeout(() => {
      let currentHandleData = this._heap.removeMin();
      this.removeTaskMap(currentHandleData.key);
      currentHandleData && currentHandleData.cb && currentHandleData.cb();
      if (!this._heap.empty()) {
        this._createTimer();
      }
    }, timeout);
  }

  removeTaskMap(key) {
    if (this._taskMap[key]) {
      delete this._taskMap[key];
    }
  }

  set(key, opts) {
    if (this._taskMap[key]) {
      console.log(`key 已经设置过了：${key}`);
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

  _getIndexByKey(key) {
    const list = this._heap.getList();
    return list.findIndex(task => {
      if (task) return task.key === key;
    });
  }

  clear() {
    this._takeMap = Object.create(null);
    this._reset();
    this._heap.reset();
  }
};

class Task {
  constructor(key, opts) {
    this.key = key;
    this.date = opts.date;
    this.cb = opts.cb;
  }
}
