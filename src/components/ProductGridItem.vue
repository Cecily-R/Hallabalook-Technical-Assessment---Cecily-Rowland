<template>
  <div class="product-grid-item">
    <img :src="image" style="height: 300px; width: 345px" />
    <h2>{{ name }}</h2>
    <p>{{ brand }}</p>
    <p>£{{ price }}</p>
    <p>Rank : {{ rank }}</p>
    <p v-if="isAvailable">In Stock</p>
    <p v-else>Coming Soon</p>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    name: String,
    brand: String,
    price: Number,
    rank: Number,
    isAvailable: Boolean,
  },

  components: {
    name: 'ProductGridItem',
  },
};
</script>

<style>
.product-grid-item {
  background-color: white;
  border-color: #8d989e;
  border-width: 20px;
  padding: 1rem;
  height: 9 rem;
  border-width: medium;
  box-shadow: 5px 5px 5px black;
  font-family: nunito;
}
</style>
