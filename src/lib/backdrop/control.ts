// Shared pause state for the hero backdrop's automatic comets (the opening flight and the ambient ones).
// The pause button (in the hero) writes it; the canvas reads it. It lives for the visit only:
// nothing is stored on the visitor's device.

type Listener = (paused: boolean) => void;

let paused = false;
const listeners = new Set<Listener>();

export const backdropControl = {
  isPaused: () => paused,
  setPaused(next: boolean) {
    paused = next;
    listeners.forEach((listener) => listener(paused));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
