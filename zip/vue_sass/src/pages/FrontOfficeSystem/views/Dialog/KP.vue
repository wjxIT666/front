<template>
    <div class="kp">
        <!-- 快盘协议弹窗 -->
        <el-dialog title="快盘开放平台协议" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="80%" center :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeDialog" :lock-scroll="false">
            <div v-html="KPInfo"></div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'kp',
    data () {
        return {
            centerDialogVisible: true,
            KPInfo: ''
        }
    },
    methods: {
        //关闭弹窗
        closeDialog () {
            this.$emit('close-dialog');
        }
    },
    async mounted () {
        //获取协议接口
        let KPRes = await this.$api.KPInterface();
        if (KPRes.code === 0) {
            this.KPInfo = KPRes.data;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
