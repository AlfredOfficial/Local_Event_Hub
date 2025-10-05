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
  // Assuming 'title', 'date', and 'location' are still the mandatory fields.
  // The new 'description' field is optional by default.
  return store.newEvent.title && store.newEvent.date && store.newEvent.location
})
</script>

<template>
  <!-- Button to open modal -->
  <button 
    @click="openModal"
    class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-150 ease-in-out"
  >
    + New Sumbong
  </button>

  <!-- Modal Background -->
  <transition name="fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
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
            class="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl transition duration-150 ease-in-out"
          >
            &times;
          </button>

          <!-- Modal Header -->
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            Create New Sumbong
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
            
            <!-- 1. Sumbong Title / Subject (Existing `title` field) -->
            <div class="md:col-span-2">
              <label for="sumbong-title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sumbong Title / Subject</label>
              <input
                id="sumbong-title"
                v-model="store.newEvent.title"
                type="text"
                required
                maxlength="100"
                placeholder="E.g., Missing Funds sa Project D"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- ⭐️ KINI ANG BAG-ONG SECTION NGA GI-ADD PARA SA DESCRIPTION ⭐️ -->
            <div class="md:col-span-2">
              <label for="sumbong-description" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description / Reason for Sumbong</label>
              <textarea
                id="sumbong-description"
                v-model="store.newEvent.description"
                rows="4"
                placeholder="I-detalye kung unsa gyud ang nahitabo, kinsa ang involved, ug kanus-a ni nahitabo."
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              ></textarea>
            </div>
            <!-- ⭐️ KATAPUSAN SA BAG-ONG SECTION ⭐️ -->

            <!-- 3. When (Date) -->
            <div>
              <label for="event-date" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">When (Date of Incident)</label>
              <input
                id="event-date"
                v-model="store.newEvent.date"
                type="date"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <!-- 4. Location -->
            <div>
              <label for="event-location" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Where (Location of Incident)</label>
              <input
                id="event-location"
                v-model="store.newEvent.location"
                type="text"
                required
                placeholder="E.g., Barangay Hall or Address"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div class="md:col-span-2 flex justify-end pt-4">
              <button 
                type="submit" 
                :disabled="store.isSubmitting || !store.isReady || !isFormValid"
                class="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-white bg-indigo-600 shadow-lg transition duration-150 ease-in-out hover:bg-indigo-700 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <svg v-if="store.isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ store.isSubmitting ? "Adding Sumbong..." : "Submit Sumbong" }}
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
  transition: transform 0.2s cubic-bezier(0.5, 0, 0.5, 1);
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.95);
}
</style>
