<template>
    <div class="plan_add">
        <!-- 游戏新增弹窗 -->
        <el-dialog title="修改计划" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="60%" center :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closePlan" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 计划ID -->
                <el-form-item class="textItem" label="计划ID" :label-width="form.labelWidth">
                    {{formItemView.planId}}
                </el-form-item>
                <!-- 游戏名称 -->
                <el-form-item class="textItem" label="游戏名称" :label-width="form.labelWidth">
                    {{formItemView.gameName}}
                </el-form-item>
                <!-- 云游戏产品形态 -->
                <el-form-item class="itemMorphology textItem" label="云游戏产品形态" prop="Morphology" :label-width="form.labelWidth">
                    <el-checkbox-group v-model="form.Morphology" :validate-event="false">
                        <el-row type="flex" justify="star">
                            <el-col :span="10">
                                <el-checkbox label="1" name="1">云游戏URL</el-checkbox>
                                <i class="al-wenhao" style="margin-left: 4px; color: #ccc;" @mouseover="MouseOver($event, 'MorphologyURL')" @mouseleave="MouseLeave($event, 'MorphologyURL')"></i>
                                <!-- Tip提示 -->
                                <Tip v-if="MorphologyURLShow" :TipItem="TipItemURL"></Tip>
                            </el-col>
                            <el-col :span="10">
                                <el-checkbox label="2" name="2">云微端</el-checkbox>
                                <i class="al-wenhao" style="margin-left: 4px; color: #ccc;" @mouseover="MouseOver($event, 'Morphology')" @mouseleave="MouseLeave($event, 'Morphology')"></i>
                                <!-- Tip提示 -->
                                <Tip v-if="MorphologyShow" :TipItem="TipItem"></Tip>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-form-item>
                <!-- 试玩包 -->
                <el-form-item class="styleItem" label="试玩包" prop="playPackage" :label-width="form.labelWidth">
                    <el-row type="flex" justify="star">
                        <el-col :span="22">
                            <el-input v-model="form.playPackage" :size="form.size" :placeholder="form.placeholder.playPackage" :validate-event="false"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <i class="al-wenhao" style="margin: 0 5px; color: #ccc;" @mouseover="MouseOver($event, 'playPackage')" @mouseleave="MouseLeave($event, 'playPackage')"></i>
                            <!-- Tip提示 -->
                            <Tip v-if="playPackageShow" :TipItem="TipItemPackage"></Tip>
                        </el-col>
                    </el-row>
                    <span class="sug" style="margin-left: 56px;">建议：提供有游客账号的安装包进行云化投放，转化效果更佳</span>
                </el-form-item>
                <!-- 游戏icon -->
                <el-form-item class="styleItem itemIcon" label="游戏icon" prop="Icon" :label-width="form.labelWidth">
                    <el-row type="flex" justify="star">
                        <el-col :span="form.Icon === '' ? 8 : 24">
                            <el-upload
                                v-if="form.Icon === ''"
                                class="avatar-uploader"
                                :headers="headers"
                                action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                :show-file-list="showFileList"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <div>
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                </div>
                            </el-upload>
                            <div v-if="form.Icon">
                                <el-row type="flex" justify="star" :gutter="40" align="middle">
                                    <!-- 图像 -->
                                    <el-col :span="8">
                                        <div>
                                            <el-image style="width: 80px; height: 80px;" :src="form.Icon" fit="fit"></el-image>
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <!-- 上传按钮 -->
                                        <div>
                                            <el-upload
                                                action="https://inter.open.kuaipantech.com/api-saas/sys/file/upload/img"
                                                :show-file-list="showFileList"
                                                :headers="headers"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload">
                                                <el-button size="mini" icon="el-icon-circle-plus" type="info">重新上传</el-button>
                                                <div class="el-upload__tip" style="line-height: 24px; text-align: left;">
                                                    <p>支持扩展名jpg、png，大小500kb以内</p>
                                                    <p>图片尺寸要求：512×512px</p>
                                                </div>
                                            </el-upload>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="form.Icon === '' ? 16 : 0">
                            <p>
                                <span v-if="form.Icon === ''" class="sug">支持扩展名jpg、png，大小500kb以内</span>
                            </p>
                            <p style="line-height: 0px;">
                                <span v-if="form.Icon === ''" class="sug">图片尺寸要求：512×512px</span>
                            </p>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 安卓包下载地址 -->
                <el-form-item class="styleItem" label="导下载地址（安卓端）" :label-width="form.labelWidth">
                    <el-row type="flex" justify="star">
                        <el-col :span="22">
                            <el-input v-model="form.Address" :size="form.size" :placeholder="form.placeholder.Address"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <i class="al-wenhao" style="margin: 0 5px; color: #ccc;" @mouseover="MouseOver($event, 'Address')" @mouseleave="MouseLeave($event, 'Address')"></i>
                            <!-- Tip提示 -->
                            <Tip v-if="AddressShow" :TipItem="TipItemAddress"></Tip>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 苹果应用商店跳转地址 -->
                <el-form-item class="styleItem" label="导下载地址（IOS端）" :label-width="form.labelWidth">
                    <el-row type="flex" justify="star">
                        <el-col :span="22">
                            <el-input v-model="form.IOSAddress" :size="form.size" :placeholder="form.placeholder.IOSAddress"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <i class="al-wenhao" style="margin: 0 5px; color: #ccc;" @mouseover="MouseOver($event, 'IOSAddress')" @mouseleave="MouseLeave($event, 'IOSAddress')"></i>
                            <!-- Tip提示 -->
                            <Tip v-if="IOSAddressShow" :TipItem="TipItemIOSAddress"></Tip>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 提交 -->
                    <el-col :span="12">
                        <Button :btnItem="btnItem.commit" @click-btn="commit('ruleForm', form)"></Button>
                    </el-col>
                    <PlanAddCommit v-if="PlanAddCommitShow" :dialogItem="dialogItem" @close-dialog="closeDialog"></PlanAddCommit>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import PlanAddCommit from './PlanAddCommit.vue';
