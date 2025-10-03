<script setup>
import { computed, ref } from "vue" 

const { event } = defineProps({
    event: { type: Object, required: true }
})

// NEW STATE: To hold the user's comment for this card
const userComment = ref(''); 

// NEW STATE: To control the focus/expanded state of the textarea
const isCommentFocused = ref(false); 

//emit to communicate with parent components 
const emit = defineEmits(['view-details', 'submit-comment']);

const formattedDate = computed(() => {
    if (!event.date) return "TBD"
    try {
        const dateObj = new Date(event.date);
        if (isNaN(dateObj)) return event.date;

        return dateObj.toLocaleDateString("en-US", {
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
    if (typeof event.hostId === 'string' && event.hostId.length > 8) {
        return event.hostId.substring(0, 8) + "..."
    }
    return event.hostId || "system"
})

// NEW ACTION: Function to emit the comment for saving
function submitComment() {
    if (userComment.value.trim() === '') {
        alert("Please write a review before submitting.");
        return; 
    }
    
    // Emit the event's ID and the comment text to the parent/store
    emit('submit-comment', { 
        eventId: event.id, 
        comment: userComment.value.trim() 
    });

    // Clear the input and collapse the box after submission (optimistic update)
    userComment.value = '';
    isCommentFocused.value = false;
}
</script>

<template>
    <div 
        @click="emit('view-details', event)"
        class="
            w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg 
            border border-gray-100 dark:border-gray-700 
            transition-all duration-300 ease-in-out 
            transform hover:shadow-2xl hover:scale-[1.02] hover:ring-4 hover:ring-indigo-100 dark:hover:ring-indigo-600/30
            cursor-pointer 
        "
    >
        <h3 class="text-xl font-extrabold mb-2 text-indigo-700 dark:text-indigo-400">
            {{ event.title || "Untitled Event" }}
        </h3>
        
        <p class="text-xs text-gray-500 mb-4 flex items-center">
            <span class="mr-2 text-gray-400 dark:text-gray-500">
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

        <div class="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
            <div class="flex items-center">
                <span class="mr-3 text-indigo-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </span>
                <span class="font-medium">{{ formattedDate }}</span>
            </div>
            <div class="flex items-center">
                <span class="mr-3 text-indigo-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m11.314 0A8 8 0 114 8a8 8 0 0113.657 8.657z"></path></svg>
                </span>
                <span class="truncate">{{ event.location || "Unknown" }}</span>
            </div>
        </div>

        <hr class="mt-6 mb-4 border-gray-100 dark:border-gray-700/50" />

        <!-- ⭐️ NEW SECTION: Display Saved Comment (Added this block) ⭐️ -->
        <div v-if="event.userComment" class="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <p class="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-1 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10m-9 4h4m6-4a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Your Review:
            </p>
            <p class="text-sm italic text-gray-700 dark:text-gray-200">
                "{{ event.userComment.comment }}"
            </p>
        </div>

        <div 
            class="pt-2" 
            @click.stop 
            @keydown.enter.prevent="submitComment"
        >
            <label for="comment-box" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Share your experience:
            </label>
            <textarea
                id="comment-box"
                v-model="userComment"
                @focus="isCommentFocused = true"
                @blur="isCommentFocused = false"
                :rows="isCommentFocused ? 3 : 1"
                :placeholder="'Type your review here...'"
                class="
                    w-full resize-none text-sm text-gray-700 dark:text-gray-200
                    p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                    bg-gray-50 dark:bg-gray-700 transition-all duration-200
                "
            ></textarea>
            
            <button
                v-if="userComment.length > 0 || isCommentFocused"
                @click.prevent="submitComment"
                class="
                    mt-2 px-3 py-1 text-sm font-semibold rounded-lg 
                    text-white bg-indigo-600 hover:bg-indigo-700 
                    dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors
                "
            >
                Submit Review
            </button>
        </div>
        </div>
</template>