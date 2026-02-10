<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/postStore";

const route = useRoute();
const postStore = usePostStore();
const { currentPost, loading, error } = storeToRefs(postStore);

const postId = computed(() => Number(route.params.id));

onMounted(() => {
  postStore.loadPost(postId.value);
});
</script>

<template>
  <section class="card">
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">불러오는 중...</p>

    <template v-if="!loading && currentPost">
      <h2>{{ currentPost.title }}</h2>
      <p class="meta">
        #{{ currentPost.id }} | 생성 {{ new Date(currentPost.createdAt).toLocaleString() }} | 수정
        {{ new Date(currentPost.updatedAt).toLocaleString() }}
      </p>
      <p class="content">{{ currentPost.content }}</p>

      <div class="row">
        <RouterLink :to="`/edit/${currentPost.id}`" class="link-btn">수정</RouterLink>
        <RouterLink :to="`/delete/${currentPost.id}`" class="link-btn danger">삭제</RouterLink>
      </div>
    </template>
  </section>
</template>
