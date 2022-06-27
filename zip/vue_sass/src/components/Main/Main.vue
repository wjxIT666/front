<template>
    <div class="main">
        <!-- 主体 -->
        <div>
            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-row type="flex" align="middle">
                        <el-col :span="24">
                            <Txt></Txt>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <slot></slot>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Txt from '../Text/Text.vue';
export default {
    components: { Txt },
    mounted () {
        let main = document.querySelector('.main');
        //根据屏幕高度,动态添加main的样式
        if (window.innerHeight <= 840) {
            main.style.padding = '4% 0';
        } else {
            main.style.padding = '10% 0';
        };
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.main {
    padding: 10% 0;
}
.el-row {
    @include elRow ();
}
</style>
