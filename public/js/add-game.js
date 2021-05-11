const form = document.querySelector('form');
const errorText = document.querySelector('.errorText');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorText.textContent = '';

    const title = form.title.value;
    const description = form.description.value;
    const level = form.level.value;
    const imageLink = form.imageLink.value;
    const pageLink = form.pageLink.value;

    try{
        const res = await fetch('/add-game', {
            method: 'POST',
            body: JSON.stringify({title, description, level, imageLink, pageLink}),
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