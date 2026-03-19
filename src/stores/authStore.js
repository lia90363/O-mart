import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    // 💡 這裡直接給初始值，不需要手動從 localStorage.getItem 抓
    const user = ref(null);
    const token = ref('');
    const isLoggedIn = computed(() => !!token.value);

    async function login(account, password) {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        if (account === 'test' && password === '1234') {
            user.value = { id: 1, name: '陛下', email: 'test@example.com' };
            token.value = 'jwt-token-abc-123';
            // 💡 這裡不需要寫 localStorage.setItem，插件會幫你存
            return { success: true };
        } else {
            throw new Error('帳號或密碼錯誤');
        }
    }

    function logout() {
        user.value = null;
        token.value = '';
        // 💡 這裡也不需要手動 removeItem
    }

    return { user, token, isLoggedIn, login, logout };
}, {
    persist: true // 👈 直接加在這裡，全存
});