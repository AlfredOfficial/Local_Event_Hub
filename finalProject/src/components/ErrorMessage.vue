<script setup>
import { useEventStore } from '@/stores/EventStore';

const store = useEventStore();
</script>

<template>
    <div v-if="store.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
      {{ store.error }}
    </div>
</template>