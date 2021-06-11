<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
         <transition id="q-app" name="page" mode="out-in">
         
    <router-view id="q-app3"/>
      
  </transition>
    </q-page-container>
  </q-layout>
</template>
<style>
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>