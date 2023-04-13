<template>
  <h1>Sneaker Head</h1>

  <div class="filters-container">
    <select v-model="selectedAvailability">
      <option value="" disabled selected>Availability</option>
      <option value="">All Trainers</option>
      <option :value="true">In Stock</option>
    </select>

    <select v-model="selectedOrder">
      <option value="" disabled selected>Price</option>
      <option value="ascending">Price: Low to High</option>
      <option value="descending">Price: High to Low</option>
    </select>

    <select v-model="selectedRelevence">
      <option value="" disabled selected>Relevence</option>
      <option value="highest-ranking">Highest to Lowest Ranking</option>
    </select>

    <!-- // I know this is a bit of a misnomer falling in the filter container! This is for CSS purposes. I'd definately refactor this too and find a better way of lining these up so the names are all correct and indicative of what the elements are actually doing  -->

    <div id="counter">
      <p>Results: {{ getFilteredCount() }}</p>
    </div>
  </div>

  <div id="brand-checkbox">
    <label v-for="brand in uniqueBrands" :key="brand.id">
      <input type="checkbox" v-model="selectedBrand" :value="brand" />
      {{ brand }}
    </label>
  </div>

  <div class="product-grid">
    <ProductGridItem
      v-for="shoe in filteredShoes"
      :key="shoe.id"
      :name="shoe.name"
      :brand="shoe.brand"
      :price="shoe.price"
      :isAvailable="shoe.isAvailable"
      :rank="shoe.rank"
      :image="shoe.image"
    />
  </div>
</template>

<script>
import products from './data/products.json';
import ProductGridItem from './components/ProductGridItem.vue';

components: {
  ProductGridItem;
}

export default {
  data() {
    return {
      selectedBrand: [],
      selectedAvailability: '',
      selectedOrder: '',
      selectedRelevence: '',
      products: products,
    };
  },
  methods: {
    getFilteredCount() {
      return this.filteredShoes.length;
    },
  },
  computed: {
    filteredShoes() {
      let shoes = this.products;

      if (this.selectedBrand.length != 0) {
        shoes = shoes.filter((shoe) => this.selectedBrand.includes(shoe.brand));
      }

      if (this.selectedAvailability) {
        shoes = shoes.filter(
          (product) => product.isAvailable === this.selectedAvailability
        );
      }

      if (this.selectedAvailability) {
        shoes = shoes.filter(
          (shoe) => shoe.isAvailable === this.selectedAvailability
        );
      }

      if (this.selectedOrder === 'ascending') {
        shoes.sort((a, b) => a.price - b.price);
      } else if (this.selectedOrder === 'descending') {
        shoes.sort((a, b) => b.price - a.price);
      }

      if (this.selectedRelevence) {
        shoes.sort((a, b) => b.rank - a.rank);
      }

      return shoes;
    },

    uniqueBrands() {
      return [...new Set(this.products.map((product) => product.brand))];
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: rubik pixels;
}

.product-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

@media (min-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* While the grid is responsive, the buttons are not to the same extent so this is definetly something I'd want to change */

select {
  font-family: nunito;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  padding: 10px 20px;
  width: 14%;
  max-width: 300px;
  box-sizing: border-box;
  margin-left: 2%;
  margin-bottom: 2%;
}

#counter {
  font-family: nunito;
  float: right;
  display: in-line;
  margin-right: 8%;
}

.filters-container {
  margin-left: 6%;
}
</style>
