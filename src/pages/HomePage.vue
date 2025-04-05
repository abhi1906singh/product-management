<template>
    <div>
      This is my Homepage component.
  
      <p>Count: {{ counter.count }}</p>
      <button @click="counter.increment">Increment</button>
    </div>
  </template>
  
  <script setup>
  import { useCounterStore } from "../store/counterStore.js"
  
  const counter = useCounterStore()
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>
  