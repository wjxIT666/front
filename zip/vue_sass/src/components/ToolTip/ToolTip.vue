<template>
    <div class="tooltip">
        <!-- 封装通用的tooltip -->
        <el-tooltip effect="dark" :content="ToolTipText" placement="bottom">
            <slot></slot>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        ToolTipText: {
            default: String
        }
    }
}
</script>

<style lang="scss" scoped>
.tooltip {
    display: inline;
}
</style>
