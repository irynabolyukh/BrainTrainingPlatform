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

function setStatistic(data) {
    let $statDiv = $("#my-statistic");
    $statDiv.empty();
    $statDiv.append("<p>У день: " + data.scorePerDay + "<p>" +
        "<p>У місяць: " + data.scorePerMonth + "<p>" +
        "<p>У рік: " + data.scorePerYear + "<p>"
    );
}

function setTop(data) {
    let $appShow = $("#top");
    $appShow.empty();
    if(data.length > 2){
        for(let i = 0; i < 3; i++){
            $appShow.append(
                "<p>" + data[i].score
                + " cls : " + getName(data[i].email) + "</p>"
            );
        }
    }
    else{
        data.forEach((player) => {
            $appShow.append(
                "<p>" + player.score
                + " cls : " + getName(player.email) + "</p>"
            );
        });
    }
}

function getStatistic() {
    $.ajax({
        url: '/my-statistic',
        type: 'GET',
        headers: {
            "Content-Type":"application/json"
        },
        success: (response) => setStatistic(response),
        complete: function(data){
            setTimeout(getStatistic,5000);
        }
    });
}

function getName(email){
    return email.substring(0, email.lastIndexOf("@"))
}

$(document).ready(function(){
    fetchdata();
    getStatistic();
});