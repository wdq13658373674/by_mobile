/**
 * 初始化
 */
mui.init({
    swipeBack:false
});

/**
 * 区域滚动
 * */
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
});

/**
 * 如果需要 a 标签链接跳转
 * a 标签链接
 * */
mui('a').each(function(){
    this.addEventListener('tap',function(){
        var url = this.href;
        if(url){
            document.location.href=url;
            return;
        }
    })
})


/**
 * 阻止手势侧滑
 * */
function stopPro(){
    var offCanvasInner = document.querySelector('.mui-inner-wrap');
    if(offCanvasInner){
        offCanvasInner.addEventListener('drag', function(event) {
            event.stopPropagation();
        });
    }
    return;
}

