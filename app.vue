<script setup lang="ts">
import { onMounted, unMounted } from 'vue';
import { publishSubscribe } from './socket/ably-test';
import Communicator from './socket/communicator';

let communicator: Communicator;

onMounted(async () => {
  communicator = new Communicator(useRuntimeConfig().public.ablyApiKey);
});

onUnmounted(() => {
  communicator.onCloseConnection();
});

const onSendMessageClick = () => {
  console.log('onSendMessageClick');
  communicator.onSendMessageToChannel('pouet', 'Hello world' + window.navigator.userAgent);
  console.log(communicator.getMessages());
};

const onCreateRoomClick = () => {
  communicator.onCreateChannel('pouet');
};

</script>


<template>
  <div>

    <button @click="onCreateRoomClick">
      Create your room
    </button>

    <button @click="onSendMessageClick">
      Send message to ably
    </button>

    <span>
      {{ communicator?.getMessages() }}
    </span>

  </div>
</template>
