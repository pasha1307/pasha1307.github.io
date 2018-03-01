(function () {
    var slides = document.querySelector('#w_slides');
    var nextBtn = document.querySelector('#next');
    var prevBtn = document.querySelector('#prev');
    var stopBtn = document.querySelector('#btn_stop');
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    // get the data to promise
    var photos = axios.get('./data.json').then(resp => {
        return resp.data;
    });
    photos.then(arr => {
        let imgs = '';
        let indx = 0;
        let show = true;
        // get images to the DOM
        arr.map((item) => {
            imgs += `<div class="show animated">
                <img src= ${item.img} />
                <p class="caption">${item.caption} - ${item.id}</p>
            </div>`
            console.log(item.img);
        });
        slides.innerHTML = imgs;
        const imgs_set = document.getElementsByClassName('show');
        // main function to toggle display property and hide initial img
        const onChange = () => {
            for (let i = 0; i < imgs_set.length; i++) {
                imgs_set[i].style.display = 'none';
            }
            indx++;
            if(indx > imgs_set.length) {indx = 1 ;}
            imgs_set[indx-1].style.display = 'block';
            document.querySelector('#img_init').style.display = 'none';
        }
        // previous image change
        const myPrev = () => {
            for (let i = imgs_set.length -1; i > 0; i--) {
                imgs_set[i].style.display = 'none';
            }
            indx--;
            console.log(indx,imgs_set.length);
            if (indx == 0) {
                imgs_set[0].style.display = 'block';
            } else if (indx < 0) {
                imgs_set[0].style.display = 'none';
                indx = imgs_set.length -1;
            }
            imgs_set[indx].style.display = 'block';
        }
        // Set Interval for 2s
        let inter = setInterval(onChange, 2000);
        console.log('Inter', inter);
        // Add Events and manipulate buttons rendering
        stopBtn.addEventListener('click',  () => {
            if(inter) {
                clearInterval(inter);
                show = true;
                console.log('Clicked', show);
                nextBtn.style.display = 'inline-block';
                prevBtn.style.display = 'inline-block';
                stopBtn.style.display = "none"
            }

        })
        nextBtn.addEventListener('click', () => onChange());
        prevBtn.addEventListener('click', () => myPrev());

    });
})()

