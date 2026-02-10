import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createPostApi,
  deletePostApi,
  fetchPostApi,
  fetchPostsApi,
  updatePostApi
} from "@/api/postApi";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]);
  const currentPost = ref(null);
  const loading = ref(false);
  const error = ref("");

  const runRequest = async (requester) => {
    loading.value = true;
    error.value = "";
    try {
      return await requester();
    } catch (requestError) {
      error.value = requestError?.message || "요청 중 오류가 발생했습니다.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const loadPosts = async () => {
    const payload = await runRequest(() => fetchPostsApi());
    if (payload?.success) {
      posts.value = payload.data;
      return payload.data;
    }
    return null;
  };

  const loadPost = async (id) => {
    const payload = await runRequest(() => fetchPostApi(id));
    if (payload?.success) {
      currentPost.value = payload.data;
      return payload.data;
    }
    currentPost.value = null;
    return null;
  };

  const createPost = async (input) => {
    const payload = await runRequest(() => createPostApi(input));
    if (payload?.success) {
      return payload.data;
    }
    return null;
  };

  const updatePost = async (id, input) => {
    const payload = await runRequest(() => updatePostApi(id, input));
    if (payload?.success) {
      currentPost.value = payload.data;
      return payload.data;
    }
    return null;
  };

  const removePost = async (id) => {
    const payload = await runRequest(() => deletePostApi(id));
    if (payload?.success) {
      return payload.data;
    }
    return null;
  };

  return {
    posts,
    currentPost,
    loading,
    error,
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    removePost
  };
});
