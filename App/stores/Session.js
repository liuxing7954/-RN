/**
 * Created by user on 2016/11/10.
 */
class Session {
    // 构造
    constructor() {
        this.id = 4;
        this.username = '帅哥季';
        this.password = '123123';
        this.account = 'admin';
        this.birthdate = '2017-04-22 20:52:55';
        this.hobby = 'LOL';
        this.introduce = '帅的一匹';
        this.headport = 'http://m.vstou.com/img/201512/ssz3_1.jpg';

        this.poetry = 0;
        this.thing = 0;
        this.math = 0;
    }

    init() {
        this.poetry = 0;
        this.thing = 0;
        this.math = 0;
    }

    getpoetry() {
        return this.poetry;
    }

    getthing() {
        return this.thing;
    }

    getmath() {
        return this.math;
    }


    uppoetry() {
        this.poetry += 1;
    }

    upthing() {
        this.thing += 1;
    }

    upmath() {
        this.math += 1;
    }

    setId = (obj) => {
        this.id = obj;
    };
    setUsername = (obj) => {
        this.username = obj;
    };
    setPassword = (obj) => {
        this.password = obj;
    };
    setAccount = (obj) => {
        this.account = obj;
    };
    setBirthdate = (obj) => {
        this.birthdate = obj;
    };
    setHobby = (obj) => {
        this.hobby = obj;
    };
    setIntroduce = (obj) => {
        this.introduce = obj;
    };
    setHeadport = (obj) => {
        this.headport = obj;
    };

    getId = () => {
        return this.id;
    };
    getUsername = () => {
        return this.username;
    };
    getPassword = () => {
        return this.password;
    };
    getAccount = () => {
        return this.account;
    };
    getBirthdate = () => {
        return this.birthdate;
    };
    getHobby = () => {
        return this.hobby;
    };
    getIntroduce = () => {
        return this.introduce;
    };
    getHeadport = () => {
        return this.headport;
    };

    destory() {
        this.id = null;
        this.username = null;
        this.password = null;
        this.account = null;
        this.birthdate = null;
        this.hobby = null;
        this.introduce = null;
        this.headport = null;
    }
}

export default new Session();