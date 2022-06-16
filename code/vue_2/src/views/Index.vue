<template>
    <div class="index">
        <div v-html="msg"></div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            msg: '<p style="color: red;">v-html模板</p>'
        }
    }
}
</script>
