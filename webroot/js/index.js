 $.afui.autoLaunch=false;
 $.afui.useOSThemes=false;

 //判断是否需要跳转到指定页面
 $.afui.ready(function(){
	 
		//$.afui.setBackButtonText("返回");
		//$.afui.setBackButtonVisibility(false)
 });
 
 //判断需要跳转到哪个页面
 changePage();
 
 /* This function runs when the content is loaded.*/
 $(document).ready(function(){
	 //全局设置转场动画
	 $("a").attr("data-transition","fade");
	//获取js开发许可
		$.ajax({
		 async:false,
		  url: "weixin/sign.action",
		  data:{url:location.href.split('#')[0]},
		  success: function (data) {
		  	wx.config({
		  	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		  	    appId: 'wx6d373275087fc071', // 必填，公众号的唯一标识
		  	    timestamp: data.timestamp, // 必填，生成签名的时间戳
		  	    nonceStr: data.nonceStr, // 必填，生成签名的随机串
		  	    signature: data.signature,// 必填，签名，见附录1
		  	    jsApiList: [
								'checkJsApi',
								'onMenuShareTimeline',
								'onMenuShareAppMessage',
								//'onMenuShareQQ',
								//'onMenuShareWeibo',
								'hideMenuItems',
								'showMenuItems',
								'hideAllNonBaseMenuItem',
								'showAllNonBaseMenuItem',
								//'translateVoice',
								//'startRecord',
								//'stopRecord',
								//'onRecordEnd',
								//'playVoice',
								//'pauseVoice',
								//'stopVoice',
								//'uploadVoice',
								//'downloadVoice',
								//'chooseImage',
								//'previewImage',
								//'uploadImage',
								//'downloadImage',
								'getNetworkType',
								'openLocation',
								'getLocation',
								'hideOptionMenu',
								'showOptionMenu',
								'closeWindow',
								'scanQRCode',
								//'chooseWXPay',
								'openProductSpecificView'
								//'addCard',
								//'chooseCard',
								//'openCard'
		  	      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		  	});
		  }
		});  
		
		 // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		wx.ready(function(){
			wx.hideOptionMenu();
		});

		wx.error(function(res){
			alert("微信js签名错误");
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			});
		
		//显示加载动画
		 setTimeout(function(){$.afui.launch();},1500);
		 if($.afui.useOSThemes&&!$.os.ios&&$("#afui").get(0).className!=="ios")
	     {
		 	$("#afui").removeClass("ios");
	     }
		 
		$.ajax({
	         url: "weixin/getSession.action",
	         success: function (data) {
	        	 $("#userNickName").text(data.nickname);
	        	 $("#userNickNameSplash").text("您好,"+data.nickname);
	        	 $("#openId").val(data.openId);
	        	 $("#nickname").val(data.nickname);
	         }
	     });  
});
 
 //填写邀请信息
function initInvite()
{
	//wx.hideOptionMenu();
	//alert();
	$("#invite-day").mobiscroll().date({mode:'scroller', lang:'zh', theme: 'mobiscroll', display: 'modal',minDate: new Date()});
	$("#invite-begin").mobiscroll().time();
	$("#invite-begin").mobiscroll().time({mode:'scroller', lang:'zh', theme: 'mobiscroll', display: 'modal', 
		onSelect: function(valueText,inst)
		{
			//alert($.mobiscroll.datetime.formatDate('hh:mm', new Date()));
			var invite_end=$.mobiscroll.datetime.formatDate('HH:ii', new Date(new Date(inst.getVal()).getTime()+3600000*2));
			$("#invite-end").val(invite_end);
			$("#invite-end").mobiscroll().time({mode:'scroller', lang:'zh', theme: 'mobiscroll', display: 'modal',date:invite_end});
		}
	});
	$("#invite-end").mobiscroll().time({mode:'scroller', lang:'zh', theme: 'mobiscroll', display: 'modal'});
	$("#btnChooseArea").unbind().click(function (){
		var inviteDay=$("#invite-day").val();
		var inviteBegin=$("#invite-begin").val();
		var inviteEnd=$("#invite-end").val();
		if(inviteDay==""||inviteBegin==""||inviteEnd=="")
			{
				$.afui.toast({
				    message:"请将信息填写完整",
				    position:"bc",
				    delay:1500,
				    autoClose:true, //have to click the message to close
				    type:"error"
				});
				return false;
			}
	});
}
 
//日期变动时触发
function mobiscroll_change(valueText,inst){
	
	$("#invite-end").val();
}



