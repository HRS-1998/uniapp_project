import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGlobalOptionStore = defineStore('globalOption', () => {
	const navigationbarStyleHeight = ref(44)
	const updateHeight = (value : number) => {
		navigationbarStyleHeight.value = value
	}
	return {
		navigationbarStyleHeight,
		updateHeight
	}

})