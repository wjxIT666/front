<template>
    <div class="name_text">
        <!-- 通用名称 -->
        <el-row type="flex" justify="center" :gutter="20">
            <!-- logo -->
            <el-col :span="10">
                <el-image style="width: 100px;" fit="fit" :src="src"></el-image>
            </el-col>
            <!-- 名称 -->
            <el-col :span="10">
                <el-row type="flex" align="middle">
                    <el-col :span="24">
                        <div class="name">快盘科技</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'name_text',
    data () {
        return {
            src: require('../../images/logo.png')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.name_text {
    margin-bottom: 8%;
    .name {
        font-size: $fontSizeExtraLarge;
        font-weight: 700;
        color: $mainColor;
    };
};

.el-row {
    @include elRow ();
};
</style>
