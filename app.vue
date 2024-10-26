<script setup lang="ts">
import { onMounted, unMounted } from 'vue';
import Communicator from './socket/communicator';

let communicator: Communicator;

onMounted(async () => {
  communicator = new Communicator(useRuntimeConfig().public.ablyApiKey);
});

onUnmounted(() => {
  communicator.onCloseConnection();
});

// const onSendMessageClick = () => {
//   console.log('onSendMessageClick');
//   communicator.onSendMessageToChannel('pouet', 'Hello world' + window.navigator.userAgent);
//   console.log(communicator.getMessages());
// };

// const onCreateRoomClick = () => {
//   communicator.onCreateChannel('pouet');
// };

</script>


<template>
  <!-- <div>
    <Button label="Create your room" icon="pi pi-check" @click="onCreateRoomClick" />

    <Button label="Send message to ably" icon="pi pi-check" @click="onSendMessageClick" />


    <span>
      {{ communicator?.getMessages() }}
    </span>

  </div> -->
  <div class="main-container">
    <RouterView />
  </div>

</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #0f172a;
}

.main-container {
  width: 100vw;
  height: 100vh;
}
</style>