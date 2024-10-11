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
			// 这里可以根据需要动态设置画布的大小
			canvas.width = 1024;
			canvas.height = 1024;
			const context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		
			const imgAspectRatio = photo.width / photo.height;
			const canvasAspectRatio = canvas.width / canvas.height;
		
			let drawWidth, drawHeight;
		
			// 根据宽高比调整绘制的图像大小
			if (imgAspectRatio > canvasAspectRatio) {
				// 图片更宽，调整宽度
				drawWidth = canvas.width;
				drawHeight = drawWidth / imgAspectRatio;
			} else {
				// 图片更高或相等，调整高度
				drawHeight = canvas.height;
				drawWidth = drawHeight * imgAspectRatio;
			}
		
			// 计算绘制位置，使图像居中
			const drawX = (canvas.width - drawWidth) / 2;
			const drawY = (canvas.height - drawHeight) / 2;
		
			// 绘制原始图像
			context.drawImage(photo, drawX, drawY, drawWidth, drawHeight);
		
			// 绘制相框图像
			context.drawImage(frame, 0, 0, canvas.width, canvas.height);
		
			frame.style.display = 'none';
		
			// 将 canvas 转换为 DataURL 格式的图片数据
			const url = canvas.toDataURL();
			photo.src = url;
		}

		downloadButton.addEventListener('click', function(event) {
			const link = document.createElement('a');
		
			// 使用 Blob 下载
			fetch(photo.src)
				.then(res => {
					if (!res.ok) throw new Error('网络响应不正常');
					return res.blob();
				})
				.then(blob => {
					const url = window.URL.createObjectURL(blob);
					link.href = url;
					link.download = 'framed_photo.png'; // 设置文件名
					document.body.appendChild(link); // 将链接添加到文档
					link.click(); // 模拟点击
					document.body.removeChild(link); // 移除链接
					window.URL.revokeObjectURL(url); // 释放内存
				})
				.catch(err => console.error('下载失败', err));
		});
