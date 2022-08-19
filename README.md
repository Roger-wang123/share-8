
关于cssnano为什么不能删除重复的声明 除非声明项和值完全一致 https://github.com/cssnano/cssnano/issues/86



srcset属性可以用来指定多张图片适应不同像素密度的屏幕, 在不同屏幕下达到较好的清晰度
我们可以像这样来使用srcset,后边的xxxw时用来表示我这张图的图像像素是多少的
<img srcset="100.jpg 100w,
             200.jpg 200w,
             300.jpg 300w,
             400.jpg 400w"
     src="100.jpg">
这样一来浏览器将会根据当前img标签被设置宽度来适配不同的图片，比如如果当前img标签被设置为180px,
而当前的设备像素比为1，srcset会选一个离180px最近的单位来显示，就会选择200.jpg那张图，但是如果设备像素比
为2、3、4之类的，那就需要给独立像素乘上设备像素比才可以，比如如果是二倍屏，180*2=360，srcset会选择接近
600个图像像素的图片即 400.jpg
还有一种写法是
<img srcset="100.jpg,
             200.jpg 2x,
             300.jpg 3x,
             400.jpg 4x"
     src="100.jpg">
这种写法是用来适配不同设备像素比的，1倍屏下用 100.jpg   2倍屏下用200.jpg  以此类推

与srcset的w写法  还可以搭配size属性使用 用媒体查询来设置不同屏幕下的图片大小
<img srcset="100.jpg 100w,
             200.jpg 200w,
             300.jpg 300w,
             400.jpg 400w"
     sizes="(max-width: 200px) 100vw,
            (max-width: 300px) 50vw,
            40vw"
     src="100.jpg">
如果屏幕像素是180 小于200  那当前图片的宽度应该是100vw即180px  这个时候会选择200.jpg
如果屏幕像素是280 大于200小于300  那当前图片的宽度应该是50vw即140px  这个时候会选择100.jpg
如果屏幕像素是380 大于300  那当前图片的宽度应该是40vw即152px  这个时候会选择200.jpg
上边这些是在一倍屏下的结果 媒体查询用的是css像素 如果是二倍屏那就得给 180px*2  那就选到400.jpg


<picture> <source>
<picture>
  <source media="(max-width: 375px)" srcset="j.jpg, j-2x.jpg 2x">
  <source media="(min-width: 371px)" srcset="k.jpg, k-2x.jpg 2x">
  <img src="l.jpg">
</picture>


<picture> <source> type属性
<picture>
  <source type="image/svg+xml" srcset="yami.xml">
  <source type="image/webp" srcset="yami.webp"> 
  <img src="yami.png">
</picture>

