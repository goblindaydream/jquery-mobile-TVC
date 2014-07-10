//NOTE: THIS does not refere to the same SVG as the TankSample currently in the index.html. 
//This should replace that one as the real SVG file as the "sample" one is a random height that may be more difficult to calculate.

// total height of bottom ASME shape = 164
// v full = 0
// v empty = 1000
// v filling only the ASME bottom shape = 836  (1000 - 164)


$(function(){
     var waterLevel = $("#tankTestFill").attr('d');
     $("#defaultButton").click(function() { 
         $("#tankTestFill").attr("d", waterLevel); 
     }); 
 });

$('#emptyButton').click(function() {
     $("#tankTestFill").attr('d', 'M0.375,0v819.491C0.375,912.563,168.101,1000,375,1000c206.902,0,374.625-89.363,374.625-180.509 	V1000H0.375z');
          
});

$('#bottomFilledButton').click(function() {
     $("#tankTestFill").attr('d', 'M0.375,0v819.491C0.375,912.563,168.101,1000,375,1000c206.902,0,374.625-89.363,374.625-180.509 	V836H0.375z');
          
});

$('#fullButton').click(function() {
     $("#tankTestFill").attr('d', 'M0.375,0v819.491C0.375,912.563,168.101,1000,375,1000c206.902,0,374.625-89.363,374.625-180.509	V0H0.375z');
          
});

$('#halfFullButton').click(function() {
     $("#tankTestFill").attr('d', 'M0.375,0v819.491C0.375,912.563,168.101,1000,375,1000c206.902,0,374.625-89.363,374.625-180.509 	V500H0.375z');
          
});