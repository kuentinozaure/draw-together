import { defineStore } from "pinia";

type DrawingState = {
  penSize: number;
  penColor: string;
};

export const useDrawingStore = defineStore("DrawingStore", {
  state: () =>
    ({
      penSize: 1,
      penColor: "#000000",
    } as DrawingState),

  getters: {
    getPenSize: (state: DrawingState) => state.penSize,
    getPenColor: (state: DrawingState) => state.penColor,
  },

  actions: {
    setPenSize(penSize: number) {
      this.penSize = this.penSize + 1; // TODO Change this with a value selected by user
    },
    setPenColor(penColor: string) {
      this.penColor = penColor;
    },
  },
});
