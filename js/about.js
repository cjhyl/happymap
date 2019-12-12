$(function(){
	leftNav.init();
	var formInitData=$('#contactUsForm').serializeArray();
	//发送信息
	$('#sendMsg').click(function(e){
		e.preventDefault();
		var eles=[$('#name'),$('#mail'),$('#phone'),$('#msg')];
		var names=['姓名','电子邮箱','手机号','消息内容']
		var isAnyWrong=false;
		for(var i=0;i<eles.length;i++){
			var tip=eles[i].next();
			if(tip.html()){
				if(!isAnyWrong){isAnyWrong=true;}
				continue;
			}
			if(eles[i].val()){
				continue;
			}
			if(!isAnyWrong){isAnyWrong=true;}
			tip.html('<span class="red2">* '+names[i]+'不能为空！</span>')
		}
		if(isAnyWrong){//表单中有未通过检测的数据
			return;
		}
		var formData=$('#contactUsForm').serializeArray();
		var objData={};
		for(var i=0;i<formData.length;i++){
			objData[formData[i].name]=formData[i].value;
		}
		console.log('objData',objData);
	});
	//重置
	$('#resetForm').click(function(e){
		e.preventDefault();
		if($(this).hasClass('gray')){
			return;
		}
		document.getElementById('contactUsForm').reset();
		$('.tip').each(function(){
			$(this).html('');
		});
		$(this).addClass('gray');
	});
	//表单change
	$('#contactUsForm').change(function(){
		var different=false;
		var nowData=$('#contactUsForm').serializeArray();
		for(var i=0;i<formInitData.length;i++){
			if(formInitData[i].value!=nowData[i].value){
				different=true;
			}
		}
		var resetBtn=$('#resetForm');
		if(different){
			resetBtn.removeClass('gray');
		}else{
			resetBtn.addClass('gray');
		}
	});
	//姓名change
	$('#name').change(function(){
		var str=$(this).val();
		var tip=$(this).next();
		if(!str){
			tip.html('');
			return;
		}
		//  /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/ 
		if(str&&tip.html()){
			tip.html('');
		}
	});
	//邮箱change
	$('#mail').change(function(){
		var str=$(this).val();
		var tip=$(this).next();
		if(!str){
			tip.html('');
			return;
		}
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (reg.test(str)) {
            tip.html('');
        } else {
            tip.html('<span class="red2">* 请输入正确的电子邮箱！</span>');
        }
	});
	//手机号change
	$('#phone').change(function(){
		var str=$(this).val();
		var tip=$(this).next();
		if(!str){
			tip.html('');
			return;
		}
		var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (reg.test(str)) {
            tip.html('');
        } else {
            tip.html('<span class="red2">* 请输入正确的手机号！</span>');
        }
	});
	//消息内容change
	$('#msg').change(function(){
		var str=$(this).val();
		var tip=$(this).next();
		if(!str){
			tip.html('');
			return;
		}
		if(str&&tip.html()){
			tip.html('');
		}
	});
});