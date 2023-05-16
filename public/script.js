$(document).ready(function(){  

    $(".filter-part > .btn").click(function(){
      $(".filter-body").slideDown();
    });

    $(".close-btn").click(function(){
      $(".filter-body").slideUp();
    });

    $(".order-btn").click(function(){
      $(".order-btn > .dropdown").fadeToggle();
    });
});



