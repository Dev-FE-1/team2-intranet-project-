/**
 * 이미지 처리하는 함수들
 */

// 사진 불러오기
export const readPhoto = async (photo) => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');

  // create img element from File object
  img.src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(photo);
  });

  await new Promise((resolve) => {
    console.log(resolve);
    img.onload = resolve;
  });

  // draw image in canvas element
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
};

export const scaleCanvas = (canvas, scale) => {
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = canvas.width * scale;
  scaledCanvas.height = canvas.height * scale;

  scaledCanvas.getContext('2d').drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

  return scaledCanvas;
};

export const optimizePhoto = async (photo, MAX_WIDTH, QUALITY) => {
  let canvas = await readPhoto(photo);

  console.log('이미지 등록되었습니다.');
  while (canvas.width >= 2 * MAX_WIDTH) {
    canvas = scaleCanvas(canvas, 0.5);
  }

  if (canvas.width > MAX_WIDTH) {
    canvas = scaleCanvas(canvas, MAX_WIDTH / canvas.width);
  }

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', QUALITY);
  });
};
