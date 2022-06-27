<template>
    <div class="base_info">
        <!-- 入驻页面 -->
       <el-container>
            <el-header height="56px">
                <Header :headerItem="baseInfoItem" :showDialog="showDialog"></Header>
            </el-header>
            <el-main>
                <div class="main">
                    <!-- 基础信息 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="20">
                            <div class="infoText">基本信息</div>
                        </el-col>
                    </el-row>
                    <!-- 表单 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="16">
                            <!-- 表单数据 -->
                            <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                                <!-- 单位名称（营业执照上的单位名称） -->
                                <FormText :formText="form.label.Name"></FormText>
                                <el-form-item prop="Name">
                                    <el-input v-model="form.Name" :size="form.size" :placeholder="form.placeholder.Name" :validate-event="false"></el-input>
                                </el-form-item>
                                <!-- 统一社会信用代码 -->
                                <FormText :formText="form.label.Code"></FormText>
                                <el-form-item prop="Code">
                                    <el-input v-model="form.Code" :size="form.size" :placeholder="form.placeholder.Code" :validate-event="false"></el-input>
                                </el-form-item>
                                <!-- 营业执照 -->
                                <FormText :formText="form.label.License"></FormText>
                                <el-upload
                                    v-if="imageUrl === ''"
                                    class="avatar-uploader"
                                    action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                    :headers="headers"
                                    :show-file-list="showFileList"
                                    :on-success="handleAvatarSuccess"
                                    :on-error="handleAvatarError"
                                    :before-upload="beforeAvatarUpload">
                                    <div>
                                        <i class="al-jiahao-fill"></i>
                                        <div class="el-upload__tip">上传营业执照盖章扫描件</div>
                                        <div class="el-upload__tip">不超过5M（格式必须为jpg或png，参考范例）</div>
                                    </div>
                                </el-upload>
                                <div v-if="imageUrl">
                                    <el-row type="flex" justify="star" :gutter="40" align="middle">
                                        <!-- 图像 -->
                                        <el-col :span="14">
                                            <div>
                                                <el-image v-if="imageUrl" style="width: 100%;" :src="imageUrl" lazy :preview-src-list="srcList" fit="fit"></el-image>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <!-- 上传按钮 -->
                                            <div>
                                                <el-upload
                                                    action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                                    :show-file-list="showFileList"
                                                    :headers="headers"
                                                    :data="elUploadData"
                                                    :on-success="handleAvatarSuccess"
                                                    :on-error="handleAvatarError"
                                                    :before-upload="beforeAvatarUpload">
                                                    <el-button size="mini" icon="el-icon-circle-plus" type="info">重新上传</el-button>
                                                    <div class="el-upload__tip">上传营业执照盖章扫描件</div>
                                                    <div class="el-upload__tip">不超过5M（格式必须为jpg或png）</div>
                                                </el-upload>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="btn">
                                    <el-row type="flex" justify="center" :gutter="40">
                                        <el-col :span="9">
                                            <!-- 返回 -->
                                            <Button :btnItem="btnItem.back" @click-btn="back()"></Button>
                                        </el-col>
                                        <el-col :span="9">
                                            <!-- 下一步 -->
                                            <Button :btnItem="btnItem.next" @click-btn="next('ruleForm')"></Button>
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
import { checkUnitName, checkCode } from '../../../../utils/rules.js';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
export default {
    name: 'base_info',
    data () {
        //校验单位名称
        const validateUnitName = (rule, value, callback) => {
            checkUnitName(rule, value, callback);
        };
        //校验统一社会信用代码
        const validateCode = (rule, value, callback) => {
            checkCode(rule, value, callback);
        }; 
        return {
            baseInfoItem: {
                flag: 'updateBaseInfo'
            },
            showDialog: true,
            form: {
                size: 'medium',
                Name: '',
                Code: '',
                placeholder: {
                    Name: '',
                    Code: ''
                },
                label: {
                    Name: '单位名称（营业执照上的单位名称）',
                    Code: '统一社会信用代码',
                    License: '营业执照'
                }
            },
            rules: {
                //校验单位名称
                Name: [
                    { validator: validateUnitName }
                ],
                //校验统一社会信用代码
                Code: [
                    { validator: validateCode }
                ]
            },
            imageUrl: require('../../../../images/loadFail.png'),
            srcList: [],
            elUploadData: {
                fileUrl: ''
            },
            showFileList: true,
            btnItem: {
                back: {
                    type: '',
                    text: '返回',
                    plain: true,
                    size: 'medium'
                },
                next: {
                    type: 'primary',
                    text: '下一步',
                    plain: false,
                    size: 'medium'
                }
            },
            File: '',
            // baseInfoItem: {},
            headers: {
                'Authorization-Corp': sessionStorage.getItem('token')
            }
        }
    },
    components: { Header, FormText, Button },
    methods: {
        //上传成功时触发
        handleAvatarSuccess(res, file) {
            if (res.code === 111 || res.code === 110) {
                this.$alert('网络繁忙，请重新登录', {
                    callback: action => {
                        //清空token
                        window.location.reload();
                        sessionStorage.removeItem('token');
                        return false;
                    },
                    showClose: false
                });
            } else {
                this.File = res.data;
                this.showFileList = false;
                this.imageUrl = URL.createObjectURL(file.raw);
                this.srcList[0] = this.imageUrl;
            };
        },
        //上传失败时触发
        handleAvatarError(res, file) {
            MessageInterface('上传失败，请重新上传', 'error', 5000);
        },
        //文件上传时触发
        beforeAvatarUpload(file) {
            let token = sessionStorage.getItem('token');
            if (!token) {
                this.$alert('网络繁忙，请重新登录', {
                    callback: action => {
                        //清空token
                        window.location.reload();
                        sessionStorage.removeItem('token');
                        return false;
                    },
                    showClose: false
                });
            };
            //判断上传图片的类型
            let isJPG;
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                isJPG = true;
            } else {
                isJPG = false;
            };

            //判断上传图片的大小
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                MessageInterface('上传失败，请重新上传', 'error', 5000);
            };

            if (!isLt2M) {
                MessageInterface('上传失败，请重新上传', 'error', 5000);
            };

            return isJPG && isLt2M;
        },
        // 返回
        back () {
            this.$router.push({
                path: '/updateEntry'
            });
        },
        // 下一步
        next (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate((valid) => {
                if (valid) {
                    //上传营业执照校验
                    if (this.imageUrl === '') {
                        MessageInterface('请上传营业执照', 'error', 5000);
                    } else {
                        let baseInfoItem = {
                            Name: this.form.Name,
                            Code: this.form.Code,
                            File: this.File === '' ? this.imageUrl : this.File,
                            Item: this.baseInfoItem
                        };
                        //跳转联系人信息页
                        this.$router.push(
                            { name: 'updateCustomerInfo', params: { baseInfoItem } }
                        );
                    };
                } else {
                    //验证未通过
                    return false;
                };
            });
        }
    },
    async created () {
        //获取认证信息
        let checkProveRes = await this.$api.checkProveInterface();
        // console.log(checkProveRes);
        //认证信息回显
        if (checkProveRes.code === 0) {
            //单位名称
            this.form.Name = checkProveRes.data.corpName;
            //统一社会信用代码
            this.form.Code = checkProveRes.data.licenseNum;
            //营业执照
            this.imageUrl = checkProveRes.data.licenseUrl;
            this.elUploadData.fileUrl = checkProveRes.data.licenseUrl;
            //联系人信息
            this.baseInfoItem = {
                //联系人姓名
                Name: checkProveRes.data.contactName,
                //联系人手机号
                Tel: checkProveRes.data.contactPhone,
                //联系人邮箱
                Email: checkProveRes.data.contactEmail,
                //企业ID
                corpId: checkProveRes.data.corpId
            };
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.base_info {
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
    background-color: #eee;
    padding: 10%;
};

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
};

.el-upload-list__item.is-ready,
.el-upload-list__item.is-uploading {
  display: none !important;
};
</style>