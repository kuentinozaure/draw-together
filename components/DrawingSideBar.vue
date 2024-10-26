<script setup lang="ts">
import { onMounted, unMounted } from 'vue';
import Communicator from '../socket/communicator';

let communicator: ref<Communicator> | null = null;

onMounted(async () => {
});

onUnmounted(() => {
    if (communicator) {
        communicator.onCloseConnection();
    }
});

// const onSendMessageClick = () => {
//   console.log('onSendMessageClick');
//   communicator.onSendMessageToChannel('pouet', 'Hello world' + window.navigator.userAgent);
//   console.log(communicator.getMessages());
// };

const onCreateRoomClick = () => {
    const randomRoomId = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000
    console.log('Your room id is: ' + randomRoomId);
    communicator = Communicator.getInstance(useRuntimeConfig().public.ablyApiKey);
    communicator.onCreateChannel(randomRoomId);

};
</script>

<template>
    <div class="drawer-side-bar-container">
        <Button label="Create your room" icon="pi pi-check" @click="onCreateRoomClick" />

        <Button label="Send message to ably" icon="pi pi-check" @click="onSendMessageClick" />
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
