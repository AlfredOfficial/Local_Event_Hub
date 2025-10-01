<script setup>
import { useEventStore } from '@/stores/EventStore';
import EventCard from './EventCard.vue';
const store = useEventStore();
</script>

<template>
    <section class="mt-10 pb-10">
      
        <h2 class="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-4 border-indigo-200 dark:border-indigo-600 inline-block pr-6 tracking-tight">
            Upcoming Events ({{ store.events.length }})
        </h2>

        
        <div v-if="store.isLoading && !store.isReady" class="flex items-center justify-center p-12 bg-indigo-50 dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700">
          
            <svg class="animate-spin h-8 w-8 text-indigo-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">Loading events and connecting...</p>
        </div>

        <div v-else-if="store.sortedEvents.length > 0" class="grid grid-cols-1 gap-6">
            
            <EventCard
                v-for="event in store.sortedEvents"
                :key="event.id"
                :event="event"
            />
        </div>

        <!-- Enhanced Empty State -->
        <div v-else class="text-center p-16 bg-indigo-50 dark:bg-gray-800 rounded-xl shadow-xl border border-indigo-200 dark:border-indigo-700/50">
           
            <svg class="w-16 h-16 mx-auto text-indigo-400 mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">It's Quiet Here!</h3>
            <p class="text-gray-500 dark:text-gray-400 text-lg">No events scheduled yet. Be the first to **Add one now** above!</p>
        </div>
    </section>
</template>