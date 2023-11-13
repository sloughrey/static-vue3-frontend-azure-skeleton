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
    <a class="navbar-brand" href="/">Sample Vue 3 Azure Frontend</a>
  </nav>
  <h5 class="card-header text-center">Vue 3 SPA calling MS Graph API with @azure/msal-browser package</h5>
  <br>
  <div class="row" style="margin:auto">
    <div id="card-div" class="col-md-3" style="display:none">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title" id="WelcomeMessage">Please sign-in to see your profile</h5>
          <div id="profile-div"></div>
          <br>
          <br>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
<br><br>
  </main>
</template>

<style scoped>
#action-box {
  margin-bottom: 2em;
}
.action-btn {
  margin-right: 25px;
}
</style>