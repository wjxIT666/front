<template>
    <div class="b_plan">
        <!-- 封装通用的计划详情弹窗 -->
        <!-- 计划详情弹窗 -->
        <el-dialog title="计划详情" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="80%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true">
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
                                计划ID
                            </el-form-item>
                            <!-- 游戏名称 -->
                            <el-form-item label="游戏名称" :label-width="form.labelWidth">
                                游戏名称
                            </el-form-item>
                            <!-- 云化包下载地址 -->
                            <el-form-item label="云化包下载地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>云化包下载地址云化包下载地址云化包下载地址云化包下载地址</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text">复制</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- 安卓包下载地址 -->
                            <el-form-item label="安卓包下载地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>云化包下载地址云化包下载地址云化包下载地址云化包下载地址</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text">复制</el-button>
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
                                云畅
                            </el-form-item>
                            <!-- 计划类型 -->
                            <el-form-item label="计划类型" :label-width="form.labelWidth">
                                上云
                            </el-form-item>
                            <!-- 游戏icon -->
                            <el-form-item label="云化包下载地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>图片</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text">下载</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- 苹果应用商店跳转地址 -->
                            <el-form-item label="苹果应用商店跳转地址" :label-width="form.labelWidth">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <span>云化包下载地址云化包下载地址云化包下载地址云化包下载地址</span>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text">复制</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 安装信息 -->
                <h3>安装信息</h3>
                <!-- 表单 -->
                <el-row type="flex" justify="star">
                    <el-col :span="24">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 服务选择 -->
                            <el-form-item label="服务选择" :label-width="form.labelWidth">
                                服务选择
                            </el-form-item>
                            <!-- 设备要求 -->
                            <el-form-item label="设备要求" :label-width="form.labelWidth">
                                设备要求
                            </el-form-item>
                            <!-- 是否独占设备 -->
                            <el-form-item label="是否独占设备" :label-width="form.labelWidth">
                                是
                            </el-form-item>
                            <!-- 设备数据 -->
                            <el-form-item label="设备数据" :label-width="form.labelWidth">
                                50
                            </el-form-item>
                            <!-- 有效时间 -->
                            <el-form-item label="设备数据" :label-width="form.labelWidth">
                                2021/5/7-2021/6/21
                            </el-form-item>
                            <!-- 备注 -->
                            <el-form-item label="备注" :label-width="form.labelWidth">
                                1231
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
export default {
    name: 'b_plan',
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '120px'
            },
            btnItem: {
                commit: {
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
        //关闭
        commit () {
            this.$emit('close-bplan');
        }
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