//选择餐厅
function initRestaurant()
{
	/*
	//微信获得当前地址
	 var latitude ="30.636295"; // 纬度，浮点数，范围为90 ~ -90
	 var longitude ="114.176544"; // 经度，浮点数，范围为180 ~ -180。
	 var speed = ""; // 速度，以米/每秒计
	 var accuracy ="" 
	 wx.getLocation({
	    success: function (res) {
	        latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	        longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	        speed = res.speed; // 速度，以米/每秒计
	        accuracy = res.accuracy; // 位置精度
	        alert(longitude);
	    },
	    cancel: function (res) {
	        alert('您拒绝授权获取地理位置！');
	    } 
	});
	*/
	var currentIndex=0;
	var maxCount=5;
	 var latitude ="30.636295"; // 纬度，浮点数，范围为90 ~ -90
	 var longitude ="114.176544"; // 经度，浮点数，范围为180 ~ -180。
	 var url="http://api.map.baidu.com/geosearch/v3/nearby?ak=0XpknrkEnkVWwHCDHeEneVcq&geotable_id=121674&location="+longitude+","+latitude+"&q=火锅&radius=100000&page_index="+currentIndex+"&page_size="+maxCount;
	 $.ajax({
 	   	   dataType : "jsonp",
 	   	   url:url,
 	       success: function (result) {
 	       	 var listRestaurant="";
 	       	 var tempListRestaurant="";
 	       	 $(result.contents).each(function(i,val){
 	       		if(val.headImgUrl!=undefined)
					{
						headUrl= '<img src="'+val.headImgUrl.big+'">';
						tempListRestaurant="<a href='#restaurantDetail'  onclick='setSessionStorage(\"lat\","+val.location[0]+");setSessionStorage(\"lng\","+val.location[1]+");setSessionStorage(\"title\",\""+val.title+"\");setSessionStorage(\"address\",\""+val.address+"\");setSessionStorage(\"headImgUrl\",\""+val.headImgUrl.big+"\");setSessionStorage(\"uid\",\""+val.uid+"\");'>";
					}
				else
					{
						headUrl= '<img src="img/c/qrcode_for_gh_be461b35d165_344.jpg">';
						tempListRestaurant="<a href='#restaurantDetail'  onclick='setSessionStorage(\"lat\","+val.location[0]+");setSessionStorage(\"lng\","+val.location[1]+");setSessionStorage(\"title\",\""+val.title+"\");setSessionStorage(\"address\",\""+val.address+"\");setSessionStorage(\"headImgUrl\",\"img/c/qrcode_for_gh_be461b35d165_344.jpg\");setSessionStorage(\"uid\",\""+val.uid+"\");'>";
					}	
 				listRestaurant +="<li>"+tempListRestaurant+headUrl+'<h4>'+val.title+'</h4>'+
 								 '<p>'+val.address+'</p>'+
 								 '</a>';
 				
 	          	  });
 	          	$("#listRestaurant").html(listRestaurant);
 	          	var w = $(window).width();
 	            var h=$(window).height()-45-45-48;
 	        	$("#wrapper3").css("height",h);
 	            $("#scroller3>ul>li").css("width", w);
 	            //$("#scroller3>ul>li").css("height", h/5);
 	          	var myScroll = new IScroll('#wrapper3', {scrollX: true, scrollY: true, mouseWheel: true });
 	          	if(result.contents.length<maxCount)
 	             {
 	            	 $("#pullUpLabel3").html("");
 	             }
 	             else
 	        	 {
 	            	 $("#pullUpLabel3").html("上拉显示更多...");
 	        	 }
 	            myScroll.on('scrollEnd', function () {
 	            	listRestaurant="";
 	            	 if(Math.abs(this.y)>=Math.abs(this.maxScrollY))
 	            		 {
 	            		 	//currentIndex=currentIndex+maxCount;
 	            		     currentIndex++;
 	            		 	var url="http://api.map.baidu.com/geosearch/v3/nearby?ak=0XpknrkEnkVWwHCDHeEneVcq&geotable_id=121674&location="+longitude+","+latitude+"&q=火锅&radius=100000&page_index="+currentIndex+"&page_size="+maxCount;
 	            		 		$.ajax({
 	            		 			dataType : "jsonp",
 	            		 			url:url,
 	                		        success: function (result) {
 	                		        	 var listRestaurant="";
 	                		 	       	 var tempListRestaurant="";
 	                		 	       	 $(result.contents).each(function(i,val){
 	                		 	       		if(val.headImgUrl!=undefined)
 	                							{
 	                								headUrl= '<img src="'+val.headImgUrl.big+'">';
 	                								tempListRestaurant="<a href='#restaurantDetail'  onclick='setSessionStorage(\"lat\","+val.location[0]+");setSessionStorage(\"lng\","+val.location[1]+");setSessionStorage(\"title\",\""+val.title+"\");setSessionStorage(\"address\",\""+val.address+"\");setSessionStorage(\"headImgUrl\",\""+val.headImgUrl.big+"\");setSessionStorage(\"uid\",\""+val.uid+"\");'>";
 	                							}
 	                						else
 	                							{
 	                								headUrl= '<img src="img/c/qrcode_for_gh_be461b35d165_344.jpg">';
 	                								tempListRestaurant="<a href='#restaurantDetail'  onclick='setSessionStorage(\"lat\","+val.location[0]+");setSessionStorage(\"lng\","+val.location[1]+");setSessionStorage(\"title\",\""+val.title+"\");setSessionStorage(\"address\",\""+val.address+"\");setSessionStorage(\"headImgUrl\",\"img/c/qrcode_for_gh_be461b35d165_344.jpg\");setSessionStorage(\"uid\",\""+val.uid+"\");'>";
 	                							}	
 	                		 				listRestaurant +="<li>"+tempListRestaurant+headUrl+'<h4>'+val.title+'</h4>'+
 	                		 								 '<p>'+val.address+'</p>'+
 	                		 								 '</a>';
 	                		 				
 	                		 	          	  });
 	                		 	        $("#listRestaurant").append(listRestaurant);
 	                	 	            $("#scroller3>ul>li").css("width", w);
 	                	 	            //$("#scroller3>ul>li").css("height",h/5);
 	                	 	            setTimeout(function () {                       
 	                                        myScroll.refresh();
 	                                        myScroll.options.snap = true;
 	                                    }, 10);
	 	                	 	        if(result.contents.length<maxCount)
	 	                	             {
	 	                	            	 $("#pullUpLabel3").html("");
	 	                	             }
	 	                	             else
	 	                	        	 {
	 	                	            	 $("#pullUpLabel3").html("上拉显示更多...");
	 	                	        	 }
 	                		        }
 	                		 	});
 	            		 }
 	             });
 		   }
 	 });
}
 
