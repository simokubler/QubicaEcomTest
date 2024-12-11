import { ref } from 'vue';

export const globalState = ref({
  selectedCategory: ref<string>(''),
  sorting: ref<string>('asc')
});
