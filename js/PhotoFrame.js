const photo = document.getElementById('photo');
const frame = document.getElementById('frame');
const applyButton = document.getElementById('apply');
const photoInput = document.getElementById('photo-input');
const frameSelector = document.getElementById('frame-selector');

// 监听用户选择照片的事件
photoInput.addEventListener('change', function(event) {
	// 获取用户选择的照片文件
	const file = event.target.files[0];
	// 创建一个文件读取器对象
	const reader = new FileReader();
	// 当文件读取完成时执行以下代码
	reader.onload = function(event) {
		// 将读取到的数据赋值给照片的src属性
		photo.src = event.target.result;
		// 当照片加载完成时执行以下代码
		photo.onload = function() {
			// 将相框应用到照片上
			applyFrame();
		}
	};
	// 读取文件数据
	reader.readAsDataURL(file);
});

// 监听用户选择相框的事件
frameSelector.addEventListener('change', function(event) {
	// 获取用户选择的相框文件名
	const frameSrc = event.target.value;
	// 将相框的src属性设置为相框图片的路径
	frame.src = `img/${frameSrc}`;
	// 当相框加载完成时执行以下代码
	frame.onload = function() {
		// 将相框应用到照片上
		applyFrame();
	}
});

// 应用相框的函数
function applyFrame() {
	// 创建一个canvas元素
	const canvas = document.createElement('canvas');
	// 设置canvas的大小与照片的大小相同
	canvas.width = photo.width;
	canvas.height = photo.height;
	// 获取canvas的2D上下文对象
	const context = canvas.getContext('2d');
	// 在canvas上绘制照片和相框
	context.drawImage(photo, 0, 0, canvas.width, canvas.height);
	context.drawImage(frame, 0, 0, canvas.width, canvas.height);
	// 将canvas转换为DataURL格式的图片数据
	const url = canvas.toDataURL();
	// 将照片的src属性设置为DataURL格式的图片数据
	photo.src = url;
}