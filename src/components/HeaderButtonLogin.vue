<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const showLoginPopup = ref(false);
const username = ref<string>('');
const password = ref<string>('');
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const token = useLocalStorage<string>('authToken', '');

const login = async (): Promise<void> => {
  try {
    const payload: LoginPayload = {
      username: username.value,
      password: password.value,
    };

    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Credenziali non valide');
    }

    const data: LoginResponse = await response.json();
    token.value = data.token;
    isLoggedIn.value = true;
    showLoginPopup.value = false;
    username.value = '';
    password.value = '';
  } catch (error) {
    alert((error as Error).message);
  }
};

const logout = (): void => {
  token.value = '';
  isLoggedIn.value = false;
};
</script>

<template>
  <div>
    <div v-if="isLoggedIn">
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="showLoginPopup = true">Login</button>
    </div>

    <div v-if="showLoginPopup" class="popup">
      <div class="popup-content">
        <h2>Login</h2>
        <label>
          Username:
          <input v-model="username" type="text" />
        </label>
        <label>
          Password:
          <input v-model="password" type="password" />
        </label>
        <div class="buttons">
          <button @click="login">Login</button>
          <button @click="showLoginPopup = false">Annulla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.popup-content label {
  display: block;
  margin-bottom: 10px;
}

.popup-content input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
}

.buttons button {
  margin: 5px;
}
</style>
