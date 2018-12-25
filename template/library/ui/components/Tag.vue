<template>
    <div class="tag" :class="styleClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        styleClass() {
            return `wmt_${this.type}`;
        }
    }
}
</script>


<style lang="scss" scoped>
.tag {
    display: inline-block;
    padding: 2px 8px;
    line-height: 20px;
    background-color: #409EFF;
    color:#fff;
    font-size: 12px;
    border-radius: 4px;
    margin:0 5px;

    &.wmt_waitPay {
        background-color: #fc3;
    }
    &.wmt_shipment {
        background-color: #f60;
    }
    &.wmt_success {
        background-color: #82cd58;
    }
    &.wmt_info {
        background-color: #909399;
    }
}
</style>

