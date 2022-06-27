<template>
    <div class="login_card">
        <!-- 登录 -->
        <el-card class="box-card">
            <!-- 名称 -->
            <NameText></NameText>
            <!-- 表单 -->
            <el-row>
                <el-col :span="24">
                    <!-- 表单数据 -->
                    <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                        <!-- 手机号 -->
                        <el-form-item prop="Tel">
                            <el-input v-model="form.Tel" prefix-icon="al-shouji" :size="form.size" :placeholder="form.placeholder.Tel" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 登陆密码 -->
                        <el-form-item prop="PassWord">
                            <el-input type="password" v-model="form.PassWord" prefix-icon="al-suo" :size="form.size" :placeholder="form.placeholder.PassWord" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 登录 -->
                        <el-form-item>
                            <BigButton :btnItem="btnItem" @click-btn="login('ruleForm')"></BigButton>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <!-- 立即注册 -->
            <el-row type="flex" justify="space-between">
                <el-col :span="4.5">
                    <span class="text pwdColor" @click="toPassword">忘记密码</span>
                </el-col>
                <el-col :span="4.5">
                    <span class="text textColor" @click="toRegiert">立即注册</span>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import NameText from '../Text/NameText.vue';
import BigButton from '../Button/BigButton.vue';
import { checkTel, checkPassword } from '../../utils/rules.js';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { checkRSA } from '../../utils/rsa.js';
export default {
    name: 'login_card',
    data () {
        //校验手机号
        const validateTel = (rule, value, callback) => {
            checkTel(rule, value, callback, '请输入手机号');
        };
        //校验密码
        const validatePassword = (rule, value, callback) => {
            checkPassword(rule, value, callback);
        };
        return {
            form: {
                Tel: '',
                PassWord: '',
                size: 'medium',
                placeholder: {
                    Tel: '请输入您的手机号',
                    PassWord: '请输入登录密码'
                }
            },
            rules: {
                //校验手机号
                Tel: [
                    { validator: validateTel }
                ],
                //校验密码
                PassWord: [
                    { validator: validatePassword }
                ]
            },
            btnItem: {
                Text: '登录'
            }
        }
    },
    components: { BigButton, NameText },
    methods: {
        //登录
        login (formName) {
            this.$refs[formName].validate( async (valid) => {
                //进行校验
                if (valid) {
                    //调用登录接口
                    let data = { account: this.form.Tel, password: this.form.PassWord };
                    let dataParams = {
                        data: checkRSA(data)
                    }
                    let loginRes = await this.$api.loginInterface(dataParams);
                    if (loginRes.code == 0) {
                        //获取token
                        let token = loginRes.data;
                        //将token存储到sessionStorage中
                        sessionStorage.setItem('token', token);
                        MessageInterface('登录成功', 'success', 5000);
                        //跳转选择服务页
                        this.$router.push({ path: '/service' });
                    } else {
                        MessageInterface(`${loginRes.msg}`, 'error', 5000);
                    };
                } else {
                    return false;
                };
            });
        },
        //跳转重置密码
        toPassword () {
            this.$router.push({
                path: '/password'
            });
        },
        //跳转注册页面
        toRegiert () {
            this.$router.push({
                path: '/register'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.box-card {
    border-radius: 8px;
};

.text {
    font-size: $fontSizeExtra;
    cursor: $cursor;
    font-weight: 400;
};

.pwdColor {
    color: #666666;
};

.textColor {
    color: $mainColor;
};

.el-card {
    @include elCard(10%, 8%, 20%, 8%);
};
</style>


