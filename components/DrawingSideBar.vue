<script setup lang="ts">

</script>

<template>
    <div class="drawer-side-bar-container">
        <!-- TODO: Define the content of the side bar -->
    </div>

</template>

<style scoped>
.drawer-side-bar-container {
    border-radius: 1rem;
    background-color: #1e293b;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
}

@media only screen and (max-width: 768px) {
    .drawer-side-bar-container {
        height: 65px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }
}
</style>
