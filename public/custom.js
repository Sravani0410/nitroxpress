$(document).ready(function(){ 
   
    $('.client-slider').owlCarousel({
        loop:true,
        autoplay:true,
        margin:10,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5 
            }
        }
    });
        

    $('.testimonials-slider').owlCarousel({
        loop:true,
        autoplay:true,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });


    $(window).scroll(function(){
      var sticky = $('.main-header'),
          scroll = $(window).scrollTop();
    
      if (scroll >= 100) sticky.addClass('sticky-header');
      else sticky.removeClass('sticky-header');
    });
    

   

    //----------JQuery-----------------//

    $(function(){
        flag=0;
        $('.next_slid').click(function(){
          if(flag == 0){
            $('.slide3').addClass('active');
            $('.slide1').removeClass('active');
            $('.c1').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c2').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c3').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});
            flag = 1;
          } else if(flag == 1){
            $('.slide2').addClass('active');
            $('.slide3').removeClass('active');
            $('.c3').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c1').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c2').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});
            
            flag = 2;
          }else if(flag == 2){
            $('.slide1').addClass('active');
            $('.slide2').removeClass('active');
            $('.c2').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c3').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c1').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});
            
            flag = 0;
          }
          
        });

        
       

        $('.back_slid').click(function(){
          if(flag == 0){
            $('.slide2').addClass('active');
            $('.slide1').removeClass('active');
            $('.c3').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c1').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c2').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});
            
            flag = 1;
          } else if(flag == 1){
            $('.slide3').addClass('active');
            $('.slide2').removeClass('active');
            $('.c1').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c2').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c3').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});
            
            flag = 2;
          }else if(flag == 2){
            $('.slide1').addClass('active');
            $('.slide3').removeClass('active');
            $('.c2').css({'transform':'translateX(-100px) scale(1)','z-index':'9'});
            $('.c3').css({'transform':'translateX(100px) scale(1)','z-index':'9'});
            $('.c1').css({'transform':'translateX(0) scale(1.5)','z-index':'99'});            
            flag = 0;
          }
        });
      });

      
      
});



