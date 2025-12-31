import { writable } from 'svelte/store';
import { get } from 'svelte/store'
import { snackbarIndex } from '$lib/stores/snackbarIndex.js';

function createSnackbarStore() {
  const store = writable([]);
  const { subscribe, update } = store;
  return {
    store,
    subscribe,
    addMessage: (text) => {
      let newMessage = {
        id: get(snackbarIndex),
        caption: text,
      };
      update((prev) => [...prev, newMessage]);
    },
    deleteMessage: (message) => {
      update((prev) => {
        const temp = [...prev];
        let index = prev
          .map(function (obj) {
            return obj.id;
          })
          .indexOf(message.id);
        if (index !== -1) {
          temp.splice(index, 1);
        }
        return temp;
      });
    },
  };
}

export const snackbarStore = createSnackbarStore();
export const snackbarMessages = snackbarStore.store;
