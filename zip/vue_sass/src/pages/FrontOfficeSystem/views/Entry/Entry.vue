<template>
    <div class="entry">
       <!-- 入驻页面 -->
       <el-container>
            <el-header height="56px">
                <Header :headerItem="entryItem" :showDialog="showDialog"></Header>
            </el-header>
            <el-main>
                <!-- 完善入驻信息 -->
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <div class="infoText">完善入住信息</div>
                    </el-col>
                </el-row>
                <!-- 入驻card -->
                <el-row type="flex" justify="center" :gutter="20">
                    <!-- 企业入驻 -->
                    <el-col :span="10">
                        <Card :entryItem="entryInfo[0]"></Card>
                    </el-col>
                    <!-- 个人入驻 -->
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
    name: 'entry',
    data () {
        return {
            entryItem: {
                flag: 'updateentry'
            },
            showDialog: true,
            entryInfo: [
                {
                    image: require('../../../../images/Enterprise.png'),
                    textTitle: '企业入驻',
                    textDesc: '（适合企业/机构）',
                    btnFlag: true,
                    btnItem: {
                        Text: '立即入驻'
                    }
                },
                {
                    image: require('../../../../images/Personal.png'),
                    textTitle: '个人入驻',
                    textDesc: '（适合个人）',
                    btnFlag: true,
                    btnItem: {
                        Text: '等待开放'
                    }
                }
            ]
        }
    },
    components: { Header, Card }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.entry {
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
