<template>
    <div class="index5">
        {{ name | nameF(10) }}
    </div>
</template>

<script>
export default {
    name: 'index5',
    data () {
        return {
            name: '  小  明 '
        }
    },
    filters: {
        nameF (data, val) {
            data = data.replace(/\s+/g, '');
            return data + val;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
