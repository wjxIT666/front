<template>
    <div class="index5">
        <List :listArr="listArr" @selectSchool="getSchool"></List>
    </div>
</template>

<script>
import { reactive } from 'vue';
import List from '../components/List.vue';
export default {
    name: 'index5',
    setup () {
        //listArr
        let listArr = reactive([
            {
                idno: '0001',
                name: '北大'
            },
            {
                idno: '0002',
                name: '清华'
            }
        ]);

        //getSchool
        let getSchool = (name) => {
            //父组件接收子组件的传值
            console.log('父组件接收子组件的传值', name);
        };

        return { listArr, getSchool };
    },
    components: { List }
}
</script>


