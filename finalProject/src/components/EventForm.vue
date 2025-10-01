<script setup>
import { useEventStore } from '@/stores/EventStore'
import { computed, ref } from 'vue'

const store = useEventStore()
const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}
function closeModal() {
  isOpen.value = false
}

const isFormValid = computed(() => {
  return store.newEvent.title && store.newEvent.date && store.newEvent.location
})
</script>

<template>
  <!-- Button to open modal -->
  <button 
    @click="openModal"
    class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
  >
    + New Event
  </button>

  <!-- Modal Background -->
  <transition name="fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <!-- Modal Dialog -->
      <transition name="scale">
        <div 
          v-if="isOpen" 
          class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-8 relative"
        >
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
          >
            &times;
          </button>

          <!-- Modal Header -->
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            Create New Event
          </h2>

          <!-- Error Message -->
          <div 
            v-if="store.error" 
            class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6"
          >
            <strong class="font-bold">Error:</strong>
            <span class="ml-2">{{ store.error }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="store.addEvent" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label for="event-title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
              <input
                id="event-title"
                v-model="store.newEvent.title"
                type="text"
                required
                placeholder="E.g., Community Cleanup Day"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label for="event-date" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
              <input
                id="event-date"
                v-model="store.newEvent.date"
                type="date"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label for="event-location" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input
                id="event-location"
                v-model="store.newEvent.location"
                type="text"
                required
                placeholder="E.g., Central Park"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div class="md:col-span-2 flex justify-end pt-4">
              <button 
                type="submit" 
                :disabled="store.isSubmitting || !store.isReady || !isFormValid"
                class="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 disabled:bg-gray-400"
              >
                <svg v-if="store.isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ store.isSubmitting ? "Adding Event..." : "Add Event" }}
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.scale-enter-active, .scale-leave-active {
  transition: transform 0.2s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.95);
}
</style>
