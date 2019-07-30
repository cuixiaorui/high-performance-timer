//小顶堆
module.exports = class Heap {
  constructor() {
    this.reset();
  }

  /**
   * 插入
   */
  insert(data) {
    this.list[this.count] = data;
    let newIndex = this.count;
    this.count++;
    let parentIndex = newIndex >> 1;

    // TODO date.getTime() 应该可以由用户定义
    while (
      parentIndex > 0 &&
      this.list[newIndex].date.getTime() < this.list[parentIndex].date.getTime()
    ) {
      // 交换位置
      let temp = this.list[parentIndex];
      this.list[parentIndex] = this.list[newIndex];
      this.list[newIndex] = temp;
      newIndex = parentIndex;
      parentIndex = newIndex >> 1;
    }
  }

  /**
   * 删除堆顶最小元素
   * 因为是小顶堆，所有堆顶元素为最小元素
   */
  removeMin() {
    return this.removeByIndex(1);
  }

  /**
   * 基于 index 删除元素
   * @param {} i
   */
  removeByIndex(i) {
    if (!this.list[i]) return null;
    let removeData = this.list[i];
    this.count--;
    // 删除的是最后一个元素的话，只需要弹出 list 即可
    if (this.count === i) {
      this.list.pop();
    } else {
      this.list[i] = this.list.pop();
      this.heapify(i);
    }
    return removeData;
  }

  /**
   * 堆化
   * @param {} i
   */
  heapify(i) {
    while (true) {
      let minIndex = i;
      if (
        i * 2 < this.count &&
        this.list[i * 2].date.getTime() < this.list[i].date.getTime()
      ) {
        minIndex = i * 2;
      }

      if (
        minIndex + 1 < this.count &&
        this.list[minIndex + 1].date.getTime() <
          this.list[minIndex].date.getTime()
      ) {
        minIndex = minIndex + 1;
      }

      if (i === minIndex) break;

      // 交换位置
      let temp = this.list[i];
      this.list[i] = this.list[minIndex];
      this.list[minIndex] = temp;
      // 更新指针
      i = minIndex;
    }
  }

  peep() {
    return this.list[1];
  }

  empty() {
    return this.count === 1 && !this.list[1];
  }

  getList() {
    return this.list;
  }

  reset() {
    this.list = [];
    this.count = 1;
  }
};
