<template>
  <div id="app">
    <Header></Header>
    <Container></Container>
  </div>
</template>

<script>
import Header from "./components/Header";
import Container from "./components/Container";

export default {
  name: "app",
  components: {
    Header,
    Container,
  },
};
</script>

<style>
@import "./assets/style/fonts/style.css";
body {
  margin: 0;
  padding: 0;
}
</style>
