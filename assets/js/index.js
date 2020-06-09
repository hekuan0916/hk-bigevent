$(function () {
    getUserInfo();

    //退出功能
    $('.logout').click(function () {

        layer.confirm('你确定退出吗?', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            })
    })
});

function getUserInfo() {
    $.ajax({
        url: "http://www.liulongbin.top:3007/my/userinfo",
        success: function (response) {
            if (response.status === 0) {
                var myname = response.data.nickname || response.data.username;

                $(".myname").text(myname);

                if (response.data.user_pic) {
                    $(".layui-nav-img").attr("src", response.data.user_pic).show();
                    $(".text-Icon").hide();
                } else {
                    var t = myname.substr(0, 1).toUpperCase();

                    $(".text-Icon").text(t).css("display", "inline-block")

                    $(".layui-nac-img").hide();
                }
            }
        },

        complete: function (xhr) {
            // 这里判断身份认证是否成功
            // console.log(xhr);
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 删除假token
                localStorage.removeItem('token');
                // 跳转到登录页面
                location.href = '/login.html';
            }
        },
        // jQuery中ajax选项，有一个headers，通过他，可以设置请求头
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });
}