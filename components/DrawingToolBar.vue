<script setup lang="ts">
import { useDrawingStore } from '../store/DrawingStore';

const onChangePenSize = () => {
    useDrawingStore().setPenSize(20);
}

const onEraserClick = () => {
    useDrawingStore().setPenColor('#F4F8FB');
}

const onChangePenColor = () => {
    useDrawingStore().setPenColor('#000000');
}




</script>

<template>
    <div class="drawer-tool-bar-container">
        <!-- TODO: Define the content of the side bar -->
        <div class="main-item" v-on:click="onChangePenSize">
            Change pen size
        </div>
        <div class="sub-item" v-on:click="onChangePenColor">
            Change pen color
        </div>
        <div class="sub-item" v-on:click="onEraserClick">
            Eraser
        </div>
        <div class="sub-item">
            Clean the board
        </div>
    </div>

</template>

<style scoped>
.drawer-tool-bar-container {
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    width: 65px;
    background: rgba(255, 255, 255, 0.2);
    transition: border-radius 0.3s ease, width 0.3s ease, opacity 0.3s ease,
        visibility 0.3s ease;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(2.5px);
    -webkit-backdrop-filter: blur(2.5px);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.18);

    .main-item {
        display: block;
    }

    .sub-item {
        display: none;
        opacity: 0;
        visibility: hidden;
    }

    &:hover {
        border-radius: 1rem;
        width: 50%;
        padding-inline: 1rem;


        .sub-item {
            display: block;
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>
