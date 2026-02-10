<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/postStore";

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const { currentPost, loading, error } = storeToRefs(postStore);
const postId = computed(() => Number(route.params.id));

onMounted(() => {
  postStore.loadPost(postId.value);
});

const handleDelete = async () => {
  const removed = await postStore.removePost(postId.value);
  if (removed?.id) {
    router.push("/");
  }
};
</script>

<template>
  <section class="card">
    <h2>삭제 확인</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">불러오는 중...</p>

    <template v-if="!loading && currentPost">
      <p>
        <strong>{{ currentPost.title }}</strong> 게시글을 삭제하시겠습니까?
      </p>
      <div class="row">
        <button class="danger" :disabled="loading" @click="handleDelete">삭제 실행</button>
        <RouterLink :to="`/${currentPost.id}`" class="link-btn">취소</RouterLink>
      </div>
    </template>
  </section>
</template>
