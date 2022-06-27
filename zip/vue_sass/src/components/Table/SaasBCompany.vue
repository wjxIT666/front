<template>
    <div class="saas_b_company">
        <!-- 查询 -->
        <div style="margin: 1% 0 3% 0;">
            <el-row type="flex" justify="start" :gutter="20">
                <el-col :span="8">
                    <el-row type="flex" justify="end" align="middle">
                        <el-col :span="6">
                            <span class="name">企业名称</span>
                        </el-col>
                        <el-col :span="18">
                            <Input :inpItem="inpItem" @inp-search="inpSearch" @watch-inpVal="watchInpVal"></Input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row type="flex" justify="end" align="middle">
                        <el-col :span="6">
                            <span class="name">审核状态</span>
                        </el-col>
                        <el-col :span="18">
                            <Select :selectItem="selectItem" @sel-search="selSearch" @watch-selValue="watchSelSearch"></Select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
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
                <!-- 企业ID -->
                <el-table-column
                    prop="id"
                    label="企业ID"
                    >
                </el-table-column>
                <!-- 企业名称 -->
                <el-table-column
                    prop="corpName"
                    label="企业名称"
                    width="150"
                    >
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                    prop="ctime"
                    label="创建时间"
                    width="200"
                    :formatter="ctime">
                </el-table-column>
                <!-- 审核状态 -->
                <el-table-column
                    label="审核状态">
                    <template slot-scope="scope">
                        {{corpStatus(scope.row.corpStatus)}}
                    </template>
                </el-table-column>
                <!-- 审核时间 -->
                <el-table-column
                    prop="auditTime"
                    label="审核时间"
                    width="200"
                    :formatter="auditTime">
                </el-table-column>
                <!-- 审核人 -->
                <el-table-column
                    prop="auditUser"
                    label="审核人">
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            icon="al-chakan"
                            style="background-color: #D6EAFF; border-color: #D6EAFF; color: #007BFF;"
                            @click="check(scope.$index, scope.row)">查看详情
                            <!-- 企业信息弹窗展示 -->
                            <BCompany v-if="BCompanyShow" :BCompanyItem="BCompanyItem" @down-pass="downPass" @down-noPass="downNoPass" @close-dialog="closeDialog"></BCompany>
                            <BCompanyUpdate v-if="BCompanyUpdateShow" :BCompanyItem="BCompanyItem" @down-cancel="downCancel" @close-info="closeInfo" @down-bcUpdate="downBCUpdate"></BCompanyUpdate>
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div class="page" style="margin: 20% 0 10% 0;">
                    <Page v-if="tableData.length" :totalLength="tableData.length" :pageSize="pageCount" :currentPage="currentPage" @current-page="getPage"></Page>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Input from '../Input/Input.vue';
