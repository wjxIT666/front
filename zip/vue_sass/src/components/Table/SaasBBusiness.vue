<template>
    <div class="saas_b_business">
        <!-- 查询 -->
        <div class="saas_b_business_search">
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <el-row type="flex" justify="end" align="middle">
                        <el-col :span="9">
                            <InputSelect :inpItem="inpItem" @inp-search="inpSearch"></InputSelect>
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
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- 设置多选 -->
                <!-- <el-table-column
                    type="selection"
                >
                </el-table-column> -->
                <!-- CP -->
                <el-table-column
                    prop="corpName"
                    width="150px"
                    label="CP"
                    >
                </el-table-column>
                <!-- 计划ID -->
                <el-table-column
                    prop="planVid"
                    width="150px"
                    label="计划ID"
                    >
                </el-table-column>
                <!-- 游戏名称 -->
                <el-table-column
                    prop="gameName"
                    width="150px"
                    label="游戏名称">
                </el-table-column>
                <!-- 计划类型 -->
                <el-table-column
                    prop="plantype"
                    width="150px"
                    label="云游戏产品形态">
                </el-table-column>
                <!-- 审核状态 -->
                <el-table-column
                    width="150px"
                    label="状态">
                    <template slot-scope="scope">
                        {{businessStatus(scope.row.approveStatus)}}
                    </template>
                </el-table-column>
                <!-- 审核时间 -->
                <el-table-column
                    prop="approveTime"
                    width="200px"
                    label="审核时间"
                    :formatter="businessTime">
                </el-table-column>
                <!-- 执行运营 -->
                <el-table-column
                    prop="uploadUser"
                    width="150px"
                    label="执行运营">
                </el-table-column>
                <!-- 商务确认人 -->
                <el-table-column
                    prop="approveUser"
                    width="150px"
                    label="商务">
                </el-table-column>
                <!-- 云游戏资源 -->
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            :disabled="scope.row.approveStatus == 3 || scope.row.approveStatus == 4 || scope.row.approveStatus == 6"
                            @click="audit(scope.$index, scope.row)">审核
                            <!-- 计划审核 -->
                            <BBusinessCheck v-if="BBusinessCheckShow" :BBusinessCheckItem="BBusinessCheckItem" @down-pass="downPass" @down-noPass="downNopass" @close-dialog="closeDialog"></BBusinessCheck>
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="planDetail(scope.$index, scope.row)">计划详情
                            <!-- 查看计划详情 -->
                            <BBusinessPlan v-if="BBusinessPlanShow" :BBusinessPlanItem="BBusinessPlanItem" @close-bplan="closeBBplan"></BBusinessPlan>
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
import InputSelect from '../Input/InputSelect.vue';
import BBusinessPlan from '../../pages/BackOfficeSystem/views/Dialog/BBusinessPlan.vue';
import BBusinessCheck from '../../pages/BackOfficeSystem/views/Dialog/BBusinessCheck.vue';
import Page from '../Page/Page.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { dateChange, businessStatusChange } from '../../utils/common.js';
export default {
    name: 'saas_b_business',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            tableData: [],
            multipleSelection: [],
            BBusinessPlanShow: false,
            BBusinessCheckShow: false,
            BBusinessCheckItem: {},
            BBusinessPlanItem: {},
            inpItem: {
                placeholder: '请输入',
                size: 'medium',
                slot: 'append',
                icon: 'el-icon-search',
                prepend: 'prepend',
                width: '110px',
                selectOption: [
                    {
                        label: 'CP',
                        value: '1'
                    },
                    {
                        label: '游戏名称',
                        value: '2'
                    }
                ]
            },
            cpName: '',
            gameName: ''
        }
    },
    components: { BBusinessPlan, InputSelect, BBusinessCheck, Page },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取列表接口
            let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
            let BProgressPageRes = await this.$api.BProgressPagesInterface(params);
            // console.log(BProgressPageRes);
            if (BProgressPageRes.code === 0) {
                //获取列表
                this.tableData = [...BProgressPageRes.data.rows];
                //总条数
                this.tableData.length = BProgressPageRes.data.totalRows;
            } else {
                MessageInterface(`${BProgressPageRes.msg}`, 'error', 5000);
            };
        },
        //审核
        audit (index, row) {
            this.BBusinessCheckShow = true;
            this.BBusinessCheckItem = {...row};
        },
        //关闭审核计划 -- 通过
        async downPass (data) {
            //调用审核接口
            let BProgressAuditRes = await this.$api.BProgressAuditInterface(data);
            if (BProgressAuditRes.code === 0) {
                MessageInterface(`审核状态修改成功`, 'success', 5000);
                //获取列表接口
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BProgressPageRes = await this.$api.BProgressPagesInterface(params);
                // console.log(BProgressPageRes);
                if (BProgressPageRes.code === 0) {
                    //获取列表
                    this.tableData = [...BProgressPageRes.data.rows];
                    //总条数
                    this.tableData.length = BProgressPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BProgressPageRes.msg}`, 'error', 5000);
                };
                this.BBusinessCheckShow = false;
            } else {
                MessageInterface(`${BProgressAuditRes.msg}`, 'error', 5000);
            };
        },
        //关闭审核计划 -- 不通过
        async downNopass (data) {
            //调用审核接口
            let BProgressAuditRes = await this.$api.BProgressAuditInterface(data);
            if (BProgressAuditRes.code === 0) {
                MessageInterface(`审核状态修改成功`, 'success', 5000);
                //获取列表接口
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BProgressPageRes = await this.$api.BProgressPagesInterface(params);
                // console.log(BProgressPageRes);
                if (BProgressPageRes.code === 0) {
                    //获取列表
                    this.tableData = [...BProgressPageRes.data.rows];
                    //总条数
                    this.tableData.length = BProgressPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BProgressPageRes.msg}`, 'error', 5000);
                };
                this.BBusinessCheckShow = false;
            } else {
                MessageInterface(`${BProgressAuditRes.msg}`, 'error', 5000);
            };
        },
        //计划详情
        planDetail (index, row) {
            this.BBusinessPlanShow = true;
            this.BBusinessPlanItem = {...row};
        },
        //关闭计划详情
        closeBBplan (index, row) {
            this.BBusinessPlanShow = false;
        },
        //表格多选
        handleSelectionChange(val) {
            // console.log(val);
            this.multipleSelection = val;
        },
        //审核状态
        businessStatus (approveStatus) {
            let businessStatusRes = businessStatusChange(approveStatus);
            return businessStatusRes;
        },
        //审核时间转换
        businessTime (row, column) {
            let dateRes = dateChange(row, column);
            return dateRes;
        },
        //查询cp/game名称
        async inpSearch (cpName, gameName) {
            this.currentPage = 1;
            //设置请求参数
            let data = {
                cpName,
                gameName
            };
            //判断cpName
            if (cpName !== undefined) {
                delete data.gameName;
            } else if (cpName === undefined) {
                delete data.cpName;
            };
            this.cpName = data.cpName;
            this.gameName = data.gameName;
            // console.log(data);
            //获取列表接口
            let BProgressPageRes = await this.$api.BProgressPagesInterface(data);
            if (BProgressPageRes.code === 0) {
                //获取列表
                this.tableData = [...BProgressPageRes.data.rows];
                //总条数
                this.tableData.length = BProgressPageRes.data.totalRows;
            } else {
                MessageInterface(`${BProgressPageRes.msg}`, 'error', 5000);
            };
        },
        //关闭弹窗
        closeDialog () {
            this.BBusinessCheckShow = false;
        }
    },
    async mounted () {
        //获取列表接口
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BProgressPageRes = await this.$api.BProgressPagesInterface(params);
        // console.log(BProgressPageRes);
        if (BProgressPageRes.code === 0) {
            //获取列表
            this.tableData = [...BProgressPageRes.data.rows];
            //总条数
            this.tableData.length = BProgressPageRes.data.totalRows;
        } else {
            MessageInterface(`${BProgressPageRes.msg}`, 'error', 5000);
        };
    }
}
</script>

<style lang="scss" scoped>
.saas_b_business {
    .saas_b_business_search {
        margin: 1% 0 3% 0;
    };
    .page {
        margin: 20% 0 10% 0;
    };
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
}
</style>
