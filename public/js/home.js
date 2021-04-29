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
    $statDiv.append("<tr><td class=\"align-middle\">Per Day:</td><td class=\"align-middle\">"
        + data.scorePerDay + "</td></tr>" +
        "<tr><td class=\"align-middle\">Per Month:"
        +"</td><td class=\"align-middle\">" + data.scorePerMonth + "</td></tr>" +
        "<tr><td class=\"align-middle\">Per Year:"
        +"</td><td class=\"align-middle\">" + data.scorePerYear + "</td></tr>"
    );
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

function getStatistic() {
    $.ajax({
        url: '/my-statistic',
        type: 'GET',
        headers: {
            "Content-Type":"application/json"
        },
        success: (response) => setStatistic(response),
        complete: function(data){
            setTimeout(getStatistic,1000);
        }
    });
}

$(document).ready(function(){
    fetchdata();
    getStatistic();
});