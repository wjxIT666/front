<template>
    <div class="list">
        <div v-for="item in listArr" :key="item.idno">
            <h5>{{item.name}}</h5>
            <button @click="selectSchool(item.name)">选择喜欢的学校</button>
        </div>
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
    setup (_, { emit }) {
        //selectSchool
        let selectSchool = (value) => {
            //子组件给父组件传值
            emit('selectSchool', value);
        };

        return { selectSchool };
    }
}
</script>
