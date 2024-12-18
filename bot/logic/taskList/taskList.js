// 任务状态枚举
const TaskStatus = {
  UNFINISHED: 0, // 未完成
  TOTEST: 1,     // 待测试
  COMPLETED: 2   // 已完成
};

// 任务类
class Task {
  constructor(id, status, lastOperatedTime = 0, descriptions = []) {
    this.id = id;
    this.status = status;
    this.lastOperatedTime = lastOperatedTime;
    this.descriptions = descriptions;
  }

  updateTime() {
    this.lastOperatedTime = new Date().getTime();
  }

  // 将任务实例转换为纯对象
  toJSON() {
    return {
      id: this.id,
      status: this.status,
      lastOperatedTime: this.lastOperatedTime,
      descriptions: this.descriptions
    };
  }
}

// 任务清单类
class TaskList {
  constructor(sKey, lTask = []) {
    this.sKey = sKey;
    this.lTask = lTask;
  }

  // 添加任务
  addTask(lDesc) {
    const oTask = new Task(this.lTask.length + 1, TaskStatus.UNFINISHED, 0, lDesc);
    oTask.updateTime();
    this.lTask.push(oTask);
  }

  toTest(iId) {
    for (const oTask of this.lTask) {
      if (oTask.id == iId) {
        oTask.status = TaskStatus.TOTEST;
        oTask.updateTime();
        return true;
      }
    }
    return false;
  }

  complete(iId) {
    for (const oTask of this.lTask) {
      if (oTask.id == iId) {
        oTask.status = TaskStatus.COMPLETED;
        oTask.updateTime();
        return true;
      }
    }
    return false;
  }

  // 将任务清单实例转换为纯对象
  toJSON() {
    return {
      sKey : this.sKey,
      lTask: this.lTask.map(task => task.toJSON())
    };
  }

  // 从纯对象中恢复任务清单实例
  static fromJSON(json) {
    const lTask = json.lTask.map(taskJson => {
      const task = new Task(taskJson.id, taskJson.status, taskJson.lastOperatedTime, taskJson.descriptions);
      return task;
    });
    return new TaskList(json.skey, lTask);
  }

  // 计算任务数量
  count() {
    let tCount = {
      [TaskStatus.UNFINISHED] : 0,
      [TaskStatus.TOTEST] : 0,
      [TaskStatus.COMPLETED] : 0,
    }
    for (const oTask of this.lTask) {
      tCount[oTask.status]++;
    }
    return tCount;
  }

  getAllTask() {
    let tTask = {
      [TaskStatus.UNFINISHED] : [],
      [TaskStatus.TOTEST] : [],
      [TaskStatus.COMPLETED] : [],
    }
    for (const oTask of this.lTask) {
      tTask[oTask.status].push(oTask);
    }
    for (const eTaskStatus in tTask) {
      if (Object.prototype.hasOwnProperty.call(tTask, eTaskStatus)) {
        const lTask = tTask[eTaskStatus];
        lTask.sort((oTask1, oTask2) => oTask1.lastOperatedTime - oTask2.lastOperatedTime);
      }
    }
    return tTask;
  }
}

module.exports = {
  TaskStatus,
  TaskList,
}