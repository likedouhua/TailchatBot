const BotLogicBase = require('../botLogic').BotLogicBase;
const path = require('path');
const TaskList = require(path.join(__dirname, 'taskList'));

class TaskListLogic extends BotLogicBase {
    constructor(sPath, tCallBack) {
        super(sPath, tCallBack);

        console.log('TaskListLogic init:', this.oConfig);
    }

    _onMessage(message) {
        let sContent = message.content;
        for (const sOrder in this.oConfig.orderMap) {
            if (sContent.includes(this.oConfig.symbol + sOrder)) {
                let sFunc = this.oConfig.orderMap[sFunc];
                this[sFunc]();
            }
        }
    }

    _onMessageUpdate(message) {
        
    }

    open() {

    }

    close() {

    }

    create() {

    }

    finish() {

    }

    cancel() {

    }

    show() {

    }

    toTest() {

    }

    complete() {

    }

    help() {
        
    }
}

module.exports = {
    BotLogic : TaskListLogic,
}