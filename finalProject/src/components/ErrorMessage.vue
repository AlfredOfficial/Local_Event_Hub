<script setup>
import { useEventStore } from '@/stores/EventStore';

const store = useEventStore();
</script>


<template>
  <!-- 
    Gumagamit ng 'modal-fade-scale' transition. 
    Ang @click.self="dismissError" ay nagpapadismiss sa modal kapag nag-click 
    ang user sa dark backdrop (hindi sa loob ng puting box).
  -->
  <Transition name="modal-fade-scale">
    <div 
      v-if="store.error" 
      @click.self="dismissError"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
    >
      <div 
        class="w-full max-w-sm bg-white text-gray-900 rounded-3xl shadow-2xl p-8 transform transition duration-300 ease-in-out"
        role="alert"
      >
        <!-- Icon at Title Area (SweetAlert Style) -->
        <div class="flex flex-col items-center mb-6">
          <div class="p-3 bg-red-100 rounded-full mb-4">
            <!-- Large Error Icon (X-in-circle) -->
            <svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <!-- Title -->
          <h2 class="text-2xl font-extrabold text-red-700 mb-2 text-center">Oops! An Error Occurred</h2>
        </div>
        
        <!-- Error Message Content -->
        <p class="text-center text-base text-gray-700 mb-6 leading-relaxed">{{ store.error }}</p>
        
        <!-- Dismiss Button (Ang 'OK' Button) -->
        <button 
          @click="dismissError" 
          class="w-full py-3 bg-red-600 text-white font-semibold text-lg rounded-xl hover:bg-red-700 active:bg-red-800 transition shadow-lg shadow-red-500/50"
          aria-label="Dismiss Error"
        >
          OK, Got It
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Custom transition: Fade in and Scale up (Modal Pop) */

/* Initial state (before enter) and final state (after leave) */
.modal-fade-scale-enter-from,
.modal-fade-scale-leave-to {
  opacity: 0;
  /* Nagsisimula sa maliit, para mag-pop-in */
  transform: scale(0.8); 
}

/* Active transition state */
.modal-fade-scale-enter-active,
.modal-fade-scale-leave-active {
  /* Mas mabilis na transition, tipikal sa modals */
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
</style>