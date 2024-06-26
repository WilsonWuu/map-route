	const photo = document.getElementById('croppedImage');
	const frame = document.getElementById('frame');
	const downloadButton = document.getElementById('download');
	const photoInput = document.getElementById('photo-input');
	const frameSelector = document.getElementById('frame-selector');


		// 监听用户选择相框的事件
		frameSelector.addEventListener('change', function(event) {
		  // 获取用户选择的相框文件名
		  const frameSrc = event.target.value;
		  // 将相框的src属性设置为相框图片的路径
		  frame.src = `img/${frameSrc}`;
		
		  // 当相框加载完成时执行以下代码
		  frame.onload = function() {
		    // 清空照片
		    //photo.src = "";
		
		    // 检查是否有上传的照片
		    if (frame.src){
				applyFrame();
			}
			 else{
		      const file = photoInput.files[0];
		      const reader = new FileReader();
		      reader.onload = function(event) {
		        const img = new Image();
		        img.onload = function() {
		          // 直接使用原始照片尺寸,不需要缩放
		          photo.src = event.target.result;
		          // 应用相框
		          applyFrame();
		        };
		        img.src = event.target.result;
		      };
		      reader.readAsDataURL(file);
		    }
		  };
		});
		
		// 应用相框的函数
		function applyFrame() {
			const canvas = document.createElement('canvas');
			canvas.width = 640;
			canvas.height = 640;
			const context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		  
			// 在这里不要对图片进行缩放,而是直接绘制到画布上
			context.drawImage(photo, 0, 0, photo.width, photo.height);
		  
			// 绘制相框图像
			context.drawImage(frame, 0, 0, canvas.width, canvas.height);
		  
			frame.style.display = 'none';
			// 将 canvas 转换为 DataURL 格式的图片数据
			const url = canvas.toDataURL();
			photo.src = url;
		  }

		downloadButton.addEventListener('click',function(event){
			    // 创建一个虚拟的链接元素
			    const downloadLink = document.createElement('a');
			    downloadLink.href = photo.src;
			    downloadLink.download = 'framed_photo.png';
			    // 模拟点击下载链接
			    downloadLink.click();
		})