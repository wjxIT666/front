<template>
    <div class="index2">
        <!-- 事件修饰符 -->
        <!-- .self 只在当前元素触发 -->
        <div class="box" @click.self="boxClick">
            <button @click="btnClickA">按钮A</button>
            <button @click="btnClickB">按钮B</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index2'
}
</script>

<style lang="scss" scoped>

</style>