import Select from '../Select/Select.vue';
import BCompany from '../../pages/BackOfficeSystem/views/Dialog/BCompany.vue';
import BCompanyUpdate from '../../pages/BackOfficeSystem/views/Dialog/BCompanyUpdate.vue';
import Page from '../Page/Page.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { dateChange, corpStatusChange } from '../../utils/common.js';
export default {
    name: 'saas_b_company',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            tableData: [],
            BCompanyShow: false,
            BCompanyUpdateShow: false,
            inpItem: {
                placeholder: '请输入企业名称',
                size: 'medium',
                slot: 'append',
                icon: 'el-icon-search'
            },
            BCompanyItem: {},
            selectItem: {
                placeholder: '请选择',
                size: 'medium',
                options: [
                    {
                        label: '待审核',
                        value: 1
                    },
                    {
                        label: '通过',
                        value: 2
                    },
                    {
                        label: '不通过',
                        value: 3
                    }
                ],
                btn: {
                    size: 'medium',
                    text: '查询'
                }
            },
            corpName: '',
            selStatus: ''
        }
    },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取分页
            let params = { pageNo: this.currentPage, pageSize: this.pageCount, corpName: this.corpName, corpStatus: this.selStatus };
            let BCompanyRes = await this.$api.BCompanyPagesInterface(params);
            if (BCompanyRes.code === 0) {
                //列表赋值
                this.tableData = [...BCompanyRes.data.rows];
                //总条数赋值
                this.tableData.length = BCompanyRes.data.totalRows;
            } else {
                MessageInterface(`${BCompanyRes.msg}`, 'error', 5000);
            };
        },
        //查看详情
        async check (index, row) {
            this.BCompanyItem = {...row};
            //判断显示弹窗
            if (row.corpStatus === 0 || row.corpStatus === 1) {
                this.BCompanyShow = true;
            } else if (row.corpStatus === 2 || row.corpStatus === 3) {
                this.BCompanyUpdateShow = true;
            };
        },
        //关闭查看详情 --- 通过
        downPass (data) {
            //二次弹窗
            this.$confirm('确认审核通过?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then( async () => {
                let BCompanyUpdateRes = await this.$api.BCompanyUpdateInterface(data);
                if (BCompanyUpdateRes.code === 0) {
                    MessageInterface(`通过成功`, 'success', 5000);
                    //获取分页
                    let params = { pageNo: this.currentPage, pageSize: this.pageCount, corpName: this.corpName, corpStatus: this.selStatus };
                    let BCompanyRes = await this.$api.BCompanyPagesInterface(params);
                    if (BCompanyRes.code === 0) {
                        //列表赋值
                        this.tableData = [...BCompanyRes.data.rows];
                        //总条数赋值
                        this.tableData.length = BCompanyRes.data.totalRows;
                    } else {
                        MessageInterface(`${BCompanyRes.msg}`, 'error', 5000);
                    };
                    this.BCompanyShow = false;
                } else {
                    MessageInterface(`${BCompanyUpdateRes.msg}`, 'error', 5000);
                };
            } ).catch();
        },
        //关闭查看详情 --- 不通过
        downNoPass (data) {
            //二次弹窗
            this.$confirm('确认审核不通过?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then( async () => {
                let BCompanyUpdateRes = await this.$api.BCompanyUpdateInterface(data);
                if (BCompanyUpdateRes.code === 0) {
                    MessageInterface(`不通过成功`, 'success', 5000);
                    //获取分页
                    let params = { pageNo: this.currentPage, pageSize: this.pageCount, corpName: this.corpName, corpStatus: this.selStatus };
                    let BCompanyRes = await this.$api.BCompanyPagesInterface(params);
                    if (BCompanyRes.code === 0) {
                        //列表赋值
                        this.tableData = [...BCompanyRes.data.rows];
                        //总条数赋值
                        this.tableData.length = BCompanyRes.data.totalRows;
                    } else {
                        MessageInterface(`${BCompanyRes.msg}`, 'error', 5000);
                    };
                    this.BCompanyShow = false;
                } else {
                    MessageInterface(`${BCompanyUpdateRes.msg}`, 'error', 5000);
                };
            } ).catch();
        },
        //关闭查看详情 --- 修改
        async downBCUpdate (data) {
            let BCompanyAuditRes = await this.$api.BCompanyAuditInterface(data);
            if (BCompanyAuditRes.code === 0) {
                MessageInterface(`修改成功`, 'success', 5000);
                //获取分页
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, corpName: this.corpName, corpStatus: this.selStatus };
                let BCompanyRes = await this.$api.BCompanyPagesInterface(params);
                if (BCompanyRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BCompanyRes.data.rows];
                    //总条数赋值
                    this.tableData.length = BCompanyRes.data.totalRows;
                } else {
                    MessageInterface(`${BCompanyRes.msg}`, 'error', 5000);
                };
                this.BCompanyUpdateShow = false;
            } else {
                MessageInterface(`${BCompanyAuditRes.msg}`, 'error', 5000);
            };
        },
        //关闭查看详情
        closeDialog () {
            this.BCompanyShow = false;
        },
        //关闭查看详情 --- 取消
        downCancel () {
            this.BCompanyUpdateShow = false;
        },
        //关闭查看详情
        closeInfo () {
            this.BCompanyUpdateShow = false;
        },
        //日期转换
        ctime (row, column) {
            let dateRes = dateChange(row, column);
            return dateRes;
        },
        //审核状态转换
        corpStatus (corpStatus) {
            let corpStatusRes = corpStatusChange(corpStatus);
            return corpStatusRes;
        },
        //审核时间转换
        auditTime (row, column) {
            let dateRes = dateChange(row, column);
            return dateRes;
        },
        //查询分页
        async inpSearch (data) {
            let params = {corpName: data, corpStatus: this.selStatus};
            let BCompanyPagesRes = await this.$api.BCompanyPagesInterface(params);
            if (BCompanyPagesRes.code === 0) {
                //初始化当前页面
                this.currentPage = 1;
                //列表赋值
                this.tableData = [...BCompanyPagesRes.data.rows];
                //总条数赋值
                this.tableData.length = BCompanyPagesRes.data.totalRows;
            } else {
                MessageInterface(`${BCompanyPagesRes.msg}`, 'error', 5000);
            };
        },
        //状态审核查询分页
        async selSearch (data) {
            let params = {corpStatus: data, corpName: this.corpName};
            let BCompanyPagesRes = await this.$api.BCompanyPagesInterface(params);
            if (BCompanyPagesRes.code === 0) {
                //初始化当前页面
                this.currentPage = 1;
                //列表赋值
                this.tableData = [...BCompanyPagesRes.data.rows];
                //总条数赋值
                this.tableData.length = BCompanyPagesRes.data.totalRows;
            } else {
                MessageInterface(`${BCompanyPagesRes.msg}`, 'error', 5000);
            };
        },
        //监听corpName的值
        watchInpVal (data) {
            this.corpName = data;
        },
        //监听selStatus的值
        watchSelSearch (data) {
            this.selStatus = data;
        }
    },
    components: { Input, Select, BCompany, Page, BCompanyUpdate },
    async mounted () {
        //获取分页
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BCompanyRes = await this.$api.BCompanyPagesInterface(params);
        if (BCompanyRes.code === 0) {
            //列表赋值
            this.tableData = [...BCompanyRes.data.rows];
            //总条数赋值
            this.tableData.length = BCompanyRes.data.totalRows;
        } else {
            MessageInterface(`${BCompanyRes.msg}`, 'error', 5000);
        };
    }
}
</script>

<style lang="scss" scoped>
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
