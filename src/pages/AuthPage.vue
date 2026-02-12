<script setup>
import { ref } from "vue";
import { loginApi, meApi, signupApi } from "@/api/authApi";

const mode = ref("signup");
const name = ref("");
const email = ref("");
const password = ref("");
const token = ref("");
const user = ref(null);
const loading = ref(false);
const message = ref("");

const submit = async () => {
  loading.value = true;
  message.value = "";

  try {
    const payload =
      mode.value === "signup"
        ? { name: name.value, email: email.value, password: password.value }
        : { email: email.value, password: password.value };

    const response = mode.value === "signup" ? await signupApi(payload) : await loginApi(payload);
    token.value = response.data.token;
    user.value = response.data.user;
    message.value = mode.value === "signup" ? "Sign up success" : "Login success";
  } catch (error) {
    message.value = error.message;
  } finally {
    loading.value = false;
  }
};

const fetchMe = async () => {
  if (!token.value) {
    message.value = "No token. Please login first.";
    return;
  }

  loading.value = true;
  message.value = "";

  try {
    const response = await meApi(token.value);
    user.value = response.data.user;
    message.value = "Fetched current user";
  } catch (error) {
    message.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="card">
    <div class="row between">
      <h2>Auth Demo</h2>
      <div class="row">
        <button type="button" @click="mode = 'signup'">Sign up</button>
        <button type="button" @click="mode = 'login'">Login</button>
      </div>
    </div>

    <form @submit.prevent="submit">
      <div v-if="mode === 'signup'" class="field">
        <label for="name">Name</label>
        <input id="name" v-model="name" placeholder="Name" />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="demo@sample.com" />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="1234" />
      </div>

      <div class="row">
        <button type="submit" :disabled="loading">
          {{ loading ? "Processing..." : mode === "signup" ? "Sign up" : "Login" }}
        </button>
        <button type="button" :disabled="loading || !token" @click="fetchMe">/auth/me</button>
      </div>
    </form>

    <p v-if="message" class="meta">{{ message }}</p>

    <div v-if="user" class="card">
      <h3>Current User</h3>
      <p>ID: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p class="meta">Token: {{ token }}</p>
    </div>
  </section>
</template>
