<template>
    <div class="plan_add_commit">
        <!-- 封装通用的提示弹窗 -->
        <el-dialog
            :title="dialogItem.title"
            :visible.sync="centerDialogVisible"
            :width="dialogItem.width"
            :hide-required-asterisk="true" 
            :close-on-click-modal="false" 
            :close-on-press-escape="false" 
            :append-to-body="true"
            :lock-scroll="false"
            @close="closeDialog"
            :center="dialogItem.center">
            <span>{{dialogItem.text}}</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'plan_add_commit',
    props: {
        dialogItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true
        }
    },
    methods: {
        //关闭弹窗
        closeDialog () {
            this.$emit('close-dialog');
        }
    },
    mounted () {
        // console.log(sessionStorage.getItem('Yid') + '-----');
    }
}
</script>

<style lang="scss" scoped>
</style>

<style>
.el-dialog__body {
    line-height: 26px;
    text-align: center;
    font-size: 13px;
}
</style>

