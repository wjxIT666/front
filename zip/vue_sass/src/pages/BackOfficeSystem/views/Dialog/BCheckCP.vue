<template>
    <div class="b_check_cp">
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
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 计划ID -->
                            <el-form-item label="计划ID" :label-width="form.labelWidth">
                                {{BCheckCPItem.planVid}}
                            </el-form-item>
                            <!-- 游戏名称 -->
                            <el-form-item label="游戏名称" :label-width="form.labelWidth">
                                {{BCheckCPItem.gameName}}
                            </el-form-item>
                            <!-- 试玩包下载地址 -->
                            <el-form-item label="试玩包下载地址" :label-width="form.labelWidth">
                                {{BCheckCPItem.playPkgUrl}}
                            </el-form-item>
                            <!-- 安卓推广包下载地址 -->
                            <el-form-item label="安卓推广包下载地址" :label-width="form.labelWidth">
                                {{BCheckCPItem.androidUrl}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- CP -->
                            <el-form-item label="CP" :label-width="form.labelWidth">
                                {{BCheckCPItem.corpName}}
                            </el-form-item>
                            <!-- 云游戏产品形态 -->
                            <el-form-item label="云游戏产品形态" :label-width="form.labelWidth">
                                {{BCheckCPItem.plantype}}
                            </el-form-item>
                            <!-- 游戏icon -->
                            <el-form-item label="游戏icon" :label-width="form.labelWidth">
                                <el-image style="width: 70%;" :src="BCheckCPItem.gameIcon" fit="fit"></el-image>
                            </el-form-item>
                            <!-- 苹果应用商店跳转地址 -->
                            <el-form-item label="苹果应用商店跳转地址" :label-width="form.labelWidth">
                                {{BCheckCPItem.iosUrl}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 安装信息 -->
                <h3>云化信息</h3>
                <!-- 表单 -->
                <el-row type="flex" justify="star">
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- corpkey -->
                            <el-form-item label="corpkey" :label-width="form.labelWidth">
                                {{BManageInfoItem.corpkey}}
                            </el-form-item>
                            <!-- gid -->
                            <el-form-item label="gid" :label-width="form.labelWidth">
                                {{BManageInfoItem.gid}}
                            </el-form-item>
                            <!-- gameId -->
                            <el-form-item label="gameId" :label-width="form.labelWidth">
                                {{BManageInfoItem.gameid}}
                            </el-form-item>
                            <!-- 是否生成独立页面 -->
                            <el-form-item label="是否生成独立页面" :label-width="form.labelWidth">
                                <el-radio-group v-model="BManageInfoItem.newpage" disabled>
                                    <el-radio :label="0">统一页面</el-radio>
                                    <el-radio :label="1">独立页面</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 页面标题 -->
                            <el-form-item label="页面标题" :label-width="form.labelWidth">
                                {{BManageInfoItem.pagetitle}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form :model="form" label-position="left">
                            <!-- 包名 -->
                            <el-form-item label="包名" :label-width="form.labelWidth">
                                {{BManageInfoItem.pkgname}}
                            </el-form-item>
                            <!-- 是否支持边玩边下 -->
                            <el-form-item label="是否支持边玩边下" :label-width="form.labelWidth">
                                <el-radio-group v-model="BManageInfoItem.download" disabled>
                                    <el-radio :label="1">支持</el-radio>
                                    <el-radio :label="0">不支持</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 试玩倒计时 -->
                            <el-form-item label="试玩倒计时" :label-width="form.labelWidth">
                                {{BManageInfoItem.playtime}}
                            </el-form-item>
                            <!-- 云游戏URL -->
                            <el-form-item label="云游戏URL" :label-width="form.labelWidth">
                                {{BManageInfoItem.cloudurl}}
                            </el-form-item>
                            <!-- 云微端 -->
                            <el-form-item label="云微端" :label-width="form.labelWidth">
                                <el-button type="text" @click="downLoad(BManageInfoItem.cloudpkgurl)" :disabled="downloadFlag">下载</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 提交 -->
                    <el-col :span="8">
                        <Button :btnItem="btnItem.commit" @click-btn="commit()"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import { urlDownload } from '../../../../utils/common.js';
export default {
    name: 'b_check_cp',
    props: {
        BCheckCPItem: {
            default: Object
        },
        BManageInfoItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '160px'
            },
            btnItem: {
                commit: {
                    type: 'primary',
                    text: '关闭',
                    plain: false,
                    size: 'medium'
                }
            },
            downloadFlag: false
        }
    },
    components: { Button },
    methods: {
        //关闭
        commit () {
            this.$emit('close-bcheckCP');
        },
        //下载云微端
        downLoad (url) {
            urlDownload(url);
        }
    },
    mounted () {
        // console.log(this._props.BManageInfoItem, '~~~');
        let downLoad = this._props.BManageInfoItem.cloudpkgurl;
        if (downLoad === null || downLoad === '' || downLoad === undefined) {
            this.downloadFlag = true;
        };
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
