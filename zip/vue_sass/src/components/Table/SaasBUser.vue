<template>
    <div class="saas_b_user">
        <!-- 新增 -->
        <div class="saas_b_user_search">
            <el-row type="flex" justify="star">
                <el-col :span="4">
                    <Button :btnItem="btnItem" @click-btn="addUser"></Button>
                </el-col>
            </el-row>
            <BUserAdd v-if="BUserAddShow" :selectItem="selectItem" @add-user="addBUserCommit" @close-dialog="closeDialog"></BUserAdd>
        </div>
        <!-- 表格 -->
        <el-table
            v-if="tableData.length"
            :data="tableData"
            stripe
            size="small"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- ID -->
                <el-table-column
                    prop="id"
                    label="ID"
                    >
                </el-table-column>
                <!-- 用户名 -->
                <el-table-column
                    prop="username"
                    label="用户名"
                    >
                </el-table-column>
                <!-- 角色权限 -->
                <el-table-column
                    prop="roleNames"
                    label="角色权限"
                    >
                </el-table-column>
                <!-- 帐号状态 -->
                <el-table-column
                    label="帐号状态"
                    >
                    <template slot-scope="scope">
                        {{userStatus(scope.row.userStatus)}}
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="audit(scope.$index, scope.row)">编辑
                            <!-- 编辑弹窗 -->
                            <BUserAudit v-if="BUserAuditShow" :BUserAudit="BUserAudit" :selectItem="selectItem" @audit-commit="auditCommit" @close-BuserAudit="closeBuserAudit"></BUserAudit>
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div class="page">
                    <Page v-if="tableData.length" :totalLength="tableData.length" :pageSize="pageCount" :currentPage="currentPage" @current-page="getPage"></Page>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Button from '../Button/Button.vue';
import Page from '../Page/Page.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { userStatusChange } from '../../utils/common.js';
import BUserAdd from '../../pages/BackOfficeSystem/views/Dialog/BUserAdd.vue';
import BUserAudit from '../../pages/BackOfficeSystem/views/Dialog/BUserAudit.vue';
export default {
    name: 'saas_b_user',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            btnItem: {
                type: 'primary',
                text: '新增',
                plain: false,
                size: 'medium'
            },
            tableData: [],
            BUserAddShow: false,
            selectItem: [],
            BUserAuditShow: false,
            BUserAudit: {}
        }
    },
    components: { Button, BUserAdd, BUserAudit, Page },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取用户列表
            let params = { pageNo: this.currentPage, pageSize: this.pageCount };
            let BUserPageRes = await this.$api.BUserPageInterface(params);
            if (BUserPageRes.code === 0) {
                //列表赋值
                this.tableData = [...BUserPageRes.data.rows];
                //总条数
                this.tableData.length = BUserPageRes.data.totalRows;
            } else {
                MessageInterface(`${BUserPageRes.msg}`, 'error', 5000);
            };
        },
        //新增
        addUser () {
            this.BUserAddShow = true;
        },
        //新增弹窗提交
        async addBUserCommit (form) {
            let data = {
                username: form.Name,
                password: form.Password,
                roleIdList: form.User,
                userStatus: form.status
            };
            let BUserAddRes = await this.$api.BUserAddInterface(data);
            // console.log(BUserAddRes);
            if (BUserAddRes.code === 0) {
                MessageInterface(`新增用户成功`, 'success', 5000);
                //获取用户列表
                let params = { pageNo: this.currentPage, pageSize: this.pageCount };
                let BUserPageRes = await this.$api.BUserPageInterface(params);
                if (BUserPageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BUserPageRes.data.rows];
                    //总条数
                    this.tableData.length = BUserPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BUserPageRes.msg}`, 'error', 5000);
                };
                this.BUserAddShow = false;
            } else {
                MessageInterface(`${BUserAddRes.msg}`, 'error', 5000);
            };
        },
        //关闭新增弹窗
        closeDialog () {
            this.BUserAddShow = false;
        },
        //编辑
        audit (index, row) {
            // console.log('编辑', row);
            this.BUserAudit = {...row};
            this.BUserAuditShow = true;
        },
        //编辑提交按钮
        async auditCommit (data) {
            //获取编辑接口
            let BUserAuditRes = await this.$api.BUserAuditInterface(data);
            // console.log(BUserAuditRes);
            if (BUserAuditRes.code === 0) {
                MessageInterface(`编辑成功`, 'success', 5000);
                //获取用户列表
                let params = { pageNo: this.currentPage, pageSize: this.pageCount };
                let BUserPageRes = await this.$api.BUserPageInterface(params);
                if (BUserPageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BUserPageRes.data.rows];
                    //总条数
                    this.tableData.length = BUserPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BUserPageRes.msg}`, 'error', 5000);
                };
                this.BUserAuditShow = false;
            } else {
                MessageInterface(`${BUserAuditRes.msg}`, 'error', 5000);
            };
        },
        //关闭编辑弹窗
        closeBuserAudit () {
            this.BUserAuditShow = false;
        },
        //判断用户状态
        userStatus (userStatus) {
           let userStatusRes = userStatusChange(userStatus);
           return userStatusRes;
        }
    },
    async mounted () {
        //获取用户列表
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BUserPageRes = await this.$api.BUserPageInterface(params);
        if (BUserPageRes.code === 0) {
            //列表赋值
            this.tableData = [...BUserPageRes.data.rows];
            //总条数
            this.tableData.length = BUserPageRes.data.totalRows;
        } else {
            MessageInterface(`${BUserPageRes.msg}`, 'error', 5000);
        };

        //获取用户管理--权限下拉
        let BUserAddSelRes = await this.$api.BUserAddSelInterface();
        if (BUserAddSelRes.code === 0) {
            this.selectItem = [...BUserAddSelRes.data];
        } else {
            MessageInterface(`${BUserAddSelRes.msg}`, 'error', 5000);
        };
    }
}
</script>

<style lang="scss" scoped>
.saas_b_user {
    .saas_b_user_search {
        margin: 1% 0 3% 0;
    };
    .page {
        margin: 20% 0 10% 0;
    };
};

.el-button /deep/ span {
    margin-left: 5px;
};

.name {
    font-size: 14px;
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
}
</style>
