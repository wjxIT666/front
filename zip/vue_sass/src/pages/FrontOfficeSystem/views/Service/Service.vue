<template>
    <div class="service">
        <!-- 服务页面 -->
        <el-container>
            <el-header height="56px">
                <Header :headerItem="serviceItem" :showDialog="showDialog"></Header>
            </el-header>
            <el-main>
                <!-- 完善服务信息 -->
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <div class="infoText">选择服务</div>
                    </el-col>
                </el-row>
                <!-- 服务card -->
                <el-row type="flex" justify="center" :gutter="20">
                    <!-- 游戏云化 -->
                    <el-col :span="10">
                        <div @click="serviceClick">
                            <Card :entryItem="entryInfo[0]"></Card>
                        </div>
                    </el-col>
                    <!-- 游戏联运 -->
                    <el-col :span="10">
                        <Card :entryItem="entryInfo[1]"></Card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from '../../../../components/Header/Header.vue';
import Card from '../../../../components/Card/EntryCard.vue';
export default {
    name: 'service',
    data () {
        return {
            serviceItem: {
                flag: 'service'
            },
            showDialog: true,
            entryInfo: [
                {
                    image: require('../../../../images/Service.png'),
                    textTitle: '游戏云化',
                    textDesc: '获取云游戏URL、云微端'
                },
                {
                    image: require('../../../../images/Transport.png'),
                    textTitle: '游戏增长',
                    textDesc: '（暂不开放）'
                }
            ]
        }
    },
    components: { Header, Card },
    methods: {
        //选择云化服务
        serviceClick () {
            //流程跳转
            switch (this.$store.state.corpStatus) {
                case 0:
                    //未审核，跳转企业入驻页面
                    this.$router.push({ path: '/entry' });
                    break;
                case 1:
                    //待审核，跳转审核页面
                    this.$router.push({ path: '/auditEntry' });
                    break;
                case 2:
                    //审核通过，跳转列表页
                    this.$router.push({ path: '/index' });
                    break;
                case 3:
                    //审核不通过，跳转信息修改页面
                    this.$router.push({ path: '/updateEntry' });
                    break;
            };
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.service {
    min-width: 1200px;
    .el-header {
        @include headerStyle ($mainColor, 56px, $baseColor);
        @include elHeader ();
    };
    .el-main {
        background-color: #F9F9F9;
        @include elEntry ();
        .infoText {
            margin-bottom: 3%;
            font-weight: 700;
        };
    };
};
</style>
