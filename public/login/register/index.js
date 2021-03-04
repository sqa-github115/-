$(function() {
    $(".form").Validform({
        tiptype: 2
    });
});
//上传ajax
$('#btn_logon').on('click', function() {
    $(".form").Validform({
        tiptype: 2
    });
    $.ajax({
        url: "/user/register",
        type: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            name: $('#input_name').val(),
            pwd: $("#input_pwd").val(),
            phone: $('#inpt_tel').val()
        }),
        success: function(result) {
            if (result.code === 200) {
                window.location.replace('/login/index.html');
            } else {
                alert(result.msg)
            }
        }
    });
});