<script setup>
import { computed } from 'vue';
import { useEventStore } from '@/stores/EventStore';

const store = useEventStore();

// Computed property para sa loading state
const isLoading = computed(() => store.loading);

// Function na tatawagin kapag pinindot ang refresh button
const handleRefresh = () => {
    // Tawagin ulit ang initApp para i-reload ang data
    store.initApp();
};
</script>

<template>
    <header class="py-4 mb-6 border-b border-gray-100 dark:border-gray-800">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            
            <!-- Logo / Title Section -->
            <div class="mb-4 sm:mb-0">
                <h1 class="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight flex items-center">
                    <!-- Zap Icon (Inline SVG) -->
                    <svg class="w-8 h-8 mr-2 text-indigo-500 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    Local Event Hub
                </h1>
                
                <!-- User ID Display -->
                <div class="flex items-center text-sm mt-2 text-gray-500 dark:text-gray-400">
                    User ID:
                    <span 
                        class="font-mono text-gray-700 dark:text-gray-300 ml-2 truncate max-w-xs"
                        :class="{ 'animate-pulse': isLoading }"
                        :title="store.userId"
                    >
                        <!-- Ipakita lang ang unang 12 characters + ellipsis, o 'Loading...' -->
                        {{ store.userId ? store.userId.substring(0, 12) + '...' : "Loading User..." }}
                    </span>
                </div>
            </div>

            <!-- Action Button Section -->
            <div class="flex justify-end">
                <button 
                    @click="handleRefresh"
                    :disabled="isLoading"
                    class="
                        px-4 py-2 bg-indigo-600 text-white border border-indigo-700 
                        rounded-lg shadow-lg font-semibold transition-all duration-200
                        hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98]
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                        flex items-center
                    "
                >
                    <!-- Refresh Icon (Inline SVG) -->
                    <svg class="w-5 h-5 mr-2" :class="{ 'animate-spin': isLoading }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21.5 2v6h-6"/><path d="M21.5 8a8.001 8.001 0 0 0-14.7-3.9l-2.9 2.9h6m-6 6v6h-6"/><path d="M2.5 16a8.001 8.001 0 0 0 14.7 3.9l2.9-2.9h-6"/>
                    </svg>

                    {{ isLoading ? 'Loading...' : 'Reload Events' }}
                </button>
            </div>
        </div>
    </header>
</template>