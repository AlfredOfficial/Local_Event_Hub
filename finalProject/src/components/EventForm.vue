<script setup>
import { useEventStore } from '@/stores/EventStore';
import { computed } from 'vue';

const store = useEventStore();

// Computed property to check if all required fields are filled for simple enabling/disabling
const isFormValid = computed(() => {
    return store.newEvent.title && store.newEvent.date && store.newEvent.location;
});
</script>

<template>
    <!-- Enhanced Form Container (Card Style) -->
    <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-indigo-100 dark:border-indigo-900/50 mb-12">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3 border-gray-200 dark:border-gray-700/50 flex items-center">
            <!-- Plus Circle Icon (Inline SVG) -->
            <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Create New Event
        </h2>

        <!-- Error Message Display (Assumes the store has a 'store.error' property) -->
        <div v-if="store.error" class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-6 transition-opacity duration-300">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline ml-2">{{ store.error }}</span>
        </div>

        <form @submit.prevent="store.addEvent" class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <!-- Title Input (Spans 2 columns on medium screens and up) -->
            <div class="md:col-span-2">
                <label for="event-title" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                <input 
                    id="event-title"
                    v-model="store.newEvent.title" 
                    type="text" 
                    required
                    placeholder="E.g., Community Cleanup Day"
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
            </div>
            
            <!-- Date Input -->
            <div>
                <label for="event-date" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input 
                    id="event-date"
                    v-model="store.newEvent.date" 
                    type="date" 
                    required
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
            </div>
            
            <!-- Location Input -->
            <div>
                <label for="event-location" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input 
                    id="event-location"
                    v-model="store.newEvent.location" 
                    type="text" 
                    required
                    placeholder="E.g., Central Park"
                    class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
            </div>
            
            <!-- Submit Button Section -->
            <div class="md:col-span-4 flex justify-end pt-4">
                <button 
                    type="submit" 
                    :disabled="store.isSubmitting || !store.isReady || !isFormValid"
                    class="
                        px-8 py-3 rounded-full font-bold uppercase tracking-wider 
                        text-white bg-indigo-600 shadow-lg shadow-indigo-500/50 
                        transition-all duration-300 ease-in-out transform
                        hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01]
                        disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100
                        flex items-center justify-center
                    "
                >
                    <!-- Loading Spinner (Inline SVG) -->
                    <svg v-if="store.isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    
                    {{ store.isSubmitting ? "Adding Event..." : "Add Event" }}
                </button>
            </div>
        </form>
    </div>
</template>
