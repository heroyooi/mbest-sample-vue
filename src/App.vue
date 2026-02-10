<template>
  <main class="page">
    <header class="head">
      <h1>Vue CRUD Board</h1>
      <p>Pinia 중앙 상태관리 + API 계층 분리 + 라우터 기반 CRUD 예시</p>
      <nav class="row">
        <RouterLink to="/" class="link-btn">목록</RouterLink>
        <RouterLink to="/write" class="link-btn">글쓰기</RouterLink>
      </nav>
    </header>
    <RouterView />
  </main>
</template>
