<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tab-bar{
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -2px 1px rgba(122, 122, 122,.1);
  z-index: 100;
}
</style>