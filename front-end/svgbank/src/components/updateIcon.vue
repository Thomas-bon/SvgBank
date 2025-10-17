<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false }, // v-model
  closeOnEsc: { type: Boolean, default: true },
  closeOnBackdrop: { type: Boolean, default: true },
  panelClass: { type: String, default: "w-[80%] h-[60vh]" }, // taille par défaut
});

const emit = defineEmits(["update:modelValue", "open", "close"]);

function open() {
  emit("update:modelValue", true);
  emit("open");
}
function close() {
  emit("update:modelValue", false);
  emit("close");
}

// ESC pour fermer
function onKeydown(e) {
  if (props.closeOnEsc && e.key === "Escape") close();
}

// (optionnel) bloquer le scroll arrière-plan quand la modal est ouverte
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  },
  { immediate: true }
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

// Expose si tu veux pouvoir appeler open()/close() depuis le parent via ref
defineExpose({ open, close });
</script>

<template>
  <teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Fond -->
      <div
        class="absolute inset-0 bg-black/50"
        :class="{ 'cursor-pointer': closeOnBackdrop }"
        @click="closeOnBackdrop ? close() : null"
      />
      <!-- Fenêtre -->
      <div
        class="relative bg-white rounded-lg shadow-lg p-9 z-10 overflow-auto"
        :class="panelClass"
        @click.stop
      >
        <!-- Bouton fermer -->
        <button
          @click="close"
          aria-label="Fermer"
          class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          ✕
        </button>

        <!-- Header -->
        <header class="mb-4">
          <slot name="header">
            <h2 class="text-xl font-semibold">Titre</h2>
          </slot>
        </header>

        <!-- Contenu -->
        <section class="mb-4 ">
          <slot>
            <!-- fallback content -->
            <p class="text-gray-700">Contenu du popup…</p>
          </slot>
        </section>

        <!-- Footer -->
        <footer class="mt-6 flex gap-2 justify-end">
          <slot name="footer">
            <button class="px-3 py-2 rounded bg-gray-200" @click="close">Fermer</button>
          </slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>
