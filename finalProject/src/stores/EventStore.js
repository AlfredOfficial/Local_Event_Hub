import { defineStore } from "pinia"
import { ref, reactive, computed } from "vue"

export const useEventStore = defineStore("events", () => {
  const events = ref([])
  const userId = ref(null)
  const isReady = ref(false)
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  const error = ref(null)

  const newEvent = reactive({
    title: "",
    date: "",
    location: "",
  })

  const sortedEvents = computed(() =>
    [...events.value].sort((a, b) => new Date(a.date) - new Date(b.date))
  )

  const initApp = () => {
    userId.value = "user_" + Math.random().toString(36).substring(2, 8)
    events.value = []
    isReady.value = true
    isLoading.value = false
  }

  const addEvent = () => {
    if (!userId.value) {
      error.value = "App is not ready. Please wait."
      return
    }
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      error.value = "Please fill out all fields."
      return
    }

    isSubmitting.value = true
    error.value = null

    setTimeout(() => {
      events.value.push({
        id: Date.now().toString(),
        ...newEvent,
        hostId: userId.value
      })
      newEvent.title = ""
      newEvent.date = ""
      newEvent.location = ""
      isSubmitting.value = false
    }, 500)
  }

  return {
    events,
    userId,
    isReady,
    isLoading,
    isSubmitting,
    error,
    newEvent,
    sortedEvents,
    initApp,
    addEvent,
  }
})
