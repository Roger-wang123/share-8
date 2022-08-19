export const cdnUrl = (name: string, size = "0x0", cdn?: string) => {
  let cdnUrl = cdn;
  if (name) {
    if (name.indexOf(".gif") > -1) {
      return `${name}`;
    }
    let imageUrl = name.replace("0x0", size);
    if (
      imageUrl.indexOf("http") > -1 ||
      imageUrl.indexOf("https") > -1 ||
      imageUrl.indexOf("//cdn") > -1 ||
      imageUrl.indexOf("//gqc.cdn") > -1 ||
      imageUrl.indexOf("//uat.cdn") > -1
    ) {
      imageUrl = imageUrl.replace("http://", "//");
      imageUrl = imageUrl.replace("https://", "//");
      return `${imageUrl}`;
    }
    if (
      imageUrl.indexOf(".jpg") > -1 ||
      imageUrl.indexOf(".png") > -1 ||
      imageUrl.indexOf(".gif") > -1 ||
      imageUrl.indexOf(".jpeg") > -1 ||
      imageUrl.indexOf(".webp") > -1
    ) {
      if (imageUrl.substr(0, 1) == "/") {
        return `${cdnUrl}${imageUrl}`;
      } else {
        return `${cdnUrl}/${imageUrl}`;
      }
    }
    let imgUrl = "";
    if (imageUrl.substr(0, 1) == "/") {
      imgUrl = `${cdnUrl}${imageUrl}_${size}.webp`;
    } else {
      imgUrl = `${cdnUrl}/${imageUrl}_${size}.webp`;
    }
    return imgUrl;
  }
  return false;
};
interface imageInfo {
  url: string;
  width: any;
  height: any;
  type: string;
  ssr: boolean;
  designWidth: number;
  scale: number; // 测试用  期望图片可以根据宽度自适应高度并返回
}
export const getImageSrcAndSrcsetCDNUrl = (data: any): string => {
  if (!data.url)
    return "//cdn.yamibuy.net/statics/libraries/yamibuy/images/lazyloading.svg";
  let config: imageInfo = {
    url: "",
    width: 0,
    height: 0,
    type: "src",
    ssr: true,
    designWidth: 375,
    scale: 1,
  };

  config = <imageInfo>Object.assign(config, data);
  let sizeStr = "0x0",
    DIP = 375,
    DPR = 2; // 横向设备独立像素, 设备像素比
  if (!config.ssr) {
    DIP = window.innerWidth;
    DPR = window.devicePixelRatio;
  }

  if (config.type === "src") {
    // src应该设置为画质较低的图片 鉴于现在手机都是DPR=2起步的 所以使DPR=2 卡375*2这一档
    if (typeof config.width == "number") {
      const imgWidth = (config.width / config.designWidth) * DIP * DPR;
      sizeStr = `${Math.floor(imgWidth)}x${Math.floor(imgWidth * config.scale)}`;
    } else if (
      typeof config.width == "string" &&
      config.width.split("").pop() == "%"
    ) {
      const imgWidth =
        (config.width.substr(0, config.width.length - 1) as any) *
        0.01 *
        DIP *
        DPR;
      sizeStr = `${Math.floor(imgWidth)}x${Math.floor(imgWidth * config.scale)}`;
    }
    return cdnUrl(config.url, sizeStr) as string;
  } else {
    // srcset 取比较主流的几个分辨率
    const level = [
      { DIP: 375, DPR: 2 },
      { DIP: 375, DPR: 3 },
      { DIP: 390, DPR: 3 },
      { DIP: 428, DPR: 3 },
    ];
    let srcsetStr = "";
    level.forEach((item, index) => {
      let sizeStr = "";
      let imgWidth = 0;
      if (typeof config.width == "number") {
        imgWidth = (config.width / config.designWidth) * item.DIP * item.DPR;
        sizeStr = `${Math.floor(imgWidth)}x${Math.floor(imgWidth * config.scale)}`;
      } else if (
        typeof config.width == "string" &&
        config.width.split("").pop() == "%"
      ) {
        imgWidth =
          (config.width.substr(0, config.width.length - 1) as any) *
          0.01 *
          item.DIP *
          item.DPR;
        sizeStr = `${Math.floor(imgWidth)}x${Math.floor(imgWidth * config.scale)}`;
      }
      if (index < level.length - 1) {
        srcsetStr += `${cdnUrl(config.url, sizeStr)} ${imgWidth}w, `;
      } else {
        srcsetStr += `${cdnUrl(config.url, sizeStr)} ${imgWidth}w`;
      }
    });
    return srcsetStr;
  }
};