//查看餐厅明细地址
function initRrestaurantDetail()
{
	//隐藏右上角按钮
	wx.hideOptionMenu();
	/*
	var windowsArr = [];  
	var marker = [];
	//基本地图加载
	var map = new AMap.Map("mapContainer",{
		resizeEnable: true,
        view: new AMap.View2D({
        	zoom:12 //地图显示的缩放级别
        })
	
    });
    cloudSearch();  
	//根据数据id查询数据详情
	function cloudSearch(){
	    map.clearMap();   
	    var search; 
	    AMap.service(["AMap.CloudDataSearch"], function() {        
	        search = new AMap.CloudDataSearch('55656259e4b0ccb608f13383');  //构造云数据检索类
	        //根据id查询
	        search.searchById($("#restaurantId").val(), function(status, result){
	        	cloudSearch_CallBack(result);
	        });  
	    }); 
	}
	//回调函数
	function cloudSearch_CallBack(data){
	    var resultStr = "";
	    var clouddata = data.datas[0];
	    resultStr += "<div id='divid" + 1 + "' onmouseover='openMarkerTipById1(" + 0 + ",this)' onmouseout='onmouseout_MarkerStyle(" + 1 + ",this)' style=\"font-size: 12px;cursor:pointer;padding:2px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table><tr><td><h3><font face=\"微软雅黑\"color=\"#3366FF\">" + clouddata._name + "</font></h3>";
	    resultStr += '地址：' + clouddata._address + '<br/>类型：' + clouddata.type + '<br/>ID：' + clouddata._id + "</td></tr></table></div>";   
	    //添加marker
	    var location = clouddata._location;  
	    var markerOption = {
	        map:map,						
	        icon:"http://cache.amap.com/lbs/static/jsdemo003.png",  
	        position:location  
	    };            
	    var mar =new AMap.Marker(markerOption); 
	    marker.push(location);
	
	    //添加infowindow
	    var infoWindow = new AMap.InfoWindow({
	         content:"<h3><font face=\"微软雅黑\"color=\"#3366FF\">"+ clouddata._name +"</font></h3><hr />地址："+ clouddata._address + "<br />" + "创建时间：" + clouddata._createtime+ "<br />" + "更新时间：" + clouddata._updatetime,
	        size:new AMap.Size(300,0),
	        autoMove:true, 
	        offset:{x:0, y:-30}
	    });
	    windowsArr.push(infoWindow);
	    map.setCenter(mar.getPosition());  
	
	    var aa = function(e){infoWindow.open(map,mar.getPosition());};  
	    AMap.event.addListener(mar, 'click', aa);
	    infoWindow.open(map,mar.getPosition());
	}  
	//回调函数
	function errorInfo(data) {
	    resultStr = data.info;
	}
	//根据id打开搜索结果点tip 
	function openMarkerTipById1(pointid,thiss) {   
	    thiss.style.background='#CAE1FF';  
	    windowsArr[pointid].open(map, marker[pointid]);   
	}  
	//鼠标移开后点样式恢复
	function onmouseout_MarkerStyle(pointid,thiss) {   
	   thiss.style.background="";  
	}
	*/ 
	 var width=$(document).width();
	 var height=$(window).height();
	 $("#mapContainer").css("height",height)
	 var uid=sessionStorage.getItem("uid");
	 var lat=sessionStorage.getItem("lat");
	 var lng=sessionStorage.getItem("lng");
	 var title=sessionStorage.getItem("title");
	 var address=sessionStorage.getItem("address");
	 var headImgUrl=sessionStorage.getItem("headImgUrl");
	 //var map = new BMap.Map("mapContainer"); 
	// 百度地图API功能
	    var map = new BMap.Map('mapContainer');
	    var poi = new BMap.Point(lat,lng);
	    map.centerAndZoom(poi, 20);
	    map.enableScrollWheelZoom();
	    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
	                    '<img src="'+headImgUrl+'" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +address+
	                  '</div>';

	    //创建检索信息窗口对象
	    var searchInfoWindow = null;
		searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
				title  : title,      //标题
				width  : width-80,             //宽度
				enableSendToPhone:false,
				panel  : "panel",         //检索结果面板
				enableAutoPan : true,     //自动平移
				searchTypes   :[
					//BMAPLIB_TAB_SEARCH,   //周边检索
					BMAPLIB_TAB_TO_HERE,  //到这里去
					BMAPLIB_TAB_FROM_HERE //从这里出发
				]
			});
	    var marker = new BMap.Marker(poi); //创建marker对象
	    //marker.enableDragging(); //marker可拖拽
	    searchInfoWindow.open(marker);
	   marker.addEventListener("click", function(e){
		    searchInfoWindow.open(marker);
	    })
	   //$(".BMapLib_sendToPhone").css("display","none")
	    map.addOverlay(marker); //在地图中添加marker
	    
	   $("#btnChooseRestaurant").unbind().click(function(){
		   $('#restaurantId').val(uid);
	   });
	
}

