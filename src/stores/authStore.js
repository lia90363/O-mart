import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref('');
    const isLoggedIn = computed(() => !!token.value);

    async function login(account, password) {
        const response = await fetch(`/members.json?t=${new Date().getTime()}`);
        const members = await response.json();

        // 尋找匹配的成員
        const member = members.find(m => m.account === account && m.password === password);

        if (member) {
            user.value = member.data;
            token.value = `jwt-token-${member.account}-${Date.now()}`;
            return { success: true };
        } else {
            return { success: false, message: '帳號或密碼錯誤' };
        }
    }

    function logout() {
        user.value = null;
        token.value = '';
    }

    return { user, token, isLoggedIn, login, logout };
}, {
    persist: true
});