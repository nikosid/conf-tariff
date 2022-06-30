window.onload = function() {

  setTimeout(function () {
   let loader = document.querySelector('.loader');
   loader.parentNode.removeChild(loader);
  }, 500);


  function autoPlayYouTubeModal() {
    let triggerOpen = document.querySelectorAll('[data-tagVideo]');
    triggerOpen.forEach(function(element, key){
    	if(element) {
          let theModal = element.getAttribute("data-bs-target");
          let videoSRC = element.getAttribute("data-tagVideo");
          let videoSRCauto = videoSRC + "?autoplay=1";
    
          element.addEventListener('click', function() {
            document.querySelector(theModal + ' iframe').setAttribute('src', videoSRCauto);
          });
          document.querySelector(theModal + ' button.btn-close').addEventListener('click', function() {
            document.querySelector(theModal + ' iframe').setAttribute('src', '');
          });
        }
    });
    
    
  }

  autoPlayYouTubeModal();

  let btnTariffs = document.querySelector('.tariff-btn a');
  let wrapCompare = document.querySelector('.compare__wrap');
  if(btnTariffs) {
    btnTariffs.addEventListener('click', function() {
      setTimeout(function() {
        wrapCompare.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
      
    });
  }
  
 
   //tabs
   let tabs = document.querySelectorAll('.program-tabs .tab');
   let tabText = document.querySelectorAll('.tabs .tab');
   let tabActive = document.querySelector('.tabs .tab.active');
   let bg1 = document.querySelector('.programs__bg .roundlight-2');
   let bg2 = document.querySelector('.programs__bg .roundlight-3');
   let bg3 = document.querySelector('.programs__bg .crypro');
   if(tabActive) {
    let checkHeight = tabActive.clientHeight;
     if(checkHeight < 1400) {
         bg1.classList.add('d-none');
         bg2.classList.add('d-none');
         bg3.classList.add('d-none');
     } else {
         bg1.classList.remove('d-none');
         bg2.classList.remove('d-none');
         bg3.classList.remove('d-none');
     }
     if(checkHeight > 650) {
        bg3.classList.remove('d-none');
      } else {
        bg3.classList.add('d-none');
      }
   }

   for (let i=0; i<tabs.length;i++) {
    tabs[i].addEventListener("click", function(e) {
       
      tabs[i].classList.add('active');
      tabText[i].classList.add('active');
      for (let m=0; m<tabs.length;m++) {
          if(i != m) {
              tabs[m].classList.remove('active');
          }
      }
      for (let m=0; m<tabText.length;m++) {
          if(i != m) {
              tabText[m].classList.remove('active');
          }
      }
      checkHeight = tabText[i].clientHeight;
      if(checkHeight < 1400) {
          bg1.classList.add('d-none');
          bg2.classList.add('d-none');
      } else {
          bg1.classList.remove('d-none');
          bg2.classList.remove('d-none');
      }
      if(checkHeight > 650) {
        bg3.classList.remove('d-none');
      } else {
        bg3.classList.add('d-none');
      }
       
      return false;
    });
  }

  function setHeight() {
    let timeLine = document.querySelectorAll('.time-line');

    for (let i=0; i<timeLine.length;i++) {
      let tab = timeLine[i].closest('.tab');
      let heightTab = tab.clientHeight;
      let lastEl = tab.querySelector('.tab-item:last-child');
      let heightLastEl = lastEl.clientHeight;
      let heightTimeLine = heightTab - heightLastEl;
      timeLine[i].style.height = heightTimeLine + "px";
    }
  }

  setHeight();

  //scroll
  const container = document.querySelectorAll('.sponsor-modal .modal-body');
  for (let i=0; i<container.length;i++) {
    const ps = new PerfectScrollbar(container[i]);
  }

  window.addEventListener('resize', function(event) {
        setHeight();
  }, true);

 //set form name
 let btns = document.querySelectorAll('.sp-block__btns .art-button-4');
 let formnameValue = document.querySelector('input[name="form-name"]');
 for (let i=0; i<btns.length;i++) {
    btns[i].addEventListener("click", function(e) {
        let formname = this.closest('.sp-block__item').querySelector('.sp-block__title').innerHTML;
        formnameValue.value = 'Стать спонсором. ' + formname;
    });
}

let btnsTariff = document.querySelectorAll('.tariff-card-bottom .art-button-4');
let formnameValueTariff = document.querySelector('input[name="form-name"]');
for (let i=0; i<btnsTariff.length;i++) {
    btnsTariff[i].addEventListener("click", function(e) {
        let formname = this.closest('.tariff-card');
        if(formname) {
          formname = formname.querySelector('.tariff-card-title').innerHTML;
          formnameValueTariff.value = 'Страница Тарифы. ' + formname;
        } else {
          formnameValueTariff.value = 'Страница Тарифы. Специальный проект';
        }
        
    });
}

 //send form
 let form = document.querySelector('#callback');
 if(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', '/tariff/mail.php', true);
    request.send(formData);
    request.addEventListener('readystatechange', function() {
      if (this.readyState == 4 && this.status == 200) {
       //console.log(this.responseText)
       let data = JSON.parse(this.responseText);
        if(data.success == 1) {
           //console.log('Форма отправлена');
           form.classList.add('d-none');
           form.closest('.form-wrapper').querySelector('.message').classList.remove('d-none');
           form.closest('.modal-content').querySelector('.modal-title').classList.add('d-none');
        } else {        
         document.querySelector('#callback input[name="username"]').classList.add(data.username);
         document.querySelector('#callback input[name="email"]').classList.add(data.email);
        }
        
      }
    });
  });
 }
 
 let inputs = document.querySelectorAll('#callback input');
 for (let i=0; i<inputs.length;i++) {
  inputs[i].addEventListener('change', function() {
    this.classList.remove('is-invalid');
    if(this.getAttribute('name') == 'username' && this.value.length > 2) {
      this.classList.add('is-valid');
    } else {
      this.classList.remove('is-valid');
    }
    if(this.getAttribute('name') == 'email') {
      let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
      let valid = re.test(this.value);
      if(valid) {
        this.classList.add('is-valid');
      } else {
        this.classList.remove('is-valid');
      }
    } 
  });

  inputs[i].addEventListener('keydown', function() {
    this.classList.remove('is-invalid');
  });
 }
 
 /*Timer*/
     function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
     
    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');
      
      function updateClock() {
        var t = getTimeRemaining(endtime);
        daysSpan.innerHTML = ('0' + t.days).slice(-2);;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
     
      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }
    
    var deadline="July 05 2022 10:00:00 GMT+0300";
    if ( document.getElementById('countdown') ) {
        initializeClock('countdown', deadline);
    }
    
    
    /*referal*/
    var paramsString = document.location.search;
    var searchParams = new URLSearchParams(paramsString);
    var refID = searchParams.get("ref");
    var discount = searchParams.get("dsc");
    var refList = 'exex,drdr,fgfg,htht,erer,svsv,dxrt,fgty,dhey,sjwu,wjen,thfn,qrqt,qtqy,qwqe,qaqs,qsqd,qdqf,qfqg,qhqj,wewr,wrwt,wywu,waws,wswd,wdwf,wfwg,wgwh,zxzc,zxzv,zszd,zazs,zfzg,zvzb,vrvt,vevw,vwvq,zwze';
    var refArr = refList.split(',');
    if ( refArr.indexOf(refID) >= 0 ) {
        if (  discount == '10' || discount == '15' ) {
            var access = document.getElementById('access');
            var silver = document.getElementById('silver');
            var gold = document.getElementById('gold');
            var platinum = document.getElementById('platinum');
            var trade = document.getElementById('trade');
            var satoshi = document.getElementById('satoshi');
            
            function changeCardPrice(item, id, refID, percent) {
                console.log(item);
                
                var currPrice = parseInt(item.querySelector('.curr__price').textContent.replace(/ /g,''));

                let oldPrice = document.createElement("div");
                oldPrice.className = 'access__price old__price';
                oldPrice.innerHTML = `${currPrice.toLocaleString()}₽`;
                
                if ( item.querySelector('.access__online') ) {
                   item.querySelector('.access__online').append(oldPrice); 
                }
                
                if ( item.querySelector('.tariff__online') ) {
                   item.querySelector('.tariff__online').append(oldPrice); 
                }
                
                
                var nPrice = currPrice - currPrice*percent/100;
                var newPrice = Math.round(nPrice/10)*10;
                newPrice = newPrice.toLocaleString();
                item.querySelector('.curr__price').textContent = newPrice +'₽';
                item.querySelector('.art-button-4').setAttribute('href', "https://my.bitbrain.me/buy-course/"+id+"?ref="+refID+"");
                
                
            }
            
            if ( discount == '10' ) {
                if ( refID == 'dxrt' ) {
                    changeCardPrice(access, '522640', refID, 0);
                    changeCardPrice(silver, '522642', refID, 0);
                    changeCardPrice(gold, '522645', refID, 0);
                    changeCardPrice(platinum, '522643', refID, 0);
                    changeCardPrice(trade, '522641', refID, 0);
                    changeCardPrice(satoshi, '522644', refID, 0);
                } else {
                    changeCardPrice(access, '524321', refID, 10);
                    changeCardPrice(silver, '524325', refID, 10);
                    changeCardPrice(gold, '524216', refID, 10);
                    changeCardPrice(platinum, '524217', refID, 10);
                    changeCardPrice(trade, '524218', refID, 10);
                    changeCardPrice(satoshi, '524219', refID, 10);
                }
                
            }
            if ( discount == '15' ) {
                changeCardPrice(access, '524323', refID, 15);
                changeCardPrice(silver, '524327', refID, 15);
                changeCardPrice(gold, '524212', refID, 15);
                changeCardPrice(platinum, '524213', refID, 15);
                changeCardPrice(trade, '524214', refID, 15);
                changeCardPrice(satoshi, '524215', refID, 15);
            }
        }
    }
    
    
    var isSwiper = document.querySelector('.mySwiper');
    if ( isSwiper ) {
         var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      });
    }
   

}

$( document ).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
		loop: true,
		autoFocus: false
	});
});
