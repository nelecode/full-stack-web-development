// $("h1").css("color","blue");
// alert("hello");

// console.log($("h1").css("color"));
// console.log($("h1").css("font"));
// $("h1").addClass("big-title marging-50");
// $("h1").hasClass("marging-50");
// console.log($("h1").hasClass("marging-50"));
// $("h1").removeClass("marging-50");

// $("h1").text("bye");
// $("button").text("dont click me");
// $("button").html("<em>click</>");

// $("a").attr("href","https://www.facebook.com");
// console.log($("a").attr("href"));
// console.log($("h1").attr("class"));


// adding function using jq

// $("h1").click(function(){
//     $("h1").css("color","blue");
// })

// click eventlistener without jq

// for(var i=0; i<5;i++){
//     document.querySelectorAll("button")[i].addEventListener("click",function(){
//         document.querySelector("h1").style.color = "red";
//     })
// }

// same eventlistener with jq
// $("button").click(function() {
//     $("h1").css("color","yellow");
// });

// keypress eventlistener using jq
// $("input").keypress(function(event){
//     console.log(event.key);
// });

// $("input").keypress(function(event){
//         $("h1").text(event.key);
// });

// another way of eventlistener function
// $("h1").on("mouseover",function(){
//     $("h1").css("color","purple");
// });

// adding and removing elements
// $("h1").before("<button>new</button");
// $("h1").after("<button>new</button");
// $("h1").prepend("<button>new</button");
// $("h1").append("<button>new</button");

// $("button").remove();

// website animation with jq
// $("button").on("click",function(){
//     $("h1").hide();
// });
// $("button").on("click",function(){
//     $("h1").show();
// });
// $("button").on("click",function(){
//     $("h1").toggle();
// });
// $("button").on("click",function(){
//     $("h1").fadeOut();
// });
// $("button").on("click",function(){
//     $("h1").fadeIn();
// });
// $("button").on("click",function(){
//     $("h1").fadeToggle();
// });
// $("button").on("click",function(){
//     $("h1").slideUp();
// });
// $("button").on("click",function(){
//     $("h1").slideDown();
// });
// $("button").on("click",function(){
//     $("h1").slideToggle();
// });
// $("button").on("click",function(){
//     $("h1").animate({opacity:0.5});
// });
// $("button").on("click",function(){
//     $("h1").animate({margin:20});
// });
// $("button").on("click",function(){
//     $("h1").animate({margin:"20%"});
// });
$("button").on("click",function(){
        $("h1").slideUp().slideDown().animate({opacity:0.5});
    });