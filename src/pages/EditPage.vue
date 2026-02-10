<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import PostForm from "@/components/PostForm.vue";
import { usePostStore } from "@/stores/postStore";

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const { currentPost, loading, error } = storeToRefs(postStore);
const postId = computed(() => Number(route.params.id));
const initialValues = computed(() => ({
  title: currentPost.value?.title || "",
  content: currentPost.value?.content || ""
}));

onMounted(() => {
  postStore.loadPost(postId.value);
});

const handleSubmit = async (form) => {
  const updated = await postStore.updatePost(postId.value, form);
  if (updated?.id) {
    router.push(`/${updated.id}`);
  }
};
</script>

<template>
  <div>
    <h2>수정</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <PostForm
      :initial-values="initialValues"
      :loading="loading"
      submit-label="수정 완료"
      @submit="handleSubmit"
    />
    <p v-if="!loading && !currentPost" class="error">게시글을 찾을 수 없습니다.</p>
  </div>
</template>
