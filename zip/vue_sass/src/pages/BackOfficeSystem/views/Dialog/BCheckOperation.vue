<template>
    <div class="b_check_operation">
        <!-- 封装通用的计划详情弹窗 -->
        <!-- 计划详情弹窗 -->
        <el-dialog title="计划详情" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="80%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 游戏信息 -->
                <h3>游戏信息</h3>
                <!-- 表单 -->
                <el-row type="flex" justify="star">
                    <el-col :span="14">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 计划ID -->
                            <el-form-item label="计划ID" :label-width="form.labelWidth">
                                {{BCheckOperationItem.planVid}}
                            </el-form-item>
                            <!-- 游戏名称 -->
                            <el-form-item label="游戏名称" :label-width="form.labelWidth">
                                {{BCheckOperationItem.gameName}}
                            </el-form-item>
                            <!-- 试玩包下载地址 -->
                            <el-form-item label="试玩包下载地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>{{BCheckOperationItem.playPkgUrl}}</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text" @click="copyUrl(BCheckOperationItem.playPkgUrl)">复制</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- 安卓推广包下载地址 -->
                            <el-form-item label="安卓推广包下载地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>{{BCheckOperationItem.androidUrl}}</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button v-if="BCheckOperationItem.androidUrl" type="text" @click="copyUrl(BCheckOperationItem.androidUrl)">复制</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="10">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- CP -->
                            <el-form-item label="CP" :label-width="form.labelWidth">
                                {{BCheckOperationItem.corpName}}
                            </el-form-item>
                            <!-- 云游戏产品形态 -->
                            <el-form-item label="云游戏产品形态" :label-width="form.labelWidth">
                                {{BCheckOperationItem.plantype}}
                            </el-form-item>
                            <!-- 游戏icon -->
                            <el-form-item label="游戏icon" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <el-image style="width: 70%;" :src="BCheckOperationItem.gameIcon" fit="fit"></el-image>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text" @click="downloadImg(BCheckOperationItem.gameIcon)">下载</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- 苹果应用商店跳转地址 -->
                            <el-form-item label="苹果应用商店跳转地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>{{BCheckOperationItem.iosUrl}}</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button v-if="BCheckOperationItem.iosUrl" type="text" @click="copyUrl(BCheckOperationItem.iosUrl)">复制</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 取消 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.cancel" @click-btn="cancel()"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import { copyURL, download } from '../../../../utils/common.js';
export default {
    name: 'b_check_operation',
    props: {
        BCheckOperationItem: {
            default: Object
        } 
    },
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '120px'
            },
            btnItem: {
                cancel: {
                    type: 'primary',
                    text: '关闭',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    components: { Button },
    methods: {
        //取消
        cancel () {
            this.$emit('close-cancel');
        },
        //复制
        copyUrl (url) {
            copyURL(url);
        },
        //图片下载
        downloadImg (url) {
            download(url);
        }
    },
    mounted () {
        
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
