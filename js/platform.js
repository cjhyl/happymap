
$(function(){
	
	//树组件配置属性
	var zSetting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			showIcon:false,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: ""
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("platformTree");
				var selectNode = zTree.getSelectedNodes();
				if(selectNode[0]===treeNode){return;}//点击已经选中的，返回不做处理
				
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					return false;
				} else {
					console.log('tree click',treeNode);
					if(baseHtmlCode[treeNode.id]){
						updateIframe(baseHtmlCode[treeNode.id]);
					}else{
						updateIframe(baseHtmlCode.writingHtml);
					}
					setHelpDialogVisible(false);
					if($('#oper_list').css('display')!='none'){
						setTreeListVisible(false);
					}
					return true;
				}
			}
		}
	};
	//树组件数据
	var zNodes =[
		{id:1, pId:0, name:"地图显示", open:true},
		{id:101, pId:1, name:"基础地图显示", file:""},
		{id:102, pId:1, name:"地图初始化设置", file:""},
		{id:103, pId:1, name:"主题切换", file:""},
		{id:104, pId:1, name:"地图操作", file:""},
		{id:105, pId:1, name:"楼层显示控制", file:""},
		{id:106, pId:1, name:"图屏显示控制", file:""},
		{id:107, pId:1, name:"2D/3D切换", file:""},
		{id:108, pId:1, name:"坐标切换", file:""},
	
		{id:2, pId:0, name:"控件", open:false},
		{id:201, pId:2, name:"指南针", file:""},
	
		{id:3, pId:0, name:"覆盖物", open:false},
		{id:301, pId:3, name:"Loading", file:""},
		{id:302, pId:3, name:"额外信息展示", file:""},
	
		{id:4, pId:0, name:"事件", open:false},
		{id:401, pId:4, name:"初始化完成事件", file:""},
		{id:402, pId:4, name:"实体选中事件", file:""},
	
		{id:5, pId:0, name:"搜索", open:false},
		{id:501, pId:5, name:"搜索", file:""},
	
		{id:6, pId:0, name:"路径规划", open:false},
		{id:601, pId:6, name:"路径规划", file:""},
		
		{id:7, pId:0, name:"导航", open:false},
		{id:701, pId:7, name:"模拟导航", file:""},
	];
	//树组件初始化
	var tree = $(".treeBg");
	var treeObj=$.fn.zTree.init(tree, zSetting, zNodes);
	var node = treeObj.getNodeByParam("id", "101");
	treeObj.selectNode(node);
	
	
	//code组件初始化
	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,     // 显示行数
        indentUnit: 4,         // 缩进单位为4
        styleActiveLine: true, // 当前行背景高亮
        matchBrackets: true,   // 括号匹配
        mode: 'htmlmixed',     // HMTL混合模式
        lineWrapping: true,    // 自动换行
        theme: 'monokai',      // 使用monokai模版
    });
    editor.setOption("extraKeys", {
        // Tab键换成4个空格
        Tab: function(cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        },
        // F11键切换全屏
        /*"F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },*/
        // Esc键退出全屏
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")){
            	cm.setOption("fullScreen", false);
            	$('#oper_full').removeClass('fulled').addClass('full').html('全屏');
            }
        }
    });
    //"列表"按钮
    $('#oper_list').on('click',function(){
    	var treeBg=$('#platformTree');
    	setTreeListVisible(treeBg.css('display')=='none');
    });
    //"运行"按钮
    $('#oper_run').on('click',function(){
    	var data = editor.getValue();
    	updateIframe();//更新iframe
    });
    //"刷新"按钮
    $('#oper_refresh').on('click',function(){
    	var selectNode = treeObj.getSelectedNodes();
    	var selId = selectNode[0].id;
    	updateIframe(baseHtmlCode[selId]);//更新iframe
    });
    //"全屏"和"取消全屏"按钮
    $('#oper_full').on('click',function(){
    	var isFull=editor.getOption("fullScreen");
    	if(isFull){
    		$(this).removeClass('fulled').addClass('full').html('全屏');
    	}else{
    		$(this).removeClass('full').addClass('fulled').html('退出全屏');
    	}
    	editor.setOption("fullScreen", !isFull);
    });
    //"帮助"按钮
    /*$('#oper_help').on('click',function(){
    	var selectNode = treeObj.getSelectedNodes();
    	var selId = selectNode[0].id;
    	var helpData = helpCodes[selId]?helpCodes[selId]:helpCodes[0];
    	$('.helpDialog .title').html(helpData.title);
    	$('.helpDialog .content').html(helpData.content);
    	setHelpDialogVisible(true);
    	if(helpData==helpCodes[0]){
    		setTimeout(function(){
    			setHelpDialogVisible(false);
    		},1500)
    	}
    });
    //帮助弹窗拖拽
    $('.helpDialog .top').get(0).onmousedown=function(e){
    	eleDrag(this.parentNode,e);
    }
    //帮助弹窗关闭
    $('.helpDialog .close').on('click',function(){
    	setHelpDialogVisible(false);
    });*/
    //"切换风格"下拉框
    $('#oper_change').on('change',function(){
    	var value=$(this).val();
    	var codeDiv=$('#codeDiv');
    	var codeCss=$('#codemirrorcss')
    	
    	if(value=='default'){
    		codeCss.attr('href','');
    	}else{
    		codeCss.attr('href','./codemirror/theme/'+value+'.css');
    	}
    	
    	codeDiv.attr('class','code CodeMirror cm-s-'+value);
    });
    //编辑器收缩开关
    $('#codeVisible').on('click',function(){
    	var status=$(this).attr('data-status');
    	var top=$(this).parent().next();
    	var code=top.next();
    	var codeBg=code.parent();
    	var fr=codeBg.next()
    	if(status=='open'){
    		codeBg.width(0);
    		fr.width(1022);
    		top.hide();
    		code.hide();
    		$(this).attr('data-status','close');
    		$(this).html('<span>〉</span>');
    		updateIframe();//目前的地图似乎没有处理过屏幕变化时的地图变更，所以这里更新iframe
    	}else{
    		codeBg.width(314);
    		fr.width(708);
    		top.show();
    		code.show();
    		$(this).attr('data-status','open');
    		$(this).html('<span style="position:relative;left:-7px;">〈</span>');
    		updateIframe();//目前的地图似乎没有处理过屏幕变化时的地图变更，所以这里更新iframe
    	}
    });
    
    updateIframe(baseHtmlCode["101"]);//初始化时默认选中的数据
    
    //更新iframe
    function updateIframe(code) {
		if(code){editor.setValue(code);}//若有code值传入，则把传入的code值写入编辑器
		var text = editor.getValue();//获取编辑器的code
		var patternHtml = /<html[^>]*>((.|[\n\r])*)<\/html>/im
		var patternHead = /<head[^>]*>((.|[\n\r])*)<\/head>/im
		var array_matches_head = patternHead.exec(text);
		var patternBody = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
		
		var array_matches_body = patternBody.exec(text);
		var basepath_flag = 0;//是否增加base路径 1增加 0不增加
		var basepath = '';
		if(basepath_flag) {//添加本页面的 相对URL 的 基准URL  '//127.0.0.1:8020/happymap/'是测试时的本地虚拟路径
			basepath = '<base href="//127.0.0.1:8020/happymap/">';// target="_blank"加入这个属性后在页面中点击链接会弹出新页面
		}
		if(array_matches_head) {
			text = text.replace('<head>', '<head>' + basepath );
		} else if (patternHtml) {
			text = text.replace('<html>', '<head>' + basepath + '</head>');
		} else if (array_matches_body) {
			text = text.replace('<body>', '<body>' + basepath );
		} else {
			text = basepath + text;
		}
		var ifr = document.createElement("iframe");
		ifr.setAttribute("id", "platformIframe");  
		ifr.setAttribute("name", "platformIframe");  
		ifr.setAttribute("frameborder", "0");
		ifr.setAttribute("scrolling", "auto");
		ifr.setAttribute("width", "100%");  
		ifr.setAttribute("height", "100%");  
		document.getElementById("iframeBg").innerHTML = "";
		document.getElementById("iframeBg").appendChild(ifr);
		
		var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
		ifrw.document.open();
		ifrw.document.write(text);  
		ifrw.document.close();
	}
    //帮助弹窗隐藏/显示
    function setHelpDialogVisible(bVisible){
    	
    	var helpDialog=$('.helpDialog');
    	var posType=helpDialog.css('position');
    	if(bVisible){
    		if(posType!='static'){
	    		var wDlg=helpDialog.width();
		    	var hDlg=helpDialog.height();
		    	var wWin=$(window).width();
		    	var hWin=$(window).height();
		    	helpDialog.css({
		    		"left":((wWin-wDlg)/2)+"px",
		    		"top":((hWin-hDlg)/2)+"px"
		    	});
	    	}
	    	helpDialog.show();
    	}else{
    		helpDialog.hide();
    	}
    }
	//树状菜单隐藏/显示  --仅限于窄屏
	function setTreeListVisible(bVisible){
		var treeBg=$('#platformTree');
		if(bVisible){
			var operBg=$('.codeBg>.top');
			treeBg.css('top',(operBg.offset().top+operBg.height())+'px');
			treeBg.removeClass('smHide');
		}else{
			treeBg.addClass('smHide');
		}
	}
})
