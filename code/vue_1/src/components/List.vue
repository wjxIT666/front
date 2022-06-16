<template>
    <div class="list">
        <div v-for="item in listArr" :key="item.idno">
            <h5>{{item.name}}</h5>
            <button @click="btnClick(item.name)">选择喜欢的学校</button>
        </div>
        <!-- 具名插槽 -->
        <slot name="content">具名插槽</slot>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: {
        listArr: {
            type: Array
        }
    },
    methods: {
        btnClick (schoolName) {
            //子组件向父组件传值
            this.$emit('selectSchool', schoolName);
        }
    }
}
</script>
