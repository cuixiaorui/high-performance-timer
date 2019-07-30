const Timer = require("../lib/index");
let timer = new Timer();
timer.set("1", {
  // 日期必须是未来的
  date: new Date("2019-07-30 19:15:00"),
  cb() {
    console.log("1");
    timer.delete("2");
  }
});

timer.set("2", {
  // 日期必须是未来的
  date: new Date("2019-07-30 19:16:00"),
  cb() {
    console.log("2");
  }
});
timer.set("3", {
  // 日期必须是未来的
  date: new Date("2019-07-30 19:16:30"),
  cb() {
    console.log("3");
  }
});
