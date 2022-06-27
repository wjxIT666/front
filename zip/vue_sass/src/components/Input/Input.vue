<template>
    <div class="inp">
        <!-- 封装通用的Input搜索框 -->
        <el-input v-model="inpVal" :placeholder="inpItem.placeholder" :size="inpItem.size">
            <!-- 输入框后置内容 -->
            <!-- <template :slot="inpItem.slot">
                <el-button :icon="inpItem.icon" @click="btnClick(inpVal)"></el-button>
            </template> -->
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'inp',
    props: {
        inpItem: {
            default: Object
        }
    },
    data () {
        return {
            inpVal: ''
        }
    },
    methods: {
        btnClick (data) {
            this.$emit('inp-search', data);
        }
    },
    watch: {
        inpVal: {
            deep: true,
            handler: function (newVal) {
                this.$emit('watch-inpVal', newVal);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
