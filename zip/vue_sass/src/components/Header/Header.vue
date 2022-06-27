<template>
    <div class="header">
        <!-- 通栏顶部 -->
        <div>
            <el-row>
                <el-col :span="12">
                    <!-- logo、名称 -->
                    <el-row :gutter="20">
                        <!-- logo -->
                        <el-col :span="4">
                            <el-image style="width: 80px; margin-top: 7%;" fit="fit" :src="src"></el-image>
                        </el-col>
                        <!-- 名称 -->
                        <el-col :span="18">
                            <span class="header_name" :class="{header_nameColor: headerColor}">上海快盘网络科技有限公司</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <!-- 首页、功能索引、账号 -->
                    <el-row type="flex" justify="end">
                        <el-col :span="4">
                            <div class="item">
                                <span @click.self="helpCenter(helpCenterFlag)">{{helpCenterText}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div v-if="showDialog">
                                <el-popover
                                    placement="top"
                                    width="150"
                                    trigger="hover"
                                >
                                    <div style="text-align: center; font-size: 12px;">
                                        <div style="margin-bottom: 10px;">
                                            <!-- 修改密码 -->
                                            <i class="al-xiugaimima"></i>
                                            <span style="margin-left: 15px; cursor: pointer; vertical-align: top;" @click="updatePassword">修改密码</span>
                                            <!-- 修改密码弹窗 -->
                                            <UpdatePassword v-if="UpdatePasswordShow" @cancel-dialog="cancelDialog" @save-dialog="saveDialog"></UpdatePassword>
                                        </div>
                                        <div>
                                            <!-- 退出系统 -->
                                            <i class="al-tuichu"></i>
                                            <span style="margin-left: 15px; cursor: pointer; vertical-align: top;" @click="exit">退出系统</span>
                                        </div>
                                    </div>
                                    <div class="item" slot="reference">
                                        <i class="al-gerenyonghutouxiang2"></i>
                                        <span class="tel">{{userState}}</span>
                                    </div>
                                </el-popover>
                            </div>
                            <div v-else>
                                <div class="item" slot="reference">
                                    <i class="al-gerenyonghutouxiang2"></i>
                                    <span class="tel">未登录</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import UpdatePassword from '../../pages/FrontOfficeSystem/views/Dialog/UpdatePassword.vue';
import { mapState } from 'vuex';
export default {
    props: {
        headerItem: {
            default: Object
        },
        showDialog: {
            default: Boolean
        },
        helpCenterFlag: {
            default: String
        },
        path: {
            default: String
        }
    },
    data () {
        return {
            headerColor: false,
            src: require('../../images/kpLogo.png'),
            UpdatePasswordShow: false,
            helpCenterText: '帮助中心'
        }
    },
    methods: {
        // 修改密码
        updatePassword () {
            this.UpdatePasswordShow = true;
        },
        // 关闭弹窗
        cancelDialog () {
            this.UpdatePasswordShow = false;
        },
        // 关闭弹窗
        saveDialog () {
            this.UpdatePasswordShow = false;
        },
        //帮助中心
        helpCenter (data) {
            // console.log(data);
            if (data == 'help') {
                    this.$router.push({
                        path: `${this._props.path}`
                    });
                } else {
                    this.$router.push({
                        path: '/answer'
                    });
                };
        },
        // 退出系统
        async exit () {
            //调用退出登录的接口
            await this.$api.exitInterface();
            //清空token
            sessionStorage.removeItem('token');
            this.$store.commit('removecustomerFlag', 0);
            //回到登录页
            this.$router.push({ path: '/login' });
        }
    },
    components: { UpdatePassword },
    mounted () {
        if (this.headerItem.flag === 'entry') {
            this.headerColor = true;
        };

        //判断是否存在token
        let token = sessionStorage.getItem('token');
        if (token && this.$store.state.customerFlag == 0) {
            //向vuex发送请求
            this.$store.dispatch('sendCustomer');
        };

        if (this._props.helpCenterFlag === 'help') {
            this.helpCenterText = '返回上一级';
        } else {
            this.helpCenterText = '帮助中心';
        };

    },
    computed: {
        ...mapState({
            userState: 'userState'
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.header {
    .header_name {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
    };
    .header_nameColor {
        color: $mainColor;
    };
    .item {
        text-align: center;
        font-size: $fontSizeBase;
        span {
            cursor: $cursor;
        };
        .tel {
            margin-left: 2px;
        };
    };
}

</style>
