import express from "express";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { getImageSrcAndSrcsetCDNUrl } from "../utils";

const server = express();

server.get("/", (req, res) => {
  const app = createSSRApp({
    data: () => ({
      mobileImgUrl:
        "//cdn.yamibuy.net/mkpl/733722a7fa6f83b7a060ca1868ed6ec4_0x0.png",
    }),
    methods: {
      getImageSrcAndSrcsetCDNUrl,
    },
    template: `
    <div class="img-wrapper">
      <img
        :src="getImageSrcAndSrcsetCDNUrl({ url: mobileImgUrl, width: '100%', scale: 0.563 })"
        :srcset="
          getImageSrcAndSrcsetCDNUrl({
            url: mobileImgUrl,
            width: '100%',
            type: 'srcset',
            scale: 0.563
          })
        "
      />
    </div>`,
  });

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>srcset_ssr演示</title>
      </head>
      <style>
        *{
          margin: 0;
          padding: 0;
        }
        .img-wrapper, img {
          width: 100%;
        }
      </style>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000 ready~");
});
