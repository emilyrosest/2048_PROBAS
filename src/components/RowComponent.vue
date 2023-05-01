<template>
    <div class="row-container">
        <CellComponent></CellComponent>
        <CellComponent></CellComponent>
        <CellComponent></CellComponent>
        <CellComponent></CellComponent>
    </div>
</template>

<script>
import CellComponent from './CellComponent.vue';

export default {
    name: "RowComponent",
    components: { CellComponent },
}
</script>


<style scoped>
    .row-container {
        display: flex;
    }
</style>
  