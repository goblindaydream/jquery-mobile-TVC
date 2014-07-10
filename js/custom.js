

// Display the correct units
  var unitSelected = "english"
  
 if (unitSelected !== $('#units').val()) {
    $(".englishUnits").hide();
    $(".metricUnits").show();
 }else{
    $(".englishUnits").show();
    $(".metricUnits").hide();
 }

$('#units').bind('change', function () {
 if (unitSelected !== $(this).val()) {
    $(".englishUnits").hide();
    $(".metricUnits").show();
 }else{
    $(".englishUnits").show();
    $(".metricUnits").hide();
 }
});
// END Display the correct units
    