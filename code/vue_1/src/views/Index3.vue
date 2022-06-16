<template>
    <div class="index3">
        <List :listArr="listArr" @selectSchool="getSchool">
            <!-- 具名插槽 -->
            <slot slot="content"></slot>
        </List>
    </div>
</template>

<script>
import List from '../components/List.vue';
export default {
    name: 'index3',
    data () {
        return {
            listArr: [
                {
                    idno: '0001',
                    name: '北大'
                },
                {
                    idno: '0002',
                    name: '清华'
                }
            ]
        }
    },
    components: { List },
    methods: {
        getSchool (schoolName) {
            //父组件接收子组件的传值
            console.log('父组件接收子组件的传值', schoolName);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
