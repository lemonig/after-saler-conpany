/**
 * 压缩图片
 * @param {file} 输入图片
 * @returns {Promise} resolved promise 返回压缩后的新图片
 */
export function compressImage(file) {
  return new Promise((resolve, reject) => {
    // 获取图片（加载图片是为了获取图片的宽高）
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onerror = (error) => reject(error);
    img.onload = () => {
      const canvasWidth =
        document.documentElement.clientWidth * window.devicePixelRatio;
      const canvasHeight =
        document.documentElement.clientHeight * window.devicePixelRatio;

      // 计算缩放因子
      // 这里我取水平和垂直方向缩放因子较大的作为缩放因子，这样可以保证图片内容全部可见
      const scaleX = canvasWidth / img.width;
      const scaleY = canvasHeight / img.height;
      const scale = Math.min(scaleX, scaleY);

      // 将原始图片按缩放因子缩放后，绘制到画布上
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const imageWidth = img.width * scale;
      const imageHeight = img.height * scale;
      const dx = (canvasWidth - imageWidth) / 2;
      const dy = (canvasHeight - imageHeight) / 2;
      ctx.drawImage(img, dx, dy, imageWidth, imageHeight);
      // 导出新图片
      // 指定图片 MIME 类型为 'image/jpeg', 通过 quality 控制导出的图片质量，进行实现图片的压缩
      const quality = 0.92;
      canvas.toBlob((file) => resolve(file), "image/jpeg", quality);
    };
  });
}
