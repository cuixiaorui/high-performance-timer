const Timer = require("../lib/index");
let timer = new Timer();
timer.set("1", {
  // 日期必须是未来的
  date: new Date("2019-08-01 15:45:00"),
  cb() {
    console.log("date:1");
    // clear '2' task
    // timer.delete("2");
    // clear all task
    // timer.clear();
  }
});

timer.set("2", {
  // 日期必须是未来的
  date: new Date("2019-08-01 15:45:30"),
  cb() {
    console.log("date:2");
  }
});
timer.set("3", {
  // 日期必须是未来的
  date: new Date("2019-08-01 15:46:00"),
  cb() {
    console.log("date:3");
  }
});

// 自定义处理规则
let timer2 = new Timer({
  // 排序规则 ->  priority 小的先执行
  comparisonHandler(dataA, dataB) {
    return dataA.priority < dataB.priority;
  },
  // 获取timeout 的时间 data 为要执行的数据
  getTimeoutHandler(data) {
    return data.timeout;
  }
});

timer2.set("1", {
  timeout: 3000,
  priority: 1,
  cb() {
    console.log("1");
  }
});
timer2.set("2", {
  timeout: 3000,
  priority: 2,
  cb() {
    console.log("2");
  }
});
timer2.set("3", {
  timeout: 3000,
  priority: 3,
  cb() {
    console.log("3");
  }
});
