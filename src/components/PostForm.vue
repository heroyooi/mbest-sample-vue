<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({ title: "", content: "" })
  },
  loading: {
    type: Boolean,
    default: false
  },
  submitLabel: {
    type: String,
    default: "저장"
  }
});

const emit = defineEmits(["submit"]);

const form = reactive({
  title: "",
  content: ""
});

watch(
  () => props.initialValues,
  (nextValues) => {
    form.title = nextValues?.title || "";
    form.content = nextValues?.content || "";
  },
  { immediate: true }
);

const onSubmit = () => {
  emit("submit", {
    title: form.title.trim(),
    content: form.content.trim()
  });
};
</script>

<template>
  <section class="card">
    <div class="field">
      <label for="title">제목</label>
      <input id="title" v-model="form.title" type="text" placeholder="제목을 입력하세요" />
    </div>

    <div class="field">
      <label for="content">내용</label>
      <textarea id="content" v-model="form.content" rows="8" placeholder="내용을 입력하세요" />
    </div>

    <div class="row">
      <button :disabled="loading" @click="onSubmit">{{ submitLabel }}</button>
    </div>
  </section>
</template>