//离开餐厅明细时清空页面dom。防止下次加载时显示上次的信息。
function unloadRrestaurantDetail()
{
	$("#mapContainer").empty();
}

//用户确认邀请信息
function initConfirmInvite()
{	
	//用户邀请单的相关信息
	var inviteId=$("#inviteId").val();
	var nickname=$("#nickname").val();
	var inviteOpenid=$("#openId").val();
	var inviteDay=$("#invite-day").val();
	var inviteBegin=$("#invite-begin").val();
	var inviteEnd=$("#invite-end").val();
	var inviteAddress=$('#restaurantId').val();
	//$("#inviteInfo").html("<font>您的邀请单详细信息如下：<br>日期："+inviteDay+"<br>时间段："+inviteBegin+" 到 "+inviteEnd+"<br></font>");
	
	$("#btnshare").unbind().click(function(){
	  var w=document.documentElement.scrollWidth;
	  var h=document.documentElement.scrollHeight;
	  var bw=document.documentElement.clientWidth;
	  var bh=document.documentElement.clientHeight;
	  var x=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
	  var y=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
	  $("#cover").css("display","block");
	  $("#cover").css("width",(bw>w?bw:w)+"px");
	  $("#cover").css("height",(bh>h?bh:h)+"px");
      $("#guide").css("display","block");
      $("#guide").css("top",(y+5)+"px");
	  $("#cover").unbind().click(function(){
		 $("#cover").css("display","none");
         $("#guide").css("display","none");
	  });
	});
	
	$.ajax({
		async: false,
        url: "saveInviteInfo.action",
        data:{
        	  "id":inviteId,
        	  "inviteOpenid":inviteOpenid,
        	  "inviteDay":inviteDay,
        	  "inviteBegin":inviteBegin,
        	  "inviteEnd":inviteEnd,
        	  "inviteAddress":inviteAddress
        		},
        success: function (data) {
        	$("#inviteId").val(data.id);
        	//$("#shareInfo").show();
        }
    });  
	
	var title='一伙锅';
	var desc='您的好友 '+nickname+' 邀请您参加一伙锅！';
	var link='http://awuyangc.xicp.net/origin/weixin/oauth2Check.action?rn='+Math.random()+'&inviteId='+$("#inviteId").val(); // 分享链接
	var imgUrl='http://awuyangc.xicp.net/origin/img/c/qrcode_for_gh_be461b35d165_258.jpg'; // 分享图标
	onMenuShareAppMessage(title,desc,link,imgUrl);
	wx.onMenuShareTimeline(title,desc,link,imgUrl);
}

