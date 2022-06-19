<template>
    <div class="index3">
        <div>
            姓名：{{user.name}}
        </div>
        <div>
            年龄：{{user.age}}
        </div>
        <div v-if="user.sex">
            性别：{{user.sex}}
        </div>
        <div>
            <button @click="addSex">添加性别</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index3',
    data () {
        return {
            user: {
                name: '小明',
                age: 18
            }
        }
    },
    methods: {
        addSex () {
            this.$set(this.user, 'sex', '男');
        }
    }
}
</script>
