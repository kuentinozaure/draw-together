<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDrawingStore } from '../store/DrawingStore';
import { useCommunicatorStore } from '../store/CommunicatorStore';
import Communicator from '../socket/communicator';


const emit = defineEmits(['mouseDown', 'mouseUp', 'draw']);

const drawingArea = useTemplateRef('drawing-area-canvas')
const drawerAreaContainer = useTemplateRef('drawer-area-container')

const props = defineProps({ messages: [] });

let communicator: ref<Communicator> | null = null;
let channel: ref<any> | null = null;

watch(props, (newProps) => {
    console.log(newProps.messages)
})


let ctx = null;
let canvasOffsetX = 0;
let canvasOffsetY = 0;
let startX = 0
let startY = 0;
let isPainting = false;
let isMobile = false;


onMounted(() => {
    communicator = Communicator.getInstance(useRuntimeConfig().public.ablyApiKey);
    isMobile = window.innerWidth <= 768;
    ctx = drawingArea.value.getContext('2d');
    canvasOffsetX = drawerAreaContainer.value.offsetLeft;
    canvasOffsetY = drawerAreaContainer.value.offsetTop;

    // TODO: Tweak the 48 magic number to handle the mobile mode
    // 48px here the padding left and the padding bottom of the drawing area
    // 32px here the padding left and the padding bottom of the drawing area
    // 97px here the padding top and the padding bottom of the drawing area + the height of the sidebar 
    drawingArea.value.width = !isMobile ? window.innerWidth - canvasOffsetX - 48 : window.innerWidth - canvasOffsetX - 32;
    drawingArea.value.height = !isMobile ? window.innerHeight - canvasOffsetY - 48 : window.innerHeight - canvasOffsetY - 97;
    setStrokeAttributes()

    onJoinRoom();

})

const onJoinRoom = () => {
    const roomId = useCommunicatorStore().getCurrentChannel;
    channel = communicator.onCreateChannel(roomId);

    channel.subscribe('HELLO', (message) => {
        console.log(message.data);
    });

    channel.subscribe('DRAW', (message) => {
        // console.log(message.data);
        const { type, x, y, color, width } = message.data;
        // drawMessage.value.push(message.data);

        console.log(type)

        if (type === 'start') {
            console.log('start')

            isPainting = true;
            // setStrokeAttributes();
            startX = x;
            startY = y;
        }


        if (type === 'end') {
            console.log('tesst')

            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        }


        if (type === 'move') {
            console.log('move')
            ctx.lineTo(x - canvasOffsetX, y - canvasOffsetY);
            ctx.stroke();
        }

    });
};

const onCanvasMousedown = (event: MouseEvent | TouchEvent) => {
    const { x, y } = getCoordinates(event);

    isPainting = true;
    setStrokeAttributes();
    startX = x;
    startY = y;

    // emit('mouseDown', { x, y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'start' });

    channel.publish('DRAW', { x, y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'start' });
}

const onCanvasMouseUp = (event: MouseEvent | TouchEvent) => {
    const { x, y } = getCoordinates(event)
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    // emit('mouseUp', { x: x, y: y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'end' });
    channel.publish('DRAW', { x: x, y: y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'end' });
}

const getCoordinates = (event: MouseEvent | TouchEvent) => {
    if (event instanceof MouseEvent) {
        return { x: event.clientX, y: event.clientY };
    } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        return { x: touch.clientX, y: touch.clientY };
    }
    return { x: 0, y: 0 };
}


const draw = (event: MouseEvent) => {
    if (!isPainting) {
        return;
    }

    const { x, y } = getCoordinates(event);

    ctx.lineTo(x - canvasOffsetX, y - canvasOffsetY);
    ctx.stroke();

    // emit('draw', { x: x, y: y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'move' });
    channel.publish('DRAW', { x: x, y: y, color: ctx.strokeStyle, width: ctx.lineWidth, type: 'move' });
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
            v-on:touchend="onCanvasMouseUp" v-on:touchmove="draw"></canvas>
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
    /* touch-action: pan-x pan-y; */
    touch-action: none;


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