//分享邀请单
function shareInvite()
{
	wx.showOptionMenu();
	var inviteId=$("#inviteId").val();
	var nickname=$("#nickname").val();
	var inviteOpenid=$("#openId").val();
	var inviteDay=$("#invite-day").val();
	var inviteBegin=$("#invite-begin").val();
	var inviteEnd=$("#invite-end").val();
	var inviteAddress=$('#restaurantId').val();
	alert("邀请单id:"+inviteId+" 昵称："+nickname+" 用户openId："+inviteOpenid+" 日期："+inviteDay+" 开始时间："+inviteBegin+" 结束时间："+inviteEnd+" 地点ID"+inviteAddress);
	//分享给朋友
}

function initSignUp()
{
	
	var inviteId=sessionStorage.getItem("inviteId");
	var ownFlag=sessionStorage.getItem("ownFlag");
	if(inviteId!=null&&inviteId!="")
	{
		sessionStorage.setItem("inviteId",inviteId);
	}
	else
	{
		inviteId=GetQueryString("inviteId");
	}
	$.ajax({
        url: "getInviteInfo.action",
        data:{"inviteId":inviteId},
        success: function (data) {
        	//初始化推荐餐厅
        	$("#inviteSignInfo").html("您的好友  \"<font color='red'>"+data.weixinUser.nickname+"</font>\" 邀请您 <font color='blue'>"+data.inviteDay+"</font> 一伙锅去！");
        	var	inviteAddress=data.inviteAddress;
        	//显示餐厅
        	if(inviteAddress==""||inviteAddress==null)
        		{
        			//给用户推荐餐厅
        			$("#tjct").html("推荐餐厅");
        		}
        	else
        		{
        			$("#tjct").html("发起人选中的餐厅");
	        		 var url="http://api.map.baidu.com/geosearch/v3/detail/"+inviteAddress+"?ak=0XpknrkEnkVWwHCDHeEneVcq&geotable_id=121674";
	        		 $.ajax({
	        	 	   	   dataType : "jsonp",
	        	 	   	   url:url,
	        	 	       //url: "http://api.map.baidu.com/place/v2/search?ak=0XpknrkEnkVWwHCDHeEneVcq&output=json&query=%E7%81%AB%E9%94%85&page_size=100&page_num=0&scope=2&region=%E6%AD%A6%E6%B1%89",
	        	 	       success: function (result) {
	        	 	       	 var listRestaurant=""; 
	        	 	       	 $(result.contents).each(function(i,val){
	        	 	       		listRestaurant +='<div class="list-group-item" href="#restaurantDetail"  onclick="setSessionStorage(\'lat\','+val.location[0]+');setSessionStorage(\'lng\','+val.location[1]+');">';
	        	 	       						//'<a href="'+val.detail_info.detail_url+'">'+
	        	 	       						//'<a href="http://map.baidu.com/mobile/">'+
	        	 				if(val.headImgUrl!=undefined)
	        	 					{
	        	 						listRestaurant += '<img src="'+val.headImgUrl.big+'">';
	        	 					}
	        	 				else
	        	 					{
	        	 						listRestaurant += '<img src="img/c/qrcode_for_gh_be461b35d165_344.jpg">';
	        	 					}
	        	 	       						
	        	 				listRestaurant +='<h4>'+val.title+'</h4>'+
	        	 								 '<p>'+val.address+'</p>'+
	        	 								 '<div class="clear"></div>'+ 
	        	 								 '<div><a href="#">为什么选这一家？</a></div>'
	        	 								 '</div>';
	        	 								
	        	 								 
	        	 	          	  }); 
	        	 	          	 $("#restaurantInfo").html(listRestaurant);
	        	 		   }
	        	 	 });
        		}
        	
        }
    }); 

	//初始化报名单
	$.ajax({
        url: "getJoinInfo.action?rd="+Math.random(),
        data:{"inviteId":inviteId},
        success: function (data) {
        	var signUserList="";
        	var inviteAddress="";
        	$(data).each(function(i,val){
        		var color="#00000"+(Math.random()*0x1000000<<0).toString(16).slice(-6);
        		signUserList +="<div class='sign'><img class='joinImg' src='"+val.weixinUser.headImgUrl+"'><br><font style='color='"+color+"'>"+val.weixinUser.nickname+"</font></div>";
        	}); 
        	//如果自己为发起者
        	if(ownFlag==1)
        	{
        		var title='一伙锅';
        		var desc='您发起的一伙锅邀请！';
        		var link='http://awuyangc.xicp.net/origin/weixin/oauth2Check.action?rn='+Math.random()+'&inviteId='+inviteId; // 分享链接
        		var imgUrl='http://awuyangc.xicp.net/origin/img/c/qrcode_for_gh_be461b35d165_258.jpg'; // 分享图标
        		onMenuShareAppMessage(title,desc,link,imgUrl);
        		onMenuShareTimeline(title,desc,link,imgUrl);
        		signUserList +="<div class='sign'><a href='#' onclick=''><img class='joinImg' src='img/add.jpg'></a></div>";
        	}
        	
        	//显示已报名的人员
        	$("#signUserList").html(signUserList);
        }
    }); 
	//我要报名按钮
	$("#btnSignUp").unbind().click(function (){
		$.ajax({
	        url: "saveJoinInfo.action?rd="+Math.random(),
	        data:{"inviteId":inviteId},
	        success: function (data) {
	        	if(data=="ok")
	        	{
	        		$.afui.toast({
    				    message:"报名成功",
    				    position:"tc",
    				    delay:1500,
    				    autoClose:true, //have to click the message to close
    				    type:"error"
    				});
	        		$.ajax({
	        	        url: "getJoinInfo.action",
	        	        data:{"inviteId":inviteId},
	        	        success: function (data) {
	        	        	var signUserList="";
	        	        	$(data).each(function(i,val){
	        	        		var color="#00000"+(Math.random()*0x1000000<<0).toString(16).slice(-6);
	        	        		signUserList +="<div class='sign'><img class='joinImg' src='"+val.weixinUser.headImgUrl+"'><br><font style='color='"+color+"'>"+val.weixinUser.nickname+"</font></div>";
	        	        	});
	        	        	if(ownFlag==1)
	        	        	{
	        	        	signUserList +="<div class='sign'><img class='joinImg' src='img/add.jpg'></div>";
	        	        	}
	        	        	$("#signUserList").html(signUserList);
	        	        }
	        	    }); 
	        	}
	        	else
        		{
	        		$.afui.toast({
    				    message:"报名失败",
    				    position:"tc",
    				    delay:1500,
    				    autoClose:true, //have to click the message to close
    				    type:"error"
    				});
        		}
	        }
	    });  
	});
	//取消报名按钮
	$("#btnSignOut").unbind().click(function (){
		$.ajax({
	        url: "deleteJoinInfo.action?rd="+Math.random(),
	        data:{"inviteId":inviteId},
	        success: function (data) {
	        	if(data=="ok")
	        	{
	        		$.afui.toast({
    				    message:"取消报名成功",
    				    position:"tc",
    				    delay:1500,
    				    autoClose:true, //have to click the message to close
    				    type:"error"
    				});
	        		var signUserList="";
	        		$.ajax({
	        	        url: "getJoinInfo.action?rd="+Math.random(),
	        	        data:{"inviteId":inviteId},
	        	        success: function (data) {
	        	        	$(data).each(function(i,val){
	        	        		var color="#00000"+(Math.random()*0x1000000<<0).toString(16).slice(-6);
	        	        		signUserList +="<div class='sign'><img class='joinImg' src='"+val.weixinUser.headImgUrl+"'><br><font style='border-style: solid;border-width:1px;border-color:"+color+"' color='"+color+"'>"+val.weixinUser.nickname+"</font></div>";
	        	        	});
	        	        	if(ownFlag==1)
	        	        	{
	        	        	signUserList +="<div class='sign'><img class='joinImg' src='img/add.jpg'></div>";
	        	        	}
	        	        	$("#signUserList").html(signUserList);
	        	        }
	        	    }); 
	        	}
	        	else
        		{
	        		$.afui.toast({
    				    message:"取消报名失败",
    				    position:"tc",
    				    delay:1500,
    				    autoClose:true, //have to click the message to close
    				    type:"error"
    				});
        		}
	        }
	    });  
	});
}

