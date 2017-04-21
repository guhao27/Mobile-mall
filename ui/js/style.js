//声明函数名，全局调用
var openLayer,closeLayer,openSlideBottom,closeSlideBottom;
$(function(){
	//监听active
    document.body.addEventListener('touchstart', function () { 
    //空函数
    });

    //首页nav 切换动画效果
    $('.index-nav li').on('click', function() {
    	var old_i=$('.tabs-box .tab-block').index();
    	var i=$(this).index();//this指向当前li
    	var f=i-old_i>0?-1:1;//滑动方向
    	$(this).addClass('active').siblings('.active').removeClass('active');
    	$('.tabs-box .tab-item').eq(i).siblings('.tab-block').animate({
    		'left':f*100+'%'
    	},500,function(){
    		// console.log($(this),i,old_i);//this指向tab-block
    		$('.tabs-box .tab-item').eq(i).addClass('tab-block').siblings('.tab-block').removeClass('tab-block');
    		$(this).css({'left':0});
    	})
    });

    //展开产品详情&&关闭
    $('.details .details-head').on('click',function(){
    	$(this).siblings('.details-img').toggleClass('block');
    })

    //加减数量
    $('.jia,.jian').on('click',function(){
    	var val=$(this).siblings('input').val();
    	if($(this).hasClass('jian')){
    		val--;
    		val=val>=0?val:0;
    	}else{
    		val++;
    	}
    	if($('.order-product-list .count').length>0){
    		$('.order-product-list .count').text('×'+val);
    	}
    	$(this).siblings('input').val(val);
    })

    openLayer=function (str,tipsTxt,trueTxt,falseTxt){//打开弹框
        // 参数分别为，点击触发元素的data-layer值、弹窗提示的语句、左边点击按钮字符、右边点击按钮字符
    	var classTxt=str;
    	$('.layer').addClass('block');
    	var t=setTimeout(function(){
    		$('.layer .layer-widow.'+classTxt).addClass('block');
    	},300,function(){
    		clearTimeout(t);
    		t=null;
    	})

        if(str.indexOf('tips')!=-1){//如果弹出的是提示框
            $('.layer .layer-widow.'+classTxt).find('.layer-tips-main').text(tipsTxt).siblings('.true-layer').text(trueTxt).siblings('.false-layer').text(falseTxt)
        }
    }
    closeLayer=function (){//关闭弹框
    	$('.layer').removeClass('block').children('.layer-widow').removeClass('block');
    }
    $('.layer .false-layer').on('click',function(){
        closeLayer();
    })
    //点击弹框&&关闭
    $('[data-layer]').on('click',function(){
    	var classTxt=$(this).attr('data-layer');
    	openLayer(classTxt);
    });
    $('.layer .layer-bg').on('click',function(){
    	closeLayer();
    })

    //选择支付方式
    $('.payType-list li').on('click',function(){
    	var typeTXT=$(this).children('.pay').text();
    	closeLayer();
    	if($('.select-link-line').length>0){
    		$('.select-link-line .payType-txt').text(typeTXT);
    	}
    })

    //底部滑出
    openSlideBottom=function (){
    	$('.slide').addClass('block').children('.slide-main').animate({'bottom':0},300);
    }
    closeSlideBottom=function (){
    	$('.slide .slide-main').animate({'bottom':'-100%'},300,function(){
    		$(this).parent('.slide').removeClass('block');
    	});
    }
    $('.footer-put-order').on('click',function(){
    	openSlideBottom();
    })
    $('.slide .slide-bg').on('click',function(){
    	closeSlideBottom();
    })

    //选择配送员
    var isDispatchBusy=true;//配送员是否繁忙
    $('.dispatch-list').on('click','.dispatch-item',function(){
        if(isDispatchBusy){
            openLayer('layer-tips','附近的配送员繁忙','继续等待','转发物流');
        }
    })

    //代金券
    $('.cash-coupon li,.my-coupon li').on('click',function(){
        var i=$(this).index();
        $(this).addClass('active').siblings('.active').removeClass('active');

        $('.cash-coupon-tabs .cash-coupon-list').eq(i).addClass('block').siblings('.block').removeClass('block');
    })
    $('.cash-coupon-tabs.select-true').on('click','.cash-coupon-list .cash-coupon-item',function(){
        //是否可叠加
        var isOverlying=$(this).hasClass('overlying-false');

        if(!isOverlying){
            $(this).toggleClass('on');
        }else{
            $(this).addClass('on').siblings('.on').removeClass('on');
        }
    })

    //评价打星
    $('.comment-star-count .icon').on('touchstart',function(){
        var starList=$('.comment-star-count .icon');
        var i=$(this).index();
        starList.each(function(index, el) {
            index<=i?$(el).addClass('onStar'):$(el).removeClass('onStar');
        });
    })

    //获取页面内滑动的水平距离
    var startPosition, endPosition, moveLength;
        $(document).bind('touchstart', function(e){
        var touch = e.touches[0];
        startPosition = {
            x: touch.pageX
        }
    }) .bind('touchmove', function(e){
        var touch = e.touches[0];
        endPosition = {
            x: touch.pageX
        };
        moveLength = endPosition.x - startPosition.x;
    });
    //收藏左右滑显示删除按钮
    $('.swiperLeftBox li').swipeLeft(function(){
        if(Math.abs(moveLength)>80){
            $(this).animate({
                'left':'-1.6rem'
            },300,function(){
                $(this).find('.delete-btn').addClass('shadowPink');
            });
        }
    })
    $('.swiperLeftBox li').swipeRight(function(){
        if(Math.abs(moveLength)>80){
            $(this).animate({
                'left':'0'
            },300,function(){
                $(this).find('.delete-btn').removeClass('shadowPink');
            });
        }
    })

    //购物车左右滑显示删除按钮
    $('.swiperLeftBoxCar li .pro-main').swipeLeft(function(){
        if(Math.abs(moveLength)>80){
            $(this).animate({
                'left':'-1.6rem'
            },300);
        }
    })
    $('.swiperLeftBoxCar li .pro-main').swipeRight(function(){
        if(Math.abs(moveLength)>80){
            $(this).animate({
                'left':'0'
            },300);
        }
    })
})