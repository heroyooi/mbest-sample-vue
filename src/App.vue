<template>
  <main class="page">
    <header class="head">
      <h1>Vue CRUD Board</h1>
      <p>Pinia store + API layer + router based CRUD sample</p>
      <nav class="row">
        <RouterLink to="/" class="link-btn">List</RouterLink>
        <RouterLink to="/write" class="link-btn">Write</RouterLink>
        <RouterLink to="/auth" class="link-btn">Auth Demo</RouterLink>
      </nav>
    </header>
    <RouterView />
  </main>
</template>
