<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDrawingStore } from '../store/DrawingStore';

const drawingArea = useTemplateRef('drawing-area-canvas')
const drawerAreaContainer = useTemplateRef('drawer-area-container')

let ctx = null;
let canvasOffsetX = 0;
let canvasOffsetY = 0;
let startX = 0
let startY = 0;
let isPainting = false;


onMounted(() => {
    ctx = drawingArea.value.getContext('2d');
    canvasOffsetX = drawerAreaContainer.value.offsetLeft;
    canvasOffsetY = drawerAreaContainer.value.offsetTop;

    // TODO: Tweak the 48 magic number to handle the mobile mode
    // 48px here the padding left and the padding bottom of the drawing area
    drawingArea.value.width = window.innerWidth - canvasOffsetX - 48;
    drawingArea.value.height = window.innerHeight - canvasOffsetY - 48;
})

const onCanvasMousedown = (event: MouseEvent) => {
    isPainting = true;
    setStrokeAttributes();
    startX = event.clientX;
    startY = event.clientY;
}

const onCanvasMouseUp = (event: MouseEvent) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
}

const draw = (event: MouseEvent) => {
    if (!isPainting) {
        return;
    }
    ctx.lineTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
    ctx.stroke();
}

const setStrokeAttributes = () => {
    // get data from the store
    const penColor = useDrawingStore().getPenColor;
    const penSize = useDrawingStore().getPenSize;

    // set the attributes to the canvas
    ctx.lineWidth = penSize;
    ctx.strokeStyle = penColor;
    ctx.lineCap = 'round';
}

</script>

<template>
    <div class="drawer-area-container" ref="drawer-area-container">
        <canvas class="drawing-area" ref="drawing-area-canvas" v-on:mousedown="onCanvasMousedown"
            v-on:mouseup="onCanvasMouseUp" v-on:mousemove="draw" @touchstart="onCanvasMousedown"
            v-on:touchcancel="onCanvasMouseUp" v-on:touchmove="draw"></canvas>
        <DrawingToolBar class="drawing-toolbar"></DrawingToolBar>
    </div>
</template>

<style scoped>
.drawer-area-container {
    position: relative;
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
    cursor: url('../assets/svg/pointer.svg'), auto;


    .drawing-area {
        background-color: #F4F8FB;
        /* background-image: url("https://static.vecteezy.com/system/resources/previews/006/884/808/non_2x/dinosaur-hand-drawn-doodle-kid-stuff-icon-free-vector.jpg"); */
        border-radius: 1rem;
        height: 100%;
        width: 100%;
        z-index: 1;
    }

    .drawing-toolbar {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media only screen and (max-width: 768px) {
    .drawer-area-container {
        .drawing-toolbar {
            top: 15px;
            bottom: auto;
            left: 15px;
            transform: none;
        }
    }
}
</style>
