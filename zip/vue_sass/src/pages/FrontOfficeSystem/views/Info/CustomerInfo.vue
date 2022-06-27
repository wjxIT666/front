<template>
    <div class="customer_info">
        <!-- 入驻页面 -->
       <el-container>
            <el-header height="56px">
                <Header :headerItem="customerInfoItem" :showDialog="showDialog"></Header>
            </el-header>
            <el-main>
                <div class="main">
                    <!-- 基础信息 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="20">
                            <div class="infoText">联系人信息</div>
                        </el-col>
                    </el-row>
                    <!-- 表单 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="16">
                            <!-- 表单数据 -->
                            <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                                <!-- 联系人姓名 -->
                                <FormText :formText="form.label.Name"></FormText>
                                <el-form-item prop="Name">
                                    <el-input v-model="form.Name" :size="form.size" :placeholder="form.placeholder.Name" :validate-event="false"></el-input>
                                </el-form-item>
                                <!-- 联系人邮箱 -->
                                <FormText :formText="form.label.Email"></FormText>
                                <el-form-item prop="Email">
                                    <el-input v-model="form.Email" :size="form.size" :placeholder="form.placeholder.Email" :validate-event="false"></el-input>
                                </el-form-item>
                                <!-- 联系人手机号 -->
                                <FormText :formText="form.label.Tel"></FormText>
                                <el-form-item prop="Tel">
                                    <el-input v-model="form.Tel" :size="form.size" :placeholder="form.placeholder.Tel" :validate-event="false"></el-input>
                                </el-form-item>
                                <!-- 快盘开放平台协议 -->
                                <el-row type="flex" justify="center" :gutter="20">
                                    <el-col :span="1">
                                        <el-checkbox v-model="checked">
                
                                        </el-checkbox>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="mark">我同意<span @click="openKP">《快盘开放平台协议》</span></span>
                                    </el-col>
                                </el-row>
                                <!-- 快盘协议 -->
                                <KP v-if="KPShow" @close-dialog="closeDialog"></KP>
                                <div class="btn">
                                    <el-row type="flex" justify="center" :gutter="40">
                                        <el-col :span="9">
                                            <!-- 返回 -->
                                            <Button :btnItem="btnItem.back" @click-btn="back()"></Button>
                                        </el-col>
                                        <el-col :span="9">
                                            <!-- 下一步 -->
                                            <Button :btnItem="btnItem.next" @click-btn="commit('ruleForm')"></Button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from '../../../../components/Header/Header.vue';
import FormText from '../../../../components/Text/FormText.vue';
import Button from '../../../../components/Button/Button.vue';
import KP from '../Dialog/KP.vue';
import { checkName, checkEmail, checkTel } from '../../../../utils/rules.js';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
import { checkRSA } from '../../../../utils/rsa.js';
export default {
    name: 'customer_info',
    data () {
        //联系人姓名校验
        const validateName = (rule, value, callback) => {
            checkName(rule, value, callback);
        };
        //联系人邮箱校验
        const validateEmail = (rule, value, callback) => {
            checkEmail(rule, value, callback);
        };
        //联系人手机号校验
        const validateTel = (rule, value, callback) => {
            checkTel(rule, value, callback, '联系人手机号信息必填');
        };
        return {
            customerInfoItem: {
                flag: 'customerInfo'
            },
            showDialog: true,
            form: {
                size: 'medium',
                Name: '',
                Email: '',
                Tel: '',
                placeholder: {
                    Name: '',
                    Email: '',
                    Tel: ''
                },
                label: {
                    Name: '联系人姓名',
                    Email: '联系人邮箱',
                    Tel: '联系人手机号'
                }
            },
            rules: {
                //联系人姓名校验
                Name: [
                    { validator: validateName }
                ],
                //联系人邮箱校验
                Email: [
                    { validator: validateEmail }
                ],
                //联系人手机号校验
                Tel: [
                    { validator: validateTel }
                ]
            },
            checked: false,
            btnItem: {
                back: {
                    type: '',
                    text: '上一步',
                    plain: true,
                    size: 'medium'
                },
                next: {
                    type: 'primary',
                    text: '提交',
                    plain: false,
                    size: 'medium'
                }
            },
            baseInfoItem: {},
            KPShow: false
        }
    },
    components: { Header, FormText, Button, KP },
    methods: {
        // 返回
        back () {
            this.$router.push({
                path: '/baseInfo'
            });
        },
        //打开快盘协议
        openKP () {
            this.KPShow = true;
        },
        //关闭快盘协议
        closeDialog () {
            this.KPShow = false;
        },
        // 下一步
        commit (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    //勾选开放平台进行信息提交
                    if (this.checked) {
                        //调用添加认证消息的接口
                        let data = {
                            contactEmail: this.form.Email,
                            contactName: this.form.Name,
                            contactPhone: this.form.Tel,
                            corpName: this.baseInfoItem.Name,
                            licenseNum: this.baseInfoItem.Code,
                            licenseUrl: this.baseInfoItem.File,
                            isAgree: 1
                        };
                        let dataParams = {
                            data: checkRSA(data)
                        };
                        let proveRes = await this.$api.proveInterface(dataParams);
                        if (proveRes.code === 0) {
                            MessageInterface('提交成功，审核周期1-3个工作日', 'success', 5000);
                            //跳转审核中
                            this.$router.push({
                                path: '/auditEntry'
                            });
                        } else {
                            MessageInterface(`${proveRes.msg}`, 'error', 5000);
                        };
                        return false;
                    };
                    MessageInterface('请先同意快盘开放平台协议~', 'error', 5000);
                } else {
                    //验证未通过
                    return false;
                };
            });
        }
    },
    mounted () {
        //获取baseInfoItem数据
        this.baseInfoItem = {...this.$route.params.baseInfoItem};
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.customer_info {
    min-width: 1200px;
    .el-header {
        @include headerStyle ($mainColor, 56px, $baseColor);
        @include elHeader ();
    };
    .el-main {
        @include elBaseInfo ();
        .main {
            background-color: $baseColor;
            padding: 6% 16%;
            .infoText {
                margin-bottom: 6%;
                font-weight: 700;
            };
            .al-jiahao-fill {
                font-size: 30px;
                color: #bfbfbf;
            };
            .btn {
                margin: 12% 0;
            };
            .uploadParent {
                position: relative;
                .upload {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                    z-index: 100;
                };
            };
            .avaSuccess /deep/ .el-upload {
                background: rgba(0, 0, 0, 0.4);
            };
            .mark {
                font-size: $fontSizeExtra;
                span {
                    color: #007BFF;
                    cursor: $cursor;
                };
            };
        };
    };
};
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 20% 10%;
    background: #eee;
};

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
};


</style>