//离开报名页时清空页面dom。防止下次加载时显示上次的信息。
function unloadSignUp()
{
	sessionStorage.setItem("inviteId",null);
	sessionStorage.setItem("ownFlag",null);
	$("#signUserList").empty();
	
}

//我报名的邀请
function initRInviteInfoList()
{
	var currentIndex=0;
	var maxCount=10;
	var rInviteInfoList="";
	wx.hideOptionMenu();
	$.ajax({
        url: "getRInviteInfo.action?rd="+Math.random(),
        data:{"startIndex":currentIndex,"endIndex":maxCount},
        success: function (data) {
        	$(data).each(function(i,val){
        		rInviteInfoList +="<li><a href='#signUp' onclick='setSessionStorage(\"inviteId\","+val.inviteId+")'>您已参加 <font color='red'>"+val.weixinUser.nickname+"</font>发起的邀请 时间<font color='blue'>"+val.inviteInfo.inviteDay+"</font></a></li>";
        	});
        	$("#rInviteInfoList").html(rInviteInfoList);
        	 var w = $(window).width();
        	 var h=$(window).height()-45-48;
        	 $("#wrapper2").css("height",h);
             $("#scroller2>ul>li").css("width", w);
             //$("#scroller2>ul>li").css("height", h/8);
             var myScroll = new IScroll('#wrapper2', {scrollX: true, scrollY: true, mouseWheel: true });
             if(data.length<maxCount)
             {
            	 $("#pullUpLabel2").html("");
             }
             else
        	 {
            	 $("#pullUpLabel2").html("上拉显示更多...");
        	 }
             myScroll.on('scrollEnd', function () {
            	 rInviteInfoList="";
            	 
            	 if(Math.abs(this.y)>=Math.abs(this.maxScrollY))
            		 {
            		 	currentIndex=currentIndex+maxCount;
            		 		$.ajax({
                		        url: "getRInviteInfo.action?rd="+Math.random(),
                		        data:{"startIndex":currentIndex,"endIndex":maxCount},
                		        success: function (data) {
                		        	$(data).each(function(i,val){
                		        		rInviteInfoList +="<li><a href='#signUp' onclick='setSessionStorage(\"inviteId\","+val.inviteId+")'>您已参加 <font color='red'>"+val.weixinUser.nickname+"</font>发起的邀请 时间<font color='blue'>"+val.inviteInfo.inviteDay+"</font></a></li>";
                		        	});
                		        	if(rInviteInfoList!="")
                		        	{
	                		        	$("#rInviteInfoList").append(rInviteInfoList);
	                		        	$("#scroller2>ul>li").css("width", w);
	                		        	 //$("#scroller2>ul>li").css("height", h/8);
	                		        	setTimeout(function () {                       
	                                        myScroll.refresh();
	                                        myScroll.options.snap = true;
	                                    }, 10);
	                		        	if(data.length<maxCount)
	                		             {
	                		            	 $("#pullUpLabel2").html("");
	                		             }
	                		             else
	                		        	 {
	                		            	 $("#pullUpLabel2").html("上拉显示更多...");
	                		        	 }
                		        	}
                		        }
                		 	});
            		 }
             });
        }
    });
}

