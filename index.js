function updataFile(opts) {
	this.selector=document.querySelector(opts.id);
	this.file = {};
	this.file["selector"] = this.selector;
	this.init();
}
updataFile.prototype={
	init:function(){
		this.getFileInfo();//获取文件基本信息
		switch (this.file.type){
			case "text/plain":
			this.isText(this.file["selector"].files[0]);
			break;
			case "image/png":
			this.isPic(this.file["selector"].files[0]);
			break;
			case "image/jpeg":
			this.isPic(this.file["selector"].files[0]);
			break;
			default:
			this.isArrayBuffer(this.file["selector"].files[0]);
			break;
		}
	},
	isText:function(file){
		var that = this;
		var reader = new FileReader();
			reader.readAsText(file,"UTF-8");
		reader.onloadstart = function(event){
			//console.log("开始上传了");
		};
		reader.onprogress = function(event){
			//console.log("上传中...");
		};
		reader.onload = function(event){
			console.log(event)
			var data=event.target.result;
			that.callback(data);
		};
		reader.onloadend = function(event){
			//console.log("结束了");
		};
		reader.onerror = function(){
			console.log("上传出错了");
		};
		reader.onabort = function(){
			console.log("上传终止了");
		};
	},
	isPic:function(file){
		var that = this;
		var reader = new FileReader();
			reader.readAsDataURL(file,"UTF-8");//读取为base64数据
		reader.onloadstart = function(event){
			console.log("开始上传了");
		};
		reader.onprogress = function(event){
			console.log("上传中...");
		};
		reader.onload = function(event){
			var data=event.target.result;
			that.callback(data);
		};
		reader.onloadend = function(event){
			console.log("结束了");
		};
		reader.onerror = function(){
			console.log("上传出错了");
		};
		reader.onabort = function(){
			console.log("上传终止了");
		};
	},
	isArrayBuffer:function(file){
		var that = this;
		var reader = new FileReader();
			reader.readAsArrayBuffer(file,"UTF-8");
		reader.onloadstart = function(event){
			//console.log("开始上传了");
		};
		reader.onprogress = function(event){
			//console.log("上传中...");
		};
		reader.onload = function(event){
			//console.log(event)
			var data=event.target.result;
			that.callback(data);
		};
		reader.onloadend = function(event){
			//console.log("结束了");
		};
		reader.onerror = function(){
			console.log("上传出错了");
		};
		reader.onabort = function(){
			console.log("上传终止了");
		};
	},
	getFileInfo:function(file){
		this.file["type"] = this.file["selector"].files[0].type;
		this.file["name"] = this.file["selector"].files[0].name;
		this.file["size"] = this.file["selector"].files[0].size;
		this.file["lastModified"] = this.file["selector"].files[0].lastModified;
		this.file["lastModifiedDate"] = this.file["selector"].files[0].lastModifiedDate;
		this.file["webkitRelativePath"] = this.file["selector"].files[0].webkitRelativePath;
		console.dir(this.file);
	},
	callback:function(data){
		console.dir(data);
		function handleArrayBuffer(data){
			//arraybuffer是只读的
			//通过DataView
			var dv = new DataView(data,0);
			//console.dir(dv.getInt8(0))
		}
		function returnString(data){
			//返回二进制数据,
			//通过ArrayBufferView
			var uInt8Array = new Uint8Array(data);
			var str = "";
			for(var i = 0, len = uInt8Array.length; i < len; i++) {
			    str += uInt8Array[i] + "";
			}
			console.log(str);
		}
		function returnBlob(data){
			//包装为blob对象
			var blob = new Blob([data],{"type":this.file.type});
			var url  = URL.createObjectURL(blob);
		}
	}

}