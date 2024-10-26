<script setup lang="ts">

</script>

<template>
    <div class="board-container">
        <DrawingSideBar />
        <div class="drawing-area">
            <DrawingArea />
        </div>

    </div>
</template>

<style scoped>
.board-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
    width: 100%;
    height: 100%;
    padding: 3rem;
}

@media only screen and (max-width: 768px) {
    .board-container {
        display: flex;
        flex-direction: column-reverse;
        padding: 0rem;
        height: fit-content;
    }

    .drawing-area {
        padding: 1rem 1rem 0rem 1rem;
        width: 100%;
        height: calc(100dvh - 65px - 1rem);
    }
}
</style>
