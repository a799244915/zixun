	$(function(){
		var $input = $("input");
		var $table = $("table")[0];
		var $tr = $(".hidden")[0];
		var $td1=$(".hidden td:nth-child(1)");
		var $td2=$(".hidden td:nth-child(2)");
		var $td3=$(".hidden td:nth-child(3)");
		var $td4=$(".hidden td:nth-child(4)");
		var $td5=$(".hidden td:nth-child(5)");
		function lanmuClick(){
			$("#lanmu").click(function lanmuclick(){
				$("#neirong").load("./lanmu.html",function(){
					
				})
			})
		}	
		// 多个删除
			$("#columnbtntwo").click(function(){
					   var msg = "确认删除吗?";
				            if (confirm(msg)==true){
				                Array.prototype.slice.call($("input"),0).forEach(function(item){
				                	// console.log(item.parentNode)
										if (item.checked) {
											var obj={};
											obj.id=item.parentNode.name
					            		$("tbody")[0].removeChild(item.parentNode.parentNode);
										$.get("http://120.78.164.247:8099/manager/category/deleteCategoryById",obj)
							       
										}
									})
				                return true;
				            }else{
				            	$("input").removeAttr("checked")
				                return false;
				            }

				   // 刷新页面
				     $(" tbody tr[class!='hidden']").remove();
					get();
					
				})

	// 获取数据
		function get(){
			var $trclone=$(".hidden").clone(true);
			$.get("http://120.78.164.247:8099/manager/category/findAllCategory",function(result){
			Array.prototype.slice.call(result.data,0).forEach(function(item){
				// console.log(item)
				var $trclone=$(".hidden").clone(true);
				$trclone.children()[0].name=item.id;
				$trclone.children()[1].innerHTML=item.name;
				$trclone.children()[2].innerHTML=item.comment;
				if (item.parent==null) {
					$trclone.children()[3].innerHTML="无"
				}else{
					$trclone.children()[3].innerHTML=item.parent.name;
				}
				if (item.no==null) {
					$trclone.children()[4].innerHTML="无"
				}else{
					$trclone.children()[4].innerHTML=item.no;
				}
				// $trclone.children()[3].innerHTML=item.parent;
				$trclone.removeAttr("class");
				$("tbody").append($trclone);
				})
			})
		}
		get();
		console.log($(" tbody tr[class!='hidden']"))
	// 发送数据
		$("#save").click(function(){

			var obj ={};
			obj.name=$("#recipient-name")[0].value;
			obj.number=$("#recipient-number")[0].value;
			obj.comment=$("#message-text")[0].value;
			obj.parent=$("#recipient-parent")[0].value;
			$.post("http://120.78.164.247:8099/manager/category/saveOrUpdateCategory",obj);
			//刷新页面
			$(" tbody tr[class!='hidden']").remove();
			get();


		})

	// 单个删除数据
		$("tr").on('click','.delete',function (){
					 var msg = "确认删除吗?";
				            if (confirm(msg)==true){
				                	 $(this).parent().parent().remove()
				                    console.log($(this).parent().parent().children()[0].name)
				                    var obj={};
									obj.id=$(this).parent().parent().children()[0].name;
									$.get("http://120.78.164.247:8099/manager/category/deleteCategoryById",obj)
									// 刷新
									$(" tbody tr[class!='hidden']").remove();
									get();
								    return true;
				            }else{
				 
				                return false;
				            }
                });
			
	// 修改数据
		$("tbody").on('click','.revise',function (){

                    console.log($(this).parent().parent().children()[0].name);
                    	var obj={};
                    	obj.id=$(this).parent().parent().children()[0].name;
                    	$("#revise-name")[0].value=$(this).parent().parent().children()[1].innerHTML;
						$("#revise-number")[0].value=$(this).parent().parent().children()[4].innerHTML;
						$("#revise-text")[0].value=$(this).parent().parent().children()[2].innerHTML;
						$("#reviseName")[0].value=$(this).parent().parent().children()[3].innerHTML;

					$("#reviseSave").click(function(){
								obj.name=$("#revise-name")[0].value;
								obj.number=$("#revise-number")[0].value;
								obj.comment=$("#revise-text")[0].value;
								obj.parent=$("#reviseName")[0].value;
								$.post("http://120.78.164.247:8099/manager/category/saveOrUpdateCategory",obj);
						//刷新页面	
						$("tbody tr[class!='hidden']").remove();
							get();
						$("tbody tr[class!='hidden']").remove();
							get();

					})
                });
	})