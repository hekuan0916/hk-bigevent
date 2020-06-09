$(function () {
    getUserInfo();

    //退出功能
    $('.logout').click(function () {

        layer.confirm('你确定退出吗?'), {
                icon: 3,
                title: '提示'
            },
            function (index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            }
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

                    $(".text-Icon").text(t).css("display", "inline-block");

                    $(".layui-nac-img").hide();
                }
            }
        },

        complete: function (xhr) {

            if (xhr.responseJSON.status === 1) {

                localStorage.removeItem('token')

                location.href = '/login.html'
            }
        },
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
    });
}