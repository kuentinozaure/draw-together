import { defineStore } from "pinia";

type CommunicatorState = {
  currentChannel: string | null;
};

export const useCommunicatorStore = defineStore("CommunicationStore", {
  state: () =>
    ({
      currentChannel: null,
    } as CommunicatorState),

  getters: {
    getCurrentChannel: (state: CommunicatorState) => state.currentChannel,
  },

  actions: {
    setCurrentChannel(channel: string) {
      this.currentChannel = channel;
    },
  },
});
