<script>
//import "axios" library to consume API from backend
import axios from "axios";

//declare the backend API url
var backendAPI = "http://localhost:3000/api/product";

export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get(backendAPI)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          console.log("Error loading product list: " + err);
        });
    },
    deleteProduct(id) {
      axios
        .delete(backendAPI + "/delete/" + id)
        .then(() => {
          this.fetchProducts();
        })
        .catch((err) => {
          console.error("Error deleting product:" + err);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th colspan="5"><h3>Product List</h3></th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Category</th>
          <th>Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in data" :key="product._id">
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>
            <img :src="product.image" width="100" height="100" />
          </td>
          <td>{{ product.category.name }}</td>
          <td>
            <button
              @click="deleteProduct(product._id)"
              class="btn orange"
              onclick="return confirm('Are you sure to delete this product ?'"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

