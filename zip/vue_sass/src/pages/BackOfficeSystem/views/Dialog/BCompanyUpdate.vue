<template>
    <div class="b_company_update">
        <!-- 企业信息弹窗 -->
        <el-dialog title="企业信息" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="50%" center :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeInfo" :lock-scroll="false">
             <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 基本信息 -->
                <h3>基本信息</h3>
                <!-- 表单 -->
                <el-form :model="form" label-position="left">
                    <!-- 单位名称 -->
                    <el-form-item label="单位名称" :label-width="form.labelWidth">
                        <el-input v-if="formItemShow" v-model="form.Name" :size="form.size" :placeholder="form.placeholder.Name" :validate-event="false"></el-input>
                        <span v-else>{{BCompanyItem.corpName}}</span>
                    </el-form-item>
                    <!-- 统一社会信用代码 -->
                    <el-form-item label="统一社会信用代码" :label-width="form.labelWidth">
                        <el-input v-if="formItemShow" v-model="form.Code" :size="form.size" :placeholder="form.placeholder.Code" :validate-event="false"></el-input>
                        <span v-else>{{BCompanyItem.licenseNum}}</span>
                    </el-form-item>
                    <!-- 营业执照 -->
                    <el-form-item label="营业执照" :label-width="form.labelWidth">
                        <div v-if="formItemShow">
                            <el-upload
                                v-if="imageUrl === ''"
                                class="avatar-uploader"
                                action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                :show-file-list="showFileList"
                                :headers="headers"
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
                                            <el-image style="width: 100%;" :src="imageUrl" fit="fit"></el-image>
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <!-- 上传按钮 -->
                                        <div>
                                            <el-upload
                                                action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                                :headers="headers"
                                                :show-file-list="showFileList"
                                                :on-success="handleAvatarSuccess"
                                                :on-error="handleAvatarError"
                                                :before-upload="beforeAvatarUpload">
                                                <el-button size="mini" icon="el-icon-circle-plus" type="info">重新上传</el-button>
                                                <div class="el-upload__tip">上传营业执照盖章扫描件</div>
                                                <div class="el-upload__tip">不超过5M（格式必须为jpg或png，参考范例）</div>
                                            </el-upload>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <el-image v-else style="width: 50%;" :src="BCompanyItem.licenseUrl" fit="fit"></el-image>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 联系人信息 -->
                <h3>联系人信息</h3>
                <!-- 表单 -->
                <el-form :model="form" label-position="left">
                    <!-- 联系人姓名 -->
                    <el-form-item label="联系人姓名" :label-width="form.labelWidth">
                        <el-input v-if="formItemShow" v-model="form.CName" :size="form.size" :placeholder="form.placeholder.CName" :validate-event="false"></el-input>
                        <span v-else>{{BCompanyItem.contactName}}</span>
                    </el-form-item>
                    <!-- 联系人邮箱 -->
                    <el-form-item label="联系人邮箱" :label-width="form.labelWidth">
                        <el-input v-if="formItemShow" v-model="form.CEmail" :size="form.size" :placeholder="form.placeholder.CEmail" :validate-event="false"></el-input>
                        <span v-else>{{BCompanyItem.contactEmail}}</span>
                    </el-form-item>
                    <!-- 联系人手机号 -->
                    <el-form-item label="联系人手机号" :label-width="form.labelWidth">
                        <el-input v-if="formItemShow" v-model="form.CTel" :size="form.size" :placeholder="form.placeholder.CTel" :validate-event="false"></el-input>
                        <span v-else>{{BCompanyItem.contactPhone}}</span>
                    </el-form-item>
                    <!-- 备注 -->
                    <el-form-item label="备注" :label-width="form.labelWidth">
                        <el-input type="textarea" v-model="form.mark" :rows="4" :maxlength="100" show-word-limit></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 取消 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.cancel" @click-btn="cancel()"></Button>
                    </el-col>
                    <!-- 修改 -->
                    <el-col v-if="updateShow" :span="6">
                        <Button :btnItem="btnItem.update" @click-btn="update()"></Button>
                    </el-col>
                    <!-- 提交 -->
                    <el-col v-if="formItemShow" :span="6">
                        <Button :btnItem="btnItem.commit" @click-btn="commit()"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
