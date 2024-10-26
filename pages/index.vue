<script setup lang="ts">

</script>

<template>
    <div class="board-container">
        <DrawingSideBar />
        <DrawingArea />
    </div>
</template>

<style scoped>
.board-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
    width: 100%;
    height: 100%;
}
</style>
