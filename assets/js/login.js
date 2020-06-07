        //入口函数
        $(function () {

            $('.goto-register').click(function () {
                $('.login').hide().next().show()
            })

            $('.goto-login').click(function () {
                $('.login').show().next().hide()
            })

            //注册功能
            $('.login form').on('submit', function (e) {
                e.preventDefault()
                var data = $(this).serialize()

                $.ajax({
                    type: "POST",
                    url: 'http://www.liulongbin.top:3007/api/reguser',
                    data: data,
                    success: function (res) {
                        alert(res.message)
                        if (res.status === 0) {
                            $('.login').show().next().hide()
                        }
                    }
                });
            })
        })