//我发出的邀请
function initSInviteInfoList()
{
	var currentIndex=0;
	var maxCount=10;
	wx.hideOptionMenu();
	var sInviteInfoList="";
	$.ajax({
        url: "getSInviteInfo.action?rd="+Math.random(),
        data:{"startIndex":currentIndex,"endIndex":maxCount},
        success: function (data) {
        	$(data).each(function(i,val){
        		sInviteInfoList +="<li><a href='#signUp' onclick='setSessionStorage(\"inviteId\","+val.id+");setSessionStorage(\"ownFlag\",1)'>您发起的邀请 时间<font color='blue'>"+val.inviteDay+"</font></a></li>";
        	});
        	$("#sInviteInfoList").html(sInviteInfoList);
        	 var w = $(window).width();
        	 var h=$(window).height()-45-48;
        	 $("#wrapper1").css("height",h);
             $("#scroller1>ul>li").css("width", w);
             //$("#scroller1>ul>li").css("height", h/8);
             var myScroll = new IScroll('#wrapper1', {scrollX: true, scrollY: true, mouseWheel: true });
             if(data.length<maxCount)
             {
            	 $("#pullUpLabel1").html("");
             }
             else
        	 {
            	 $("#pullUpLabel1").html("上拉显示更多...");
        	 }
             myScroll.on('scrollEnd', function () {
            	 sInviteInfoList="";
            	 
            	 if(Math.abs(this.y)>=Math.abs(this.maxScrollY))
            		 {
            		 	currentIndex=currentIndex+maxCount;
            		 		$.ajax({
                		        url: "getSInviteInfo.action?rd="+Math.random(),
                		        data:{"startIndex":currentIndex,"endIndex":maxCount},
                		        success: function (data) {
                		        	$(data).each(function(i,val){
                		        		sInviteInfoList +="<li><a href='#signUp' onclick='setSessionStorage(\"inviteId\","+val.id+");setSessionStorage(\"ownFlag\",1)'>您发起的邀请 时间<font color='blue'>"+val.inviteDay+"</font></a></li>";
                		        	});
                		        	$("#sInviteInfoList").append(sInviteInfoList);
                		        	$("#scroller1>ul>li").css("width", w);
                		        	 //$("#scroller1>ul>li").css("height", h/8);
                		        	setTimeout(function () {                       
                                        myScroll.refresh();
                                        myScroll.options.snap = false;
                                    }, 10);
                		        	if(data.length<maxCount)
                		             {
                		            	 $("#pullUpLabel1").html("");
                		             }
                		             else
                		        	 {
                		            	 $("#pullUpLabel1").html("上拉显示更多...");
                		        	 }
                		        }
                		 	});
            		 }
             });
        }
    });
}

