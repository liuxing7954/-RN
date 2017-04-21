/**
 * Created by user on 2016/11/10.
 */
class ShuXue {
    // 构造
    constructor() {
        this.num1 = null;
        this.num2 = null;
        this.res = null;
        this.operator = null;
    }

    getNum1() {
        return this.num1;
    }

    getNum2() {
        return this.num2;
    }

    getRes() {
        return this.res;
    }

    getQuestionOfString() {
        this.notNullCheck();
        return this.num1 + ' ' + this.operator + ' ' + this.num2 + ' =';
    }

    getResult(res) {
        this.notNullCheck();
        // return true;
        return this.res == res;
    }

    refresh(operator) {
        //1-100之间
        let num1 = parseInt(Math.random() * 100) + 1;
        let num2 = parseInt(Math.random() * 100) + 1;
        let res = parseInt(Math.random() * 100) + 1;
        switch (operator) {
            case '+':
                res = num1 + num2;
                break;
            case '-':
                num1 = res + num2;
                break;
            case '*':
                res = num1 * num2;
                break;
            case '/':
                num2 = parseInt(Math.random() * 10) + 1;
                res = parseInt(Math.random() * 10) + 1;
                num1 = res * num2;
                break;
            default:
                break;
        }
        this.num1 = num1;
        this.num2 = num2;
        this.res = res;
        this.operator = operator;
    }

    notNullCheck() {
        if (this.num1 == null || this.num2 == null || this.res == null || this.operator == null) {
            console.error('首先调用refresh方法');
            return false;
        }
        return true;
    }

}

export default new ShuXue();