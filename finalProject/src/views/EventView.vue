<script setup>
import { onMounted } from "vue"
import { useEventStore } from "../stores/EventStore"
import AppHeader from "../components/AppHeader.vue"
import EventForm from "../components/EventForm.vue"
import EventSection from "../components/EventSection.vue"
import ErrorMessage from "../components/ErrorMessage.vue"

const store = useEventStore()

onMounted(() => {
  store.initApp()
})
</script>

<template>
  <div class="p-4 sm:p-8 max-w-6xl mx-auto">

    <AppHeader />

    <ErrorMessage />

    <EventForm />

    <EventSection />
    
  </div>
</template>
