<template>
  <div class="img-wrapper">
    <img
      :src="getImageSrcAndSrcsetCDNUrl({ url: mobileImgUrl, width: '100%' })"
      :srcset="
        getImageSrcAndSrcsetCDNUrl({
          url: mobileImgUrl,
          width: '100%',
          type: 'srcset',
        })
      "
    />
  </div>
</template>

<script setup lang="ts">
import { getImageSrcAndSrcsetCDNUrl } from "../utils";
import { ref } from "vue";

const mobileImgUrl = ref(
  "//cdn.yamibuy.net/mkpl/733722a7fa6f83b7a060ca1868ed6ec4_0x0.png"
);
</script>
