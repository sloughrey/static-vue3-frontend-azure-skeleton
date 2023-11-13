<script setup lang="ts">
import { onMounted } from 'vue'
import { selectAccount, seeProfile, signIn, signOut } from '../auth/authPopup'

onMounted(() => {
  // trigger popup
  selectAccount()
})
</script>

<template>
  <main>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <h2><a class="navbar-brand" href="/">Sample Vue 3 Azure Frontend</a></h2>
    </nav>

    <h3>Vue 3 SPA calling MS Graph API with @azure/msal-browser package</h3>

    <span class="warning">NOTE: Log In only works using HTTPS or localhost</span>
    <br />
    <div class="row" style="margin: auto">
      <div id="card-div" class="col-md-3" style="display: none">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title" id="WelcomeMessage">Please sign-in to see your profile</h5>
            <div id="profile-div"></div>
            <br />
            <br />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>

    <div id="action-box">
      <button class="action-btn" @click="signIn()">Log in</button>
      <button class="action-btn" id="seeProfile" @click="seeProfile()">See User Profile</button>
      <button class="action-btn" id="signout" @click="signOut()">Log out</button>
    </div>
    <br /><br />
  </main>
</template>

<style scoped>
#action-box {
  margin-bottom: 2em;
}
.action-btn {
  margin-right: 2em;
  color: blue;
}
.warning {
  color: red;
}
</style>
