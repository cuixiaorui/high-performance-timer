// 默认处理小顶堆如何判断大小的规则
exports.comparisonHandler = function(dataA, dataB) {
  return dataA.date.getTime() < dataB.date.getTime();
};

// 默认获取 timeout 的规则
exports.getTimeoutHandler = function(data) {
  return data.date.getTime() - new Date().getTime();
};
