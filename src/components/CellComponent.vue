<template>
 <div :class="'color' + number" class="cell">
    {{ number || '' }}
 </div>
</template>

<script>
export default {
    name: 'CellComponent',
    props: {
        number: {
            default: null
        },
    }
}
</script>


<style scoped>
    .cell {
        background-color: aqua;
        border-style: solid;
        border-radius: 6px;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
    }
</style>
  