function dispatchPanelEvent(fnc,myPanel){
     if (typeof fnc === "string" && window[fnc]) {
         return window[fnc](myPanel);
     }
     else if(fnc.indexOf(".")!==-1){
         var scope=window,items=fnc.split("."),len=items.length,i=0;
         for(i;i<len-1;i++){
             scope=scope[items[i]];
             if(scope===undefined) return;
         }
         return scope[items[i]](myPanel);
     }
 };

 $(document).on("panelload",function(e){
    var hasLoad=$(e.target).attr("data-load");
    if(hasLoad!=null&&hasLoad!=undefined)
    {
    return dispatchPanelEvent(hasLoad,e.target);
    }
 })

 $(document).on("panelunload",function(e){
    var hasLoad=$(e.target).attr("data-unload");
    if(hasLoad!=null&&hasLoad!=undefined)
    {
    return dispatchPanelEvent(hasLoad,e.target);
    }
 })
 
  function GetQueryString(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	}
 
 function changePage(){
	 var page=GetQueryString("page");
	 window.location.href="#"+page;
 }
 
 function setSessionStorage(key,value)
 {
	 sessionStorage.setItem(key,value); 
 }
 
 //模拟微信登陆
 function login()
 {
	 $.ajax({
	        url: "setVirtualSession.action",
	        success: function (data) {
	        	 location.reload();
	        	//$.afui.loadContent("#rInviteInfo",false,false,"up");
	        }
	    });
 }
 
//微信分享
 function onMenuShareAppMessage(title,desc,link,imgUrl)
 {
	 wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
 }
function onMenuShareTimeline(title,desc,link,imgUrl)
{
	 wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
 
}
 
 
 //爬取百度poi
 function getBaiduPoi()
 {
	 //设置爬取参数
	 var ak="0XpknrkEnkVWwHCDHeEneVcq";
	 var query="火锅";
	 var region="武汉";
	 var requestUrl=encodeURI("http://api.map.baidu.com/place/v2/search?ak="+ak+"&output=json&query="+query+"&page_size=100&page_num=0&scope=2&region="+region);
	 var csv="title,address,longitude,latitude,coord_type,,icon_style_id,headImgUrl\r\n";
	 $.ajax({
	        url: "getBaiduPoi.action",
	        data:{"requestUrl":requestUrl},
	        success: function (data) {
	        	$(data).each(function(i,val){
	        		var title=val.name;
	        		var address=val.address;
	        		var longitude=val.location.lng;
	        		var latitude =val.location.lat;
	        		var coord_type="";
	        		var icon_style_id="";
	        		var headImgUrl="";
	        		csv +=title+","+address+","+longitude+","+latitude+","+"1,"+","+", \r\n";
	        	});
	        }
	    });
 }
 
 function format()
 {
	 var o = {
			 "M+" : this.getMonth()+1, //month
			 "d+" : this.getDate(), //day
			 "h+" : this.getHours(), //hour
			 "m+" : this.getMinutes(), //minute
			 "s+" : this.getSeconds(), //second
			 "q+" : Math.floor((this.getMonth()+3)/3), //quarter
			 "S" : this.getMilliseconds() //millisecond
			 }
			 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
			 (this.getFullYear()+"").substr(4- RegExp.$1.length));
			 for(var k in o)if(new RegExp("("+ k +")").test(format))
			 format = format.replace(RegExp.$1,
			 RegExp.$1.length==1? o[k] :
			 ("00"+ o[k]).substr((""+ o[k]).length));
			 return format;
 }
 