const form = document.querySelector('form');
const errorText = document.querySelector('.errorText');
const urlArr = (window.location.href).split('/');
const gameId = urlArr[urlArr.length - 1];
getData(gameId);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorText.textContent = '';

    const title = form.title.value;
    const description = form.description.value;
    const level = form.level.value;
    const imageLink = form.imageLink.value;
    const pageLink = form.pageLink.value;

    try{
        const res = await fetch('/update-game', {
            method: 'POST',
            body: JSON.stringify({gameId, title, description, level, imageLink, pageLink}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.error){
            errorText.textContent = "Something went wrong!";
        }
        if (data.game){
            location.assign('/games');
        }
    }
    catch(err){
        console.log(err);
    }
});

function getData(gameId){
    $.ajax({
        url: '/game/'+ gameId,
        type: 'GET',
        headers: {
            "Content-Type":"application/json"
        },
        success: (response) => setData(response)
    });


    function setData(response) {
        form.title.value = response.title;
        form.description.value = response.description;
        form.level.value = response.level;
        form.imageLink.value = response.imageLink;
        form.pageLink.value = response.pageLink;
    }
}