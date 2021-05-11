const form = document.querySelector('form');
const errorText = document.querySelector('.errorText');
const urlArr = (window.location.href).split('/');
const postId = urlArr[urlArr.length - 1];
getData(postId);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorText.textContent = '';

    const header = form.header.value;
    const description = form.description.value;
    const imageLink = form.imageLink.value;
    const videoLink = form.videoLink.value;

    try{
        const res = await fetch('/update-post', {
            method: 'POST',
            body: JSON.stringify({header, description, imageLink, videoLink}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.error){
            errorText.textContent = "Something went wrong!";
        }
        if (data.post){
            location.assign('/');
        }
    }
    catch(err){
        console.log(err);
    }
});

function getData(postId) {
    $.ajax({
        url: '/post/' + postId,
        type: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        success: (response) => setData(response)
    });


    function setData(response) {
        form.header.value = response.header;
        form.description.value = response.description;
        form.imageLink.value = response.imageLink;
        form.videoLink.value = response.videoLink;
    }
}