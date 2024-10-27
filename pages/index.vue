<script setup lang="ts">
import { onMounted, unMounted } from 'vue';
import Communicator from '../socket/communicator';
import { BaseSocketPayload } from '../models/base-socket-payload';
import { useCommunicatorStore } from '../store/CommunicatorStore';

let communicator: ref<Communicator> | null = null;
let channel: ref<any> | null = null;

const onSendMessageClick = () => {
    const roomId = useCommunicatorStore().getCurrentChannel;
    console.log('Send message');
    const mathRandom = Math.random();

    const payload: BaseSocketPayload<string> = {
        date: new Date(),
        roomId: roomId,
        message: 'Hello world from' + mathRandom
    };

    communicator.onSendHelloMessage(payload);
};

onMounted(() => {
    communicator = Communicator.getInstance(useRuntimeConfig().public.ablyApiKey);
});

onUnmounted(() => {
    if (communicator) {
        communicator.onCloseConnection();
    }
});

const onJoinRoom = () => {
    const roomId = useCommunicatorStore().getCurrentChannel;
    channel = communicator.onCreateChannel(roomId);

    channel.subscribe((message) => {
        console.log(message.data);
    });
};


</script>

<template>
    <div class="board-container">
        <DrawingSideBar @joinRoom="onJoinRoom" @roomCreated="onJoinRoom" @sendMessage="onSendMessageClick" />
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
