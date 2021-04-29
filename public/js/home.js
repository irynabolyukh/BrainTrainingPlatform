function fetchdata(){
    $.ajax({
        url: '/top',
        type: 'GET',
        headers: {
            "Content-Type":"application/json"
        },
        success: (response) => setTop(response),
        complete: function(data){
            setTimeout(fetchdata,10000);
        }
    });
}
function setTop(data) {
    let $appShow = $("#top");
    $appShow.empty();
    if(data.length > 2){
        for(let i = 0; i < 3; i++){
            $appShow.append(
                "<tr><td class=\"align-middle\">" + data[i].email
                +"</td><td class=\"align-middle\">" + data[i].score + "</td></tr>"
            );
        }
    }
    else{
        data.forEach((player) => {
            $appShow.append(
                "<tr><td class=\"align-middle\">" + player.email
                + "</td><td class=\"align-middle\">" + player.score + "</td></tr>"
            );
        });
    }
}

$(document).ready(function(){
    fetchdata();
});