const BotLogicBase = require('../botLogic').BotLogicBase;
const path = require('path');
const {TaskList, TaskStatus} = require(path.join(__dirname, 'taskList'));
const os = require('os');

class TaskListLogic extends BotLogicBase {
    constructor(sPath, tCallBack) {
        super(sPath, tCallBack);

        this.m_tTaskList = {};
        this.m_tOperate = {};
    }

    _onMessage(message) {
        // 屏蔽个人消息
        if (message.groupId) {
            let sContent = message.content;
            let bOrder = false;
            for (const sOrder in this.oConfig.orderMap) {
                let sMark = this.oConfig.symbol + sOrder;
                if (sContent.includes(sMark)) {
                    let sFunc = this.oConfig.orderMap[sOrder].order;
                    this[sFunc](message, sContent.replace(sMark, '').trim());
                    bOrder = true;
                }
            }

            if (!bOrder) {
                this._onCreate(message);
            }
        }
    }

    _onMessageUpdate(message) {
        
    }

    _getDataKey(message) {
        return String(message.groupId) + '_' + String(message.converseId);
    }

    _getDataName(message) {
        return this._getDataKey(message) + '.json';
    }

    _getOperateKey(message) {
        return this._getDataKey(message) + '_' + String(message.author);
    }

    _hasTaskList(message) {
        if (this.m_tTaskList[this._getDataKey(message)] || jsonData.hasData('taskList', this._getDataName(message))) {
            return true;
        }
    }

    _getTaskList(message) {
        const sKey = this._getDataKey(message);
        let oTaskList = this.m_tTaskList[sKey];
        if(oTaskList){
            return oTaskList;
        }
        
        if (!oTaskList) {
            const oData = jsonData.getData('taskList', this._getDataName(message));
            if (oData) {
                oTaskList = TaskList.fromJSON(oData);
            }
            else {
                oTaskList = new TaskList(sKey);
            }
            this.m_tTaskList[sKey] = oTaskList;
        }
        return oTaskList;
    }

    _countStr(tCount) {
        // 统计未完成、待测试、已完成文本
        return '未完成【'+String(tCount[TaskStatus.UNFINISHED])+'】、待测试【'+String(tCount[TaskStatus.TOTEST])+'】、已完成【'+String(tCount[TaskStatus.COMPLETED])+'】';
    }

    _saveData(oTaskList) {
        jsonData.saveData('taskList', oTaskList.sKey + '.json', oTaskList.toJSON())
    }

    open(message) {
        let sOutPut = '';
        if (this._hasTaskList(message)) {
            sOutPut = this.oConfig.reply.openFail + os.EOL;
            const oTaskList = this._getTaskList(message);
            const tCount = oTaskList.count();
            sOutPut = sOutPut + this._countStr(tCount);
        }
        else {
            sOutPut = this.oConfig.reply.openSuccess;
            const oTaskList = this._getTaskList(message);
            this._saveData(oTaskList);
        }
        this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
    }

    close(message) {
        let sOutPut = '';
        if (jsonData.hasData('taskList', this._getDataName(message))) {
            const oTaskList = this._getTaskList(message);
            const tCount = oTaskList.count();
            sOutPut = sOutPut + this._countStr(tCount);
            if (tCount[TaskStatus.UNFINISHED] > 0 || tCount[TaskStatus.TOTEST] > 0) {
                sOutPut = sOutPut + os.EOL + this.oConfig.reply.closeFail;
            }
            else {
                sOutPut = sOutPut + os.EOL + this.oConfig.reply.closeSuccess;
                delete this.m_tTaskList[this._getDataKey(message)];
                jsonData.removeData('taskList', this._getDataName(message));
            }
        }
        else {
            sOutPut = this.oConfig.reply.closeNotFound;
        }
        this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
    }

