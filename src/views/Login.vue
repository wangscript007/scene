<template>
    <div class="login" :style="{'backgroundImage': 'url(' + img + ')'}">
        <div class="box">
            <h2 class="title">摩云劳务现场端</h2>
            <el-tabs v-model="activeName" @tab-click="tabClick" style="margin-top: 15px">
                <el-tab-pane label="登录" name="1"/>
                <!-- <el-tab-pane label="验证码登录" name="2"/> -->
            </el-tabs>
            <el-input placeholder="请输入项目ID" prefix-icon="el-icon-user-solid" v-model="appid" style="margin-top: 20px"/>
            <el-input placeholder="请输入项目密匙" prefix-icon="el-icon-s-goods" v-model="secret" style="margin-top: 20px">
            </el-input>
            <!-- <el-input placeholder="请输入密码" prefix-icon="el-icon-s-goods" v-model="pwd" style="margin-top: 20px" type="password" v-if="activeName == 1"/> -->
            <button class="login-btn" @click="login">立即登录</button>
        </div>
    </div>
</template>

<script>
import { login } from '../api/login'
    export default {
        data() {
            return {
                img: require('../assets/images/login.jpg'),                 // 背景图片
                pwd: '',                                                    // 密码                        
                appid: this.$store.state.cs_admin_appId,                    // 项目id
                secret: this.$store.state.cs_admin_secret,                  // 项目密匙
                activeName: '1',       //登录方式，1：账号密码，2：手机号
                timer: 60,                                                  // 时间
                verification: false,      //是否开始倒计时
                auth_timer: ''                                              // 清楚定时器
            }
        },
        methods: {
            // tab切换
            tabClick() {
                // 重置
                this.appid =  ''
                this.secret = ''
                this.timer = 60
                this.verification = false
            },
            // 发送验证码，开始倒计时
            startLow() {
                if(!this.mobile) {
                    this.$msg.Warning('请输入手机号')
                    return false
                }
                this.$msg.Success('发送成功')
                clearInterval(this.auth_timer)
                this.verification = true
                this.auth_timer = setInterval(()=>{  //定时器设置每秒递减
                    this.timer--;        //递减时间
                    if(this.timer<=0){  
                        this.verification = false;    //60s时间结束还原v-show状态并清除定时器
                        clearInterval(this.auth_timer)
                    }
                },1000)
            },
            // 登录
            login() {
                this.$http(login, {
                    appid: this.appid,
                    secret: this.secret
                }).then(res => {
                    console.log(res)
                    if(res.data.code === 200) {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        })
                        this.$store.commit('changeToken', res.data.data.token)
                        this.$store.commit('changeCompanyName', res.data.data.name)
                        this.$store.commit('changeAppId', this.appid)
                        this.$store.commit('changeSecret', this.secret)
                        this.$router.push('/')
                        setTimeout(_ => window.location.reload(), 200)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .box {
            width: 433px;
            min-height: 350px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, .35);
            padding: 30px;
            border-radius: 10px;
            .title {
                color: #fff;
                font-size: 38px;
                text-align: center;
                letter-spacing: 5px;
                span {
                    font-size: 22px;
                }
            }
            /deep/ .el-input {
                background-color: transparent;
            }
            /deep/ .el-input__inner {
                border-radius: 25px;
                background-color: rgba(181,187,204, .1);
                height: 50px;
                font-weight: 600;
                color: #fff;
                font-size: 18px;
                padding-left: 48px;
                letter-spacing: 1px;
                border-color: transparent;
                &:focus {
                    border-color: rgb(202, 205, 211);
                }
            }
            /deep/ .el-input__icon {
                line-height: 48px;
                margin-left: 10px;
                font-size: 18px;
                color: #fff;
            }
            .login-btn {
                background-color: $color_blue;
                display: block;
                width: 100%;
                height: 50px;
                margin-top: 44px;
                border: none;
                border-radius: 25px;
                font-size: 18px;
                color: #fff;
                font-weight: 600;
                cursor: pointer;
                &:active {
                    background-color: $active_color_blue;
                }
            }
        }
    }
    /deep/ .el-tabs__nav {
        width: 100%;
        display: flex;
        .el-tabs__item {
            flex: 1;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
    }
    /deep/ .el-tabs__item.is-active {
        color: $color_blue;
    }
    /deep/ .el-tabs__active-bar {
        background-color: $color_blue;
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 0;
    }
    .login-type {
        text-align: right;
        color: $color_blue;
        text-decoration: underline;
        font-size: 14px;
        cursor: pointer;
    }
    .service {
        text-align: center;
        font-size: 16px;
        margin-top: 30px;
        color: #fff;
        font-weight: bold;
        span {
            color: $color_blue;
            text-decoration: underline;
            letter-spacing: 1px;
            cursor: pointer;
        }
    }
</style>
