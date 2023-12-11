<script setup>
//import "axios" library to consume API from backend
import axios from "axios";
</script>

<script>
var backendAPI = "http://localhost:3000/api/product";
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    axios
      .get(backendAPI)
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th colspan="4">Product List</th>
        </tr>
        <tr>
          <th>Product name</th>
          <th>Product price</th>
          <th>Product image</th>
          <th>Product category</th>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>