    create(message, sContent) {
        const sOperateKey = this._getOperateKey(message);
        if (!this._hasTaskList(message)) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return;
        }
        if (this.m_tOperate[sOperateKey]) {
            let sOutPut = this.oConfig.reply.createFail;
            this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
            return;
        }
        this.m_tOperate[sOperateKey] = [];
        if (sContent.length > 0) {
            this.m_tOperate[sOperateKey].push(sContent);
        }
    }

    _onCreate(message) {
        const sOperateKey = this._getOperateKey(message);
        const sContent = message.content;
        if (this.m_tOperate[sOperateKey]) {
            if (sContent.length > 0) {
                this.m_tOperate[sOperateKey].push(sContent);
            }
        }
    }

    finish(message, sContent) {
        const sOperateKey = this._getOperateKey(message);
        if (this.m_tOperate[sOperateKey]) {
            if (sContent.length > 0) {
                this.m_tOperate[sOperateKey].push(sContent);
            }
            const oTaskList = this._getTaskList(message);
            oTaskList.addTask(this.m_tOperate[sOperateKey]);
            this._saveData(oTaskList);
            delete this.m_tOperate[sOperateKey];
            let sOutPut = this.oConfig.reply.createSuccess + os.EOL;
            const tCount = oTaskList.count();
            sOutPut = sOutPut + this._countStr(tCount);
            this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
        }
        else {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
        }
    }

    cancel(message) {
        const sOperateKey = this._getOperateKey(message);
        if (this.m_tOperate[sOperateKey]) {
            delete this.m_tOperate[sOperateKey];
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.cancelSuccess);
        }
        else {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
        }
    }

    show(message) {
        if (!this._hasTaskList(message)) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return;
        }
        let sOutPut = '';
        const oTaskList = this._getTaskList(message);
        const tTask = oTaskList.getAllTask();
        sOutPut = sOutPut + '[md]----[/md]';
        sOutPut = sOutPut + '[md]### 未完成【'+ tTask[TaskStatus.UNFINISHED].length + '】[/md]';
        for (const oTask of tTask[TaskStatus.UNFINISHED]) {
            sOutPut = sOutPut + String(oTask.id) + ':' + os.EOL;
            for (const sDesc of oTask.descriptions) {
                sOutPut = sOutPut + sDesc;
            }
            sOutPut = sOutPut + os.EOL;
        }
        sOutPut = sOutPut + '[md]### 待测试【'+ tTask[TaskStatus.TOTEST].length + '】[/md]';
        for (const oTask of tTask[TaskStatus.TOTEST]) {
            sOutPut = sOutPut + String(oTask.id) + ':' + os.EOL;
            for (const sDesc of oTask.descriptions) {
                sOutPut = sOutPut + sDesc;
            }
            sOutPut = sOutPut + '[md]----[/md]';
        }
        sOutPut = sOutPut + '[md]### 已完成【'+ tTask[TaskStatus.COMPLETED].length + '】[/md]';
        for (const oTask of tTask[TaskStatus.COMPLETED]) {
            sOutPut = sOutPut + String(oTask.id) + ':' + os.EOL;
            for (const sDesc of oTask.descriptions) {
                sOutPut = sOutPut + sDesc;
            }
            sOutPut = sOutPut;
            sOutPut = sOutPut + '[md]----[/md]';
        }
        this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
    }

    toTest(message, sContent) {
        const regex = /=(\d+)/; // 匹配等号后面跟一个或多个数字
        const match = sContent.match(regex);
        const tMatch = match ? match : null; // match 将是捕获的第一个数字组
        if (!tMatch) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return
        }
        const iId = tMatch[1];
        const oTaskList = this._getTaskList(message);
        if (!oTaskList) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return
        }
        if (oTaskList.toTest(iId)) {
            this._saveData(oTaskList);

            let sOutPut = this.oConfig.reply.toTestSuccess + String(iId) + os.EOL;
            const tCount = oTaskList.count();
            sOutPut = sOutPut + this._countStr(tCount);
            this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
        }
        else {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.numIllegal + String(iId));
        }
    }

    complete(message, sContent) {
        const regex = /=(\d+)/; // 匹配等号后面跟一个或多个数字
        const match = sContent.match(regex);
        const tMatch = match ? match : null; // match 将是捕获的第一个数字组
        if (!tMatch) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return
        }
        const iId = tMatch[1];
        const oTaskList = this._getTaskList(message);
        if (!oTaskList) {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.play);
            return
        }
        if (oTaskList.complete(iId)) {
            this._saveData(oTaskList);
            
            let sOutPut = this.oConfig.reply.completeSucess + String(iId) + os.EOL;
            const tCount = oTaskList.count();
            sOutPut = sOutPut + this._countStr(tCount);
            this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
        }
        else {
            this.tCallBack.sendMessage(message.converseId, message.groupId, this.oConfig.reply.numIllegal + String(iId));
        }
    }

    help(message) {
        let sOutPut = this.oConfig.reply.help + os.EOL;
        for (const sOrder in this.oConfig.orderMap) {
            let sMark = this.oConfig.symbol + (this.oConfig.orderMap[sOrder].example ?? sOrder);
            sOutPut = sOutPut + sMark + os.EOL;
        }
        this.tCallBack.sendMessage(message.converseId, message.groupId, sOutPut);
    }
}

module.exports = {
    BotLogic : TaskListLogic,
}