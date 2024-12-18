// 任务状态枚举
const TaskStatus = {
    INCOMPLETE: 0, // 未完成
    PENDING_TEST: 1, // 待测试
    COMPLETED: 2 // 已完成
};

// 任务类
class Task {
  constructor(id, status, lastOperatedTime, descriptions = []) {
    this.id = id; // 唯一编号
    this.status = status; // 任务状态枚举值
    this.lastOperatedTime = lastOperatedTime; // 上一次操作时间（排序用）
    this.descriptions = descriptions; // 任务描述信息数组
  }
}

// 任务清单类
class TaskList {
  constructor(groupId, listId, tasks = []) {
    this.groupId = groupId; // 群组id
    this.listId = listId; // 任务清单唯一编号
    this.tasks = tasks; // 任务类实例数组
  }

  // 添加任务
  addTask(task) {
    this.tasks.push(task);
  }

  // 根据某个条件排序任务（例如：按上一次操作时间排序）
  sortTasksByLastOperatedTime() {
    this.tasks.sort((a, b) => new Date(a.lastOperatedTime) - new Date(b.lastOperatedTime));
  }
}

// 示例使用
// const task1 = new Task(1, TaskStatus.INCOMPLETE, new Date('2023-10-01T10:00:00'), ['描述1', '描述2']);
// const task2 = new Task(2, TaskStatus.PENDING_TEST, new Date('2023-10-02T12:00:00'), ['描述3']);

// const taskList = new TaskList('group1', 'list1');
// taskList.addTask(task1);
// taskList.addTask(task2);

// taskList.sortTasksByLastOperatedTime();

// console.log(taskList);

module.exports = {
  TaskList,
}