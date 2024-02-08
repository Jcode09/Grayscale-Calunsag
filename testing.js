document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const originalImg = document.getElementById('original-img');
    originalImg.src = e.target.result;
    const grayscaleContainer = document.getElementById('grayscale-container');
    grayscaleContainer.style.display = 'none'; 
  };
  reader.readAsDataURL(file);
});

document.getElementById('convertBtn').addEventListener('click', function() {
  const originalImg = document.getElementById('original-img');
  const grayscaleCanvas = document.createElement('canvas');
  const ctx = grayscaleCanvas.getContext('2d');

  grayscaleCanvas.width = originalImg.width; 
  grayscaleCanvas.height = originalImg.height; 

  grayscaleCanvas.style.width = "100%";

  ctx.drawImage(originalImg, 0, 0, grayscaleCanvas.width, grayscaleCanvas.height); 
  const imageData = ctx.getImageData(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; 
    data[i + 1] = avg; 
    data[i + 2] = avg; 
  }
  ctx.putImageData(imageData, 0, 0);
  const grayscaleImg = document.getElementById('grayscale-img');
  grayscaleImg.src = grayscaleCanvas.toDataURL();
  const grayscaleContainer = document.getElementById('grayscale-container');
  grayscaleContainer.style.display = 'block';
});
