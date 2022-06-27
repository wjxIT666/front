<template>
    <div class="form_text">
        <!-- 表单信息的label -->
        <div>
            <span class="flag">*</span>
            <span>{{formText}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'form_text',
    props: {
        formText: {
            default: String
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.form_text {
    margin-bottom: 10px;
    font-size: $fontSizeSmall;
    .flag {
        margin-right: 6px;
        color: red;
    };
};
</style>
