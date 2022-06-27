<template>
    <div class="saas_c_android">
        <div style="margin: 1% 0;">
             <!-- 查询条件 -->
            <el-row type="flex" justify="space-between" :gutter="40" align="middle">
                <!-- 操作系统 -->
                <el-col :span="8">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="4">
                            <div class="text">日期</div>
                        </el-col>
                        <el-col :span="20">
                            <el-date-picker
                                size="medium"
                                :clearable="false"
                                v-model="H5date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                                >
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- 操作系统 -->
                <el-col :span="6">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="8">
                            <div class="text">操作系统</div>
                        </el-col>
                        <el-col :span="16">
                            <el-select v-model="operationSystem" size="medium" placeholder="请选择">
                                <el-option
                                    label="Android"
                                    value="Android"
                                    >
                                </el-option>
                                <!-- <el-option
                                    v-for="item in operationSystemOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option> -->
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- 类型 -->
                <el-col :span="6">
                    <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="6">
                            <div class="text">类型</div>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="type" size="medium" placeholder="请选择">
                                <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- 搜索下载 -->
                <el-col :span="6">
                    <el-row type="flex" justify="end" align="middle" :gutter="10">
                        <el-col :span="12">
                            <el-button class="btn" size="small" icon="el-icon-search" @click="search">搜索</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="btn" size="small" icon="el-icon-download" @click="exportOrderData()">下载</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div style="margin: 3% 0 3% 0;">
            <!-- 查询条件 -->
            <el-row type="flex" justify="space-between" :gutter="10" align="middle">
                <!-- 游戏名 -->
                <el-col :span="6">
                    <el-row type="flex" justify="space-between" align="middle" :gutter="10">
                        <el-col :span="6">
                            <div class="text">游戏名</div>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="game" size="medium" filterable placeholder="选择或者输入游戏名">
                                 <el-option 
                                    v-if="gameOptions.length != 0"
                                    label="全部"
                                    value=""
                                    >
                                </el-option>
                                <el-option
                                    v-for="item in gameOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <el-table
            id="srpgtable"
            :data="tableData.slice((currentPage - 1) * pageCount, currentPage * pageCount)"
            stripe
            :height="tableData.length == 0 ? 100 : ''"
            size="small"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- 日期 -->
                <el-table-column
                   
                    fixed
                    prop="date"
                    label="日期"
                    width="150"
                    >
                </el-table-column>
                <!-- 游戏名 -->
                <el-table-column
                    
                    fixed
                    prop="packagename"
                    label="游戏名"
                    width="150"
                    >
                </el-table-column>
                <!-- 点击试玩（原尝试连接设备） -->
                <el-table-column
                    prop="device_apply_start"
                    width="250"
                    >
                    <template slot="header">
                        <span>点击试玩</span>
                        <ToolTip :ToolTipText="'进入游戏loading页'">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 启动成功 -->
                <el-table-column
                    prop="video_start_recving"
                    width="150"
                    >
                    <template slot="header">
                        <span>启动成功</span>
                        <ToolTip :ToolTipText="'成功进入游戏界面'">
                        <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 启动成功率 -->
                <el-table-column
                    prop="cuccess_percent"
                    width="150"
                    >
                    <template slot="header">
                        <span>启动成功率</span>
                        <ToolTip :ToolTipText="'=启动成功/尝试连接设备'">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 下载点击 -->
                <el-table-column
                    prop="all_download_click"
                    width="150"
                    >
                    <template slot="header">
                        <span>下载点击</span>
                        <ToolTip :ToolTipText="ToolTipText">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 下载比率 -->
                <el-table-column
                    prop="download_click_percent"
                    width="150"
                    >
                    <template slot="header">
                        <span>下载比率</span>
                        <ToolTip :ToolTipText="'下载点击/尝试连接设备'">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 设备申请失败 -->
                <el-table-column
                    prop="device_error"
                    width="150"
                    >
                    <template slot="header">
                        <span>设备申请失败</span>
                        <ToolTip :ToolTipText="'包含设备不足及申请设备异常'">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 设备申请失败比率 -->
                <el-table-column
                    prop="device_error_percent"
                    width="200"
                    >
                    <template slot="header">
                        <span>设备申请失败比率</span>
                        <ToolTip :ToolTipText="'=设备申请失败/尝试连接设备'">
                            <i class="al-wenhao iconstyle"></i>
                        </ToolTip>
                    </template>
                </el-table-column>
                <!-- 次日留存率 -->
                <el-table-column
                    prop="stay_1"
                    label="次日留存率"
                    width="150"
                    >
                </el-table-column>
                <!-- 3日留存率 -->
                <el-table-column
                    prop="stay_3"
                    label="3日留存率"
                    width="150"
                    >
                </el-table-column>
                <!-- 7日留存率 -->
                <el-table-column
                    prop="stay_7"
                    label="7日留存率"
                    width="150"
                    >
                </el-table-column>
                <!-- 试玩平均时长（s） -->
                <el-table-column
                    prop="playtimes_ave"
                    label="试玩平均时长（s）"
                    width="150"
                    >
                </el-table-column>
                <!-- 游戏总时长（s） -->
                <el-table-column
                    prop="playtimes_a"
                    label="游戏总时长（s）"
                    width="150"
                    >
                </el-table-column>
                <!-- 小于1分钟 -->
                <el-table-column
                    prop="playtimes_1"
                    label="小于1分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 1-2分钟 -->
                <el-table-column
                    prop="playtimes1_2"
                    label="1-2分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 2-5分钟 -->
                <el-table-column
                    prop="playtimes2_5"
                    label="2-5分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 5-10分钟 -->
                <el-table-column
                    prop="playtimes5_10"
                    label="5-10分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 10-15分钟 -->
                <el-table-column
                    prop="playtimes10_15"
                    label="10-15分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 15-20分钟 -->
                <el-table-column
                    prop="playtimes15_20"
                    label="15-20分钟"
                    width="150"
                    >
                </el-table-column>
                <!-- 大于20分钟 -->
                <el-table-column
                    prop="playtimes20_"
                    label="大于20分钟"
                    width="150"
                    >
                </el-table-column>
        </el-table>
         <!-- 分页 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div class="page">
                    <Page :totalLength="tableData.length" :pageSize="pageCount" :currentPage="currentPage" @current-page="getPage"></Page>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Page from '../Page/Page.vue';
