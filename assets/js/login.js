        //入口函数
        $(function () {

            $('.goto-register').click(function () {
                $('.login').hide().next().show()
            })

            $('.goto-login').click(function () {
                $('.login').show().next().hide()
            })

            //注册功能
            $('.register form').on('submit', function (e) {
                e.preventDefault()
                var data = $(this).serialize()

                $.ajax({
                    type: "POST",
                    url: 'http://www.liulongbin.top:3007/api/reguser',
                    data: data,
                    success: function (res) {
                        // alert(res.message)
                        layer.msg(res.message);
                        if (res.status === 0) {
                            $(this).hide().next().show()
                        }
                    }
                });
            })

            // 注册表单验证
            var form = layui.form

            form.verify({
                len: [/^[\S]{6,12}$/, '密码长度不对'],

                same: function (val) {
                    var password = $('.pass').val()
                    if (val !== password) {
                        return '两次密码不一致'
                    }
                }
            })

            //登陆 验证
            $('.login form').on('submit', function (e) {
                //阻止跳转
                e.preventDefault()
                var data = $(this).serialize()
                $.ajax({
                    type: "POST",
                    url: 'http://www.liulongbin.top:3007/api/login',
                    data: data,
                    success: function (res) {
                        // console.log(res.message);
                        layer.msg(res.message);

                        // alert(res.message)
                        if (res.status === 0) {
                            location.href = '/index.html'
                            localStorage.setItem('token', res.token)
                        }
                    }
                });
            })
        })