<script setup lang="ts">
// import { emit } from 'vue';
import { useCommunicatorStore } from '../store/CommunicatorStore';
const emit = defineEmits(['roomCreated', 'joinRoom', 'sendMessage']);

let roomId = ref<string>('');

const onCreateRoomClick = () => {
    const randomRoomId = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000
    useCommunicatorStore().setCurrentChannel(randomRoomId.toString());
    emit('roomCreated');

    // communicator = Communicator.getInstance(useRuntimeConfig().public.ablyApiKey);
    // channel = communicator.onCreateChannel(roomId.value);
    // channel.subscribe((message) => {
    //     console.log(message.data);
    // });
};


const onJoinRoomClick = () => {
    useCommunicatorStore().setCurrentChannel(roomId.value.toString());
    emit('joinRoom');
    // communicator = Communicator.getInstance(useRuntimeConfig().public.ablyApiKey);
    // channel = communicator.onCreateChannel(roomId.value);

    // channel.subscribe((message) => {
    //     console.log(message.data);
    // });
};

const onSendMessageClick = () => {
    emit('sendMessage');
};

</script>

<template>
    <div class="drawer-side-bar-container">
        <Button label="Create your room" icon="pi pi-check" @click="onCreateRoomClick" />
        <span>or</span>
        <input type="text" placeholder="Enter room id" v-model="roomId" />
        <Button label="Join a room" icon="pi pi-check" @click="onJoinRoomClick" />

        <Button label="Send message to ably" icon="pi pi-check" @click="onSendMessageClick" />
    </div>

</template>

<style scoped>
.drawer-side-bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;
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