import ToolTip from '../ToolTip/ToolTip.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { dateC } from '../../utils/common.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    name: 'saas_c_url',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 50, //每页条数
            tableData: [],
            H5date: '',
            operationSystem: '',
            operationSystemOptions: [
                {
                    label: '版本1.0',
                    value: '1'
                },
                {
                    label: '版本1.1.2.47',
                    value: '1.1.2.47'
                },
                {
                    label: '版本1.1.2.48',
                    value: '1.1.2.48'
                },
                {
                    label: '版本1.1.2.49',
                    value: '1.1.2.49'
                }
            ],
            type: '',
            typeOptions: [
                {
                    label: '用户数',
                    value: 2
                },
                {
                    label: '次数',
                    value: 1
                }
            ],
            game: '',
            gameOptions: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近7天',
                    onClick(picker) {
                    const end = new Date() - 3600 * 1000 * 24 * 1;
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近14天',
                    onClick(picker) {
                    const end = new Date() - 3600 * 1000 * 24 * 1;
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                    picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近30天',
                    onClick(picker) {
                    const end = new Date() - 3600 * 1000 * 24 * 1;
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            ToolTipText: `云游戏内下载按钮点击，包含"边玩边下"和异常页面的下载按钮点击`
        }
    },
    methods: {
        //分页改动时触发
        getPage (data) {
            this.currentPage = data;
        },
        //搜索列表
        async search () {
            this.currentPage = 1;
            //获取h5试玩列表
            //开始时间
            let currentDate = this.H5date[0];
            currentDate = dateC(currentDate);
            //日期校验
            if (currentDate == 'NaN-0NaN-0NaN') {
                MessageInterface('请选择日期', 'error', 5000);
                return false;
            };
            //截至时间
            let endDate = this.H5date[1];
            endDate = dateC(endDate);
            //操作系统
            let osValue;
            if (this.operationSystem === 'Android') {
                osValue = '';
            } else {
                osValue = this.operationSystem;
            };
            //游戏名称
            let packageValue;
            if (this.game == '') {
                packageValue = 'all';
            } else {
                packageValue = this.game;
            };
            //校验类型
            if (this.type === '') {
                MessageInterface('请选择类型', 'error', 5000);
                return false;
            };
            let data = { date: currentDate, todate: endDate, package: packageValue, os: 'Android', version_min: osValue, pv: this.type };
            let DataTableH5Res = await this.$api.DataTableAndroidInterface(data);
            if (DataTableH5Res.code === 0) {
                // console.log(DataTableH5Res);
                //列表赋值
                this.tableData = [...DataTableH5Res.data];
                //总条数
                this.tableData.length = DataTableH5Res.data.length;
            } else {
                MessageInterface(`${DataTableH5Res.msg}`, 'error', 5000);
            }
        },
        //下载表格到Excel
        exportOrderData() {
            this.pageCount = this.tableData.length; //表格长度变长
            this.currentPage= 1;
            this.$nextTick(function () {
                let fix = document.querySelector('.el-table__fixed');
                let wb;
                if(fix){ //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                    wb = XLSX.utils.table_to_book(document.querySelector('#srpgtable').removeChild(fix));
                    document.querySelector('#srpgtable').appendChild(fix);
                }else{
                    wb = XLSX.utils.table_to_book(document.querySelector('#srpgtable'));
                }
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '云微端.xlsx')
                } catch (e) { 
                    if (typeof console !== 'undefined') console.log(e, wbout) 
                }
                this.pageCount = 50;//表格还原
                return wbout;
            });
        }
    },
    components: { Page, ToolTip },
    async mounted () {
        //获取游戏列表
        let data = {dataType: 'androidapp'};
        let DataTablePageRes = await this.$api.DataTablePageInterface(data);
        if (DataTablePageRes.code === 0) {
            //遍历游戏对象
            for (let item in DataTablePageRes.data) {
                //游戏数组添加值
                let gameObj = {
                    value: item,
                    label: DataTablePageRes.data[item]
                };
                this.gameOptions.push(gameObj);
            }
        }
    }   
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.saas_c_android {
    margin: 0 0 3% 0;
    .page {
        margin: 20% 0 10% 0;
    };
    .iconstyle {
        margin-left: 10px; 
        color: #ccc; 
        vertical-align: baseline;
    };
    .text {
        font-size: $fontSizeSmall;
    };
    .btn {
        background-color: $mainColor;
        color: $baseColor;
    };
    .el-date-editor /deep/ .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 240px;
    };
    //解决el-table窗口抖动问题
    .el-table{
        width:99.9% !important;
    };
    //去掉el-button的边框
    .el-button {
        border: 0;
    };
};
</style>

<style>
/* 解决el-table设置fixed，横向滚动条无法滚动的问题 */
.el-table--scrollable-x .el-table__body-wrapper {
    z-index: 1;
};
</style>
