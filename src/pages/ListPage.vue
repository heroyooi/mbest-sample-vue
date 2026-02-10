<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/postStore";

const postStore = usePostStore();
const { posts, loading, error } = storeToRefs(postStore);

onMounted(() => {
  postStore.loadPosts();
});
</script>

<template>
  <section class="card">
    <div class="row between">
      <h2>게시글 목록</h2>
      <RouterLink to="/write" class="link-btn">글쓰기</RouterLink>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">불러오는 중...</p>

    <ul v-if="!loading && posts.length > 0" class="list">
      <li v-for="post in posts" :key="post.id" class="list-item">
        <RouterLink :to="`/${post.id}`" class="title-link">{{ post.title }}</RouterLink>
        <small>#{{ post.id }} | 수정 {{ new Date(post.updatedAt).toLocaleString() }}</small>
      </li>
    </ul>

    <p v-else-if="!loading">게시글이 없습니다.</p>
  </section>
</template>
