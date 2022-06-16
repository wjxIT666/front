<template>
    <div class="index10">

    </div>
</template>

<script>
export default {
    name: 'index10',
    async mounted () {
        let result = await this.$api.getInterface();
        console.log(result);
    }
}
</script>