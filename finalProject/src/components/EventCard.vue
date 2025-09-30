<!-- <script setup>
import { computed } from "vue"

const { event } = defineProps({
  event: { type: Object, required: true }
})

const formattedDate = computed(() => {
  if (!event.date) return "TBD"
  try {
    return new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  } catch {
    return event.date
  }
})

const truncatedHostId = computed(() => {
  return event.hostId
    ? event.hostId.substring(0, 8) + "..."
    : "system"
})
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
    <h3 class="text-lg font-bold mb-2">
      {{ event.title || "Untitled Event" }}
    </h3>
    <p class="text-sm text-gray-500 mb-4">
      Hosted by <span class="font-mono">{{ truncatedHostId }}</span>
    </p>

    <div class="space-y-2 text-sm text-gray-700">
      <div>Date: {{ formattedDate }}</div>
      <div>Location: {{ event.location || "Unknown" }}</div>
    </div>
  </div>
</template> -->

<script setup>
import { computed } from "vue"

const { event } = defineProps({
    event: { type: Object, required: true }
})

const formattedDate = computed(() => {
    if (!event.date) return "TBD"
    try {
        // Ensure date parsing uses an ISO format date for reliability
        const dateObj = new Date(event.date);
        // Check if dateObj is valid before formatting
        if (isNaN(dateObj)) return event.date;

        return dateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    } catch {
        // Return original date string on error
        return event.date
    }
})

const truncatedHostId = computed(() => {
    // Truncate hostId for display, showing a tooltip with the full ID
    if (typeof event.hostId === 'string' && event.hostId.length > 8) {
        return event.hostId.substring(0, 8) + "..."
    }
    return event.hostId || "system"
})
</script>

<template>
    <!-- Enhanced Card Styling: white background, dark gray in dark mode, hover shadow/ring -->
    <div class="
        bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg 
        border border-gray-100 dark:border-gray-700 
        transition-all duration-300 ease-in-out 
        transform hover:shadow-2xl hover:scale-[1.02] hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-600/30
    ">
        <!-- Event Title: prominent and theme-colored -->
        <h3 class="text-xl font-extrabold mb-2 text-indigo-700 dark:text-indigo-400">
            {{ event.title || "Untitled Event" }}
        </h3>
        
        <!-- Host Information (as a themed chip) -->
        <p class="text-xs text-gray-500 mb-4 flex items-center">
            <span class="mr-2 text-gray-400 dark:text-gray-500">
                <!-- User Icon (Inline SVG) -->
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
            Hosted by 
            <span class="
                ml-1 px-2 py-0.5 text-xs font-mono 
                bg-indigo-50 dark:bg-indigo-900/50 
                text-indigo-600 dark:text-indigo-300 
                rounded-full truncate cursor-help
            " :title="event.hostId">
                {{ truncatedHostId }}
            </span>
        </p>

        <!-- Metadata (Date and Location) with Icons -->
        <div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
            
            <!-- Date -->
            <div class="flex items-center">
                <span class="mr-3 text-indigo-500">
                    <!-- Calendar Icon (Inline SVG) -->
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </span>
                <span class="font-medium">{{ formattedDate }}</span>
            </div>
            
            <!-- Location -->
            <div class="flex items-center">
                <span class="mr-3 text-indigo-500">
                    <!-- Map Pin Icon (Inline SVG) -->
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m11.314 0A8 8 0 114 8a8 8 0 0113.657 8.657z"></path></svg>
                </span>
                <span class="truncate">{{ event.location || "Unknown" }}</span>
            </div>
        </div>
    </div>
</template>
