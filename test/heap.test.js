const Heap = require("../lib/heap");

describe("Heap", function() {
  describe("insert()", function() {
    it("insert one data", () => {
      let heap = new Heap();
      heap.insert({
        date: new Date()
      });
      // list[0] 是空位置
      expect(heap.list[0]).toBeUndefined();
      expect(heap.count).toBe(2);
    });
    it("insert two data", () => {
      let heap = new Heap();
      heap.insert({
        date: new Date()
      });

      //1567152912000
      heap.insert({
        date: new Date("2019-08-30 16:15:12")
      });
      // list[0] 是空位置
      expect(heap.list[0]).toBeUndefined();
      expect(heap.count).toBe(3);
      expect(heap.list[2].date.getTime()).toBe(1567152912000);
    });

    it("insert three data", () => {
      let heap = new Heap();

      //1567152912000
      heap.insert({
        date: new Date("2019-08-30 16:15:12")
      });

      //1565856912000
      heap.insert({
        date: new Date("2019-08-15 16:15:12")
      });
      // list[0] 是空位置
      expect(heap.list[0]).toBeUndefined();
      expect(heap.count).toBe(3);
      expect(heap.list[1].date.getTime()).toBe(1565856912000);
      expect(heap.list[2].date.getTime()).toBe(1567152912000);
    });
  });

  describe("removeMin()", () => {
    it("if empty list return null", () => {
      let heap = new Heap();
      expect(heap.removeMin()).toBeNull();
    });

    it("if one length list retrun first node", () => {
      let heap = new Heap();
      //1567152912000
      heap.insert({
        date: new Date("2019-08-30 16:15:12")
      });

      let data = heap.removeMin();
      expect(data.date.getTime()).toBe(1567152912000);
      expect(heap.count).toBe(1);
    });

    it("return min data in the list", () => {
      let heap = new Heap();

      //1567152912000
      heap.insert({
        date: new Date("2019-08-30 16:15:12")
      });

      //1565856912000
      heap.insert({
        date: new Date("2019-08-15 16:15:12")
      });

      heap.insert({
        date: new Date("2019-09-30 16:15:12")
      });

      let minData = heap.removeMin();
      expect(minData.date.getTime()).toBe(1565856912000);

      minData = heap.removeMin();
      expect(minData.date.getTime()).toBe(1567152912000);
    });
  });
});