export default {
    name: 'b_company_update',
    props: {
        BCompanyItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true,
            formItemShow: false,
            form: {
                labelWidth: '140px',
                size: 'medium',
                Name: '',
                Code: '',
                CName: '',
                CEmail: '',
                CTel: '',
                mark: '',
                placeholder: {
                    Name: '请填写单位名称',
                    Code: '请填写统一社会信用代码',
                    CName: '请填写联系人姓名',
                    CEmail: '请填写联系人邮箱',
                    CTel: '请填写联系人手机号'
                }
            },
            btnItem: {
                cancel: {
                    type: 'primary',
                    text: '取消',
                    plain: false,
                    size: 'medium'
                },
                update: {
                    type: 'primary',
                    text: '修改',
                    plain: false,
                    size: 'medium'
                },
                commit: {
                    type: 'primary',
                    text: '提交',
                    plain: false,
                    size: 'medium'
                }
            },
            showFileList: true,
            imageUrl: '',
            File: '',
            updateShow: true,
            headers: {
                'Authorization-Admin': sessionStorage.getItem('token')
            }
        }
    },
    methods: {
        //关闭弹窗
        closeInfo () {
            this.$emit('close-info');
        },
        //修改
        update () {
            this.formItemShow = true;
            this.updateShow = false;
        },
        //取消
        cancel () {
            this.$emit('down-cancel');
        },
        checkInfo () {
            //判断单位名称
            if (this.form.Name === '') {
                MessageInterface('请填写单位名称', 'error', 5000);
                return false;
            } else if (this.form.Name.length > 50) {
                MessageInterface('单位名称不超过50个字，请重新输入', 'error', 5000);
                return false;
            };

            //判断统一社会信用代码
            if (this.form.Code === '') {
                MessageInterface('请填写统一社会信用代码', 'error', 5000);
                return false;
            } else if (this.form.Code.length > 18) {
                MessageInterface('统一社会信用代码不超过18位，请重新输入', 'error', 5000);
                return false;
            };

            //判断营业执照
            if (this.imageUrl === '') {
                MessageInterface('请上传营业执照', 'error', 5000);
                return false;
            };

            //判断联系人姓名
            if (this.form.CName === '') {
                MessageInterface('请填写联系人姓名', 'error', 5000);
                return false;
            } else if (this.form.CName.length > 50) {
                MessageInterface('联系人姓名不超过50个字，请重新输入', 'error', 5000);
                return false;
            };

            //判断联系人邮箱
            const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
            if (this.form.CEmail === '') {
                MessageInterface('请填写联系人邮箱', 'error', 5000);
                return false;
            } else if (!reg.test(this.form.CEmail)) {
                MessageInterface('请输入正确的邮箱', 'error', 5000);
                return false;
            };

            //判断联系人手机号
            const regTel = /^[1][0-9][0-9]{9}$/;
            if (this.form.CTel === '') {
                MessageInterface('请填写联系人手机号', 'error', 5000);
                return false;
            } else if (!regTel.test(this.form.CTel)) {
                MessageInterface('请输入正确的手机号', 'error', 5000);
                return false;
            };

            return true;
        },
        //提交
        commit () {
            if (this.checkInfo()) {
                let data = {
                    contactEmail: this.form.CEmail,
                    contactName: this.form.CName,
                    contactPhone: this.form.CTel,
                    corpName: this.form.Name,
                    licenseNum: this.form.Code,
                    licenseUrl: this.File === '' ? this.imageUrl : this.File,
                    remark: this.form.mark,
                    corpId: this._props.BCompanyItem.corpId,
                    corpStatus: this._props.BCompanyItem.corpStatus
                };
                this.$emit('down-bcUpdate', data);
            }
        },
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
                this.showFileList = false;
                this.File = res.data;
                this.imageUrl = URL.createObjectURL(file.raw);
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
        }
    },
    components: { Button },
    mounted () {
        // console.log(this._props.BCompanyItem);
        //赋值
        //单位名称
        this.form.Name = this._props.BCompanyItem.corpName;
        //统一社会信用代码
        this.form.Code = this._props.BCompanyItem.licenseNum;
        //图片赋值
        this.imageUrl = this._props.BCompanyItem.licenseUrl;
        //联系人姓名
        this.form.CName = this._props.BCompanyItem.contactName;
        //联系人手机号
        this.form.CTel = this._props.BCompanyItem.contactPhone;
        //联系人邮箱
        this.form.CEmail = this._props.BCompanyItem.contactEmail;
        //备注
        this.form.mark = this._props.BCompanyItem.remark;
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.el-divider--horizontal {
    @include elDivider ();
}

.planItem {
    padding: 4%;
    h3 {
        margin-bottom: 4%;
    }
}
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
