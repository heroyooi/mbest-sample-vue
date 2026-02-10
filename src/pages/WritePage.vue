<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import PostForm from "@/components/PostForm.vue";
import { usePostStore } from "@/stores/postStore";

const router = useRouter();
const postStore = usePostStore();
const { loading, error } = storeToRefs(postStore);

const handleSubmit = async (form) => {
  const created = await postStore.createPost(form);
  if (created?.id) {
    router.push(`/${created.id}`);
  }
};
</script>

<template>
  <div>
    <h2>글쓰기</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <PostForm :loading="loading" submit-label="작성" @submit="handleSubmit" />
  </div>
</template>