import Tip from '../../../../components/Tip/Tip.vue';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
export default {
    name: 'plan_add',
    data () {
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '160px',
                placeholder: {
                    playPackage: '请填写游戏apk包下载地址，用于云化',
                    Address: '请填写游戏正式apk包下载地址',
                    IOSAddress: '请填写游戏上架苹果应用商店的跳转地址'
                },
                Morphology: [],
                Icon: '',
                playPackage: '',
                Address: '',
                IOSAddress: ''
            },
            showFileList: true,
            PlanAddCommitShow: false,
            rules: {
                // 云游戏产品形态
                Morphology: [
                    { type: 'array', required: true, message: '请选择产品形态' }
                ],
                //游戏icon
                Icon: [
                    { required: true, message: '请上传游戏icon' }
                ],
                // 试玩包校验
                playPackage: [
                    { required: true, message: '请填写试玩包下载地址' }
                ]
            },
            btnItem: {
                commit: {
                    type: 'primary',
                    text: '提交',
                    plain: false,
                    size: 'medium'
                }
            },
            dialogItem: {
                title: '温馨提示',
                center: true,
                width: '30%',
                text: '您的云计划xxx已提交，快盘将在1-3个工作日内审核完毕'
            },
            MorphologyURLShow: false,
            TipItemURL: {
                text: `快盘云游戏URL可降低无效转化，获取更精准的用户。适用于以下场景：投放买量场景进行拉新，如抖音、b站信息流、百度信息流、百度品专、短信push、app push等；私域流量场景进行拉新、召回，如微信群、QQ群等；仅单端（安卓端）上线的游戏，可通过云游戏URL实现IOS端快速上线。`
            },
            MorphologyShow: false,
            TipItem: {
                text: '快盘云微端提供一种全新的拉新方式，用户无需下载较大的游戏安装包，省略繁琐的资源下载加载流程，提高注册率及创角率。'
            },
            playPackageShow: false,
            TipItemPackage: {
                text: '云试玩旨在给用户提供快速试玩体验，繁琐的登录流程会影响试玩体验。'
            },
            AddressShow: false,
            TipItemAddress: {
                text: '正式可投放市场的安卓端apk包。'
            },
            IOSAddressShow: false,
            TipItemIOSAddress: {
                text: '正式已上架应用商店的应用地址。'
            },
            gameId: '',
            formItemView: {},
            headers: {
                'Authorization-Corp': sessionStorage.getItem('token')
            }
        }
    },
    components: { Button, PlanAddCommit, Tip },
    methods: {   
        // 图片上传成功后执行的动作
        handleAvatarSuccess (res, file, fileList) {
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
                this.form.Icon = res.data;
                this.showFileList = false;
            };
        },
        // 图片上传之前执行的动作
        beforeAvatarUpload (file) {
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
            //图片500k
            const imgSize = 500 / 1024;
            const isLt2M = file.size / 1024 / 1024 < imgSize;

            if (!isJPG) {
                MessageInterface('上传失败，请重新上传', 'error', 5000);
            };

            if (!isLt2M) {
                MessageInterface('上传失败，请重新上传', 'error', 5000);
            };

            //判断上传图片尺寸
            const isSize = new Promise(function(resolve, reject) {
            let width = 512;
            let height = 512;
            let _URL = window.URL || window.webkitURL;         
            let img = new Image();
            img.onload = function() {
                let valid = img.width == width && img.height == height;
                valid ? resolve() : reject();
            }
            img.src = _URL.createObjectURL(file);
            }).then(() => {
                // console.log('???', file);
                return file;
            }, () => {
                this.$message.error('上传的icon图片尺寸要求：512×512px');
                return Promise.reject();
            });

            return isJPG && isLt2M && isSize;
        },
        // 提交
        commit (formRule, form) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    //获取创建计划接口
                    let data = {
                        androidUrl: this.form.Address,
                        gameIcon: this.form.Icon,
                        gameId: this.formItemView.gameId,
                        iosUrl: this.form.IOSAddress,
                        planTypes: this.form.Morphology,
                        playPkgUrl: this.form.playPackage,
                        planId: this.formItemView.planId
                    };
                    let addPlanRes = await this.$api.updateAddPlanInterface(data);
                    if (addPlanRes.code === 0) {
                        //打开提交成功的弹窗
                        this.PlanAddCommitShow = true;
                    } else {
                        MessageInterface(`${addPlanRes.msg}`, 'error', 5000);
                    };
                } else {
                    //验证未通过
                    return false;
                };
            });
        },
        // 关闭弹窗
        closePlan () {
            this.$emit('close-plan');
        },
        // 关闭提交成功的弹窗
        closeDialog () {
            //关闭弹窗
            this.$emit('down-plan');
            this.PlanAddCommitShow = false;
            window.location.reload();
        },
        // 鼠标移上去触发
        MouseOver (e, flag) {
            if (flag === 'MorphologyURL') {
                this.MorphologyURLShow = true;
            } else if (flag === 'Morphology') {
                this.MorphologyShow = true;
            } else if (flag === 'playPackage') {
                this.playPackageShow = true;
            } else if (flag === 'Address') {
                this.AddressShow = true;
            } else if (flag === 'IOSAddress') {
                this.IOSAddressShow = true;
            };
        },
        // 鼠标移开触发
        MouseLeave (e, flag) {
            if (flag === 'MorphologyURL') {
                this.MorphologyURLShow = false;
            } else if (flag === 'Morphology') {
                this.MorphologyShow = false;
            } else if (flag === 'playPackage') {
                this.playPackageShow = false;
            } else if (flag === 'Address') {
                this.AddressShow = false;
            } else if (flag === 'IOSAddress') {
                this.IOSAddressShow = false;
            };
        }
    },
    mounted () {
        //获取数据
        if (JSON.parse(sessionStorage.getItem('formItemView'))) {
            this.formItemView = JSON.parse(sessionStorage.getItem('formItemView'));
            //赋值
            //云游戏产品形态
            this.form.Morphology = [...this.formItemView.planTypes];
            //试玩包
            this.form.playPackage = this.formItemView.playPkgUrl;
            //游戏icon
            this.form.Icon = this.formItemView.gameIcon;
            //安卓安装包下载地址
            this.form.Address = this.formItemView.androidUrl;
            //苹果安装包下载地址
            this.form.IOSAddress = this.formItemView.iosUrl;
            //云计划id
            this.dialogItem.text = `您的云计划${this.formItemView.id}已提交，快盘将在1-3个工作日内审核完毕。`;
        };
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.sug {
    font-size: $fontSizeExtra;
};

.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
};

.avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
};
  
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
};

// .is-error /deep/ .el-form-item__error {
//     color: #F56C6C;
//     font-size: 12px;
//     line-height: 1;
//     padding-top: 4px;
//     position: absolute;
//     top: 85%;
//     left: 12%;
// };

// .itemIcon /deep/ .el-form-item__error {
//     color: #F56C6C;
//     font-size: 12px;
//     line-height: 1;
//     padding-top: 4px;
//     position: absolute;
//     top: 85%;
//     left: 5%;
// };

// .itemMorphology /deep/ .el-form-item__error {
//     color: #F56C6C;
//     font-size: 12px;
//     line-height: 1;
//     padding-top: 4px;
//     position: absolute;
//     top: 65% !important;
//     left: 12%;
// };

.itemElForm /deep/ .el-form-item__label {
    line-height: 20px;
};

//媒体查询适配 1024 1280 1366 1440 1680 1920
@media (min-width:1024px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 16%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 7%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 16%;
    };
};

@media (min-width:1280px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 11.5%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 5%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 11.5%;
    };
};

@media (min-width:1366px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 10.5%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 4.5%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 10.5%;
    };
};

@media (min-width:1440px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 9.5%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 4%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 9.5%;
    };
};

@media (min-width:1680px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 8%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 3.5%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 8%;
    };
};

@media (min-width:1920px) {
    .is-error /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 6.5%;
    };

    .itemIcon /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 85%;
        left: 3%;
    };

    .itemMorphology /deep/ .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 65% !important;
        left: 6.5%;
    };
};


// 修改checkbox选中后的字体颜色
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
};

.styleItem /deep/ .el-form-item__label {
    margin-right: 24px;
};

.textItem /deep/ .el-form-item__label {
    margin-right: 56px;
};
</style>

<style>
.el-dialog {
    padding: 1% 3%;
};
.el-upload-list__item.is-ready,
.el-upload-list__item.is-uploading {
  display: none !important;
};
</style>