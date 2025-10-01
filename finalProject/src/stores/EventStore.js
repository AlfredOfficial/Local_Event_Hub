import { defineStore } from "pinia"
import { ref, reactive, computed } from "vue"

// --- BAGONG CODE: API Endpoint Definition ---
// I-define ang API endpoint kung saan tumatakbo ang JSON Server
// Siguraduhin na tumatakbo ang json-server --watch db.json --port 3000
const API_URL = 'http://localhost:3000/events';
// -------------------------------------------

export const useEventStore = defineStore("events", () => {
    // --- STATE ---
    const events = ref([])
    const userId = ref(null)
    const isReady = ref(false)
    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const error = ref(null)

    const newEvent = reactive({
        title: "",
        date: "",
        location: "",
    })

    // --- GETTERS ---
    // Sinasagot ang events by date, from earliest to latest
    const sortedEvents = computed(() =>
        [...events.value].sort((a, b) => new Date(b.date) - new Date(a.date))
    )

    // --- ACTIONS ---

    /**
     * I-fetch ang lahat ng events mula sa API at i-set ang initial state.
     * --- BINAGO: Naging ASYNC function na may FETCH logic ---
     */
    async function initApp() {
        if (!isLoading.value) return; // Iwasan ang duplicate calls

        // Gumawa ng mock user ID (dapat galing ito sa Firebase/Auth sa real app)
        userId.value = "user_" + Math.random().toString(36).substring(2, 8).toUpperCase();
        isLoading.value = true;
        error.value = null;

        try {
            // --- BAGONG CODE: Fetch data from API ---
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.statusText}`);
            }

            const data = await response.json();

            // I-set ang events array mula sa data ng server
            events.value = data;
            // -------------------------------------------
            isReady.value = true;

        } catch (err) {
            console.error("API Fetch Error:", err);
            error.value = `Error loading events. Please check if your JSON Server is running on port 3000.`;
            isReady.value = false;
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Mag-POST ng bagong event sa API endpoint.
     * --- BINAGO: Naging ASYNC function na may POST logic ---
     */
    async function addEvent() {
        if (!userId.value) {
            error.value = "User ID not available.";
            return;
        }
        if (!newEvent.title || !newEvent.date || !newEvent.location) {
            error.value = "Please fill out all fields.";
            return;
        }

        isSubmitting.value = true
        error.value = null

        const eventData = {
            ...newEvent,
            hostId: userId.value, // Ilagay ang host ID
        };

        try {
            // --- BAGONG CODE: POST data to API ---
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error(`Failed to add event: ${response.statusText}`);
            }

            // Aasahan na ibabalik ng JSON Server ang object kasama ang 'id'
            const addedEvent = await response.json(); 
            // -------------------------------------------

            // I-update ang local state
            events.value.push(addedEvent); 

            // I-clear ang form
            newEvent.title = "";
            newEvent.date = "";
            newEvent.location = "";

        } catch (err) {
            console.error("API Post Error:", err);
            error.value = `Error saving event: ${err.message}`;
        } finally {
            isSubmitting.value = false
        }
    }

    /**
     * Delete an event from the API and local state.
     * --- BAGONG FUNCTION: Delete Logic ---
     */
    async function deleteEvent(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.statusText}`);
            }

            // I-update ang local state para tanggalin ang event
            events.value = events.value.filter(e => e.id !== id);

        } catch (err) {
            console.error("API Delete Error:", err);
            error.value = `Error deleting event: ${err.message}`;
        }
    }
    // -------------------------------------------

    return {
        events,
        userId,
        isReady,
        isLoading,
        isSubmitting,
        error,
        newEvent,
        sortedEvents,
        initApp,
        addEvent,
        deleteEvent, // BINAGO: Idinagdag sa return
    }
})
