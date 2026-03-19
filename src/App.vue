<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-img" @click="productStore.resetSearch()">
      <img src="/O-mart01.jpg" alt="Logo" />
    </RouterLink>
    <RouterLink to="/cart" class="nav-button">
      購物車
      <span v-if="cartCount > 0" class="cart-badge">
        {{ cartCount }}
      </span>
    </RouterLink>
    <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="nav-button">登入</RouterLink>
    <div v-else class="user-menu">
      <span class="user-name">{{ authStore.user?.name }}</span>
      <button @click="handleLogout">登出</button>
    </div> 
    <div id="nav-search-target"></div>
  </nav>

  <Transition name="toast-fade">
    <div 
      v-if="toastStore.isShow" 
      class="global-toast"
      @click="toastStore.isShow = false"
    >
      {{ toastStore.message }}
    </div>
  </Transition>

  <SearchBar/> 
  <RouterView/>
</template>

<script setup>
import { computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore';
import { useToastStore } from '@/stores/useToastStore'
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const productStore = useProductStore();

const handleLogout = () => {
  const currentRoute = router.currentRoute.value;
  
  authStore.logout();

  // 如果目前的頁面需要登入才能看，登出後就跳回首頁
  if (currentRoute.meta.requiresAuth) {
    router.push('/'); 
    // 或者跳到 /login 並帶上 redirect，讓使用者登入後能回來
    // router.push({ name: 'login', query: { redirect: currentRoute.fullPath } });
  }
};

const cartStore = useCartStore()

const cartCount = computed(() => cartStore.totalItems)

const toastStore = useToastStore()
</script>