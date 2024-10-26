<script setup lang="ts">

</script>

<template>
    <div class="drawer-area-container">
        <!-- TODO: Add the logic of drawing -->
        <DrawingToolBar class="drawing-toolbar"></DrawingToolBar>
    </div>
</template>

<style scoped>
.drawer-area-container {
    position: relative;
    border-radius: 1rem;
    /* background-color: #F4F8FB; */
    background-image: url("https://static.vecteezy.com/system/resources/previews/006/884/808/non_2x/dinosaur-hand-drawn-doodle-kid-stuff-icon-free-vector.jpg");
    width: 100%;
    height: 100%;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
    cursor: url('../assets/svg/pointer.svg'), auto;

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
