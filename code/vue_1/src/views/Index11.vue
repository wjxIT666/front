<template>
    <div class="index11">
        <div class="box" @click="boxClick">
            <!-- 阻止事件冒泡 -->
            <button @click.stop="btnClick">按钮A</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index11',
    methods: {
        boxClick () {
            alert('盒子');
        },
        btnClick () {
            alert('按钮');
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
</style>
