$(function () {
    banner();
})
var banner = () => {
//    获取轮播图数据
//    判断是否已经做了数据缓存
//    利用模板引擎渲染到界面
//    页面大小改变重新渲染
//    移动端手势切换 touchstart touchmove touchend
    var getData= (callback) => {
        if(window.data){
            callback && callback(window.data);
            return
        }
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            dataType: 'json',
            data: '',
            success(data) {
                window.data = data;
                callback && callback(window.data);
            },
        })
    };
    var render = () => {
        console.log('render')
        getData((data) => {
            let isMobile = $(window).width() < 768;
            var pointHtml = template('pointTemplate',{list: data});
            var imgHtml = template('imgTemplate',{list: data,isMobile: isMobile});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imgHtml);
        })
    };
    $(window).on('resize',() => {
        console.log('resize');
        render();
    }).trigger('resize');
}
