document.addEventListener('DOMContentLoaded', function () {
  const deadline = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

  let timer;

  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timer);
    }
    
    const hours = diff > 0 ? Math.floor(diff / 3600000) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 60000) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

 
    [...$('.counter_hours>.counter_hex>span')].forEach((el) => el.textContent = hours < 10 ? '0' + hours : hours);
    [...$('.counter_minutes>.counter_hex>span')].forEach((el) => el.textContent = minutes < 10 ? '0' + minutes : minutes);
    [...$('.counter_seconds>.counter_hex>span')].forEach((el) => el.textContent = seconds < 10 ? '0' + seconds : seconds) ;

  }

  countdownTimer();
  timer = setInterval(countdownTimer, 1000);
});

const content = [
  {
    img: 'assets/img/visitors_toast.png',
    text: 'Количество посетителей на сайте: </br><span>172</span>',
  },
  {
    img: 'assets/img/call_toast.png',
    text: 'Ольга М. сделала заявку на обратный звонок',
  },
  {
    img: 'assets/img/cart_toast.png',
    text: 'Ольга М. только что совершила покупку на сумму 5600 руб.',
  }
]

const option = 
{
  animation:true, 
  autohide: true,
  delay: 10000,
}


function showToast(){
  const rand = Math.floor(Math.random() * 3);
  const mytoast = $('#toast').toast(option);
  $('#toast_img')[0].src = content[rand].img;
  $('#toast_text')[0].innerHTML = content[rand].text;
  mytoast.toast('show');
}

const toastTimer = setInterval(showToast, 11000);

$('#popup').on('shown.bs.modal', function () {
  $('.header_feedback button').trigger('focus')
})