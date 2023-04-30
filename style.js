// Tooltips trigger
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$(document).ready(function(){
  // Select dropdown customisation
  // $('#select-cat').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
  //   console.log('select changed');
  //   console.log('click ind->'+clickedIndex);
  //   console.log('is select->'+isSelected);
  //   console.log('prev val->'+previousValue);
  //   if(isSelected){  
  //     const curr_sel_val = $("#select-cat").children()[clickedIndex].attributes[0].nodeValue;
  //     const curr_sel = $(this).find("option[value="+curr_sel_val+"]").html();
  //     $(".selected-cat").append("<span data-cat="+curr_sel_val+" onclick=\"removeSelCat(this)\">"+curr_sel+"<i class=\"bi bi-x ms-2\"></i></span>");
  //   }
  //   else{
  //     $(".selected-cat").find("span[data-cat="+curr_sel_val+"]").remove();
  //   }
  // });
  // $('#select-cat').change(function(){
  //   // $('.selected-cat').html('');
  //   var values = $('#select-cat').val();
  //   console.log('on change->'+values);
  //   for(var i = 0; i < values.length; i += 1) {
  //     $(".selected-cat").append("<span data-cat="+values[i]+" onclick=\"removeSelCat(this)\">"+values[i]+"<i class=\"bi bi-x ms-2\"></i></span>");
  // }});
});

// function removeSelCat(item){
//   $(item).remove();
//   var currSelVal = $(item);
//   $("#select-cat").find("[value="+currSelVal.data("cat")+"]").prop('selected',false).trigger("change");
//   $values = $('#select-cat').val();
//   $('#select-cat').selectpicker('deselectAll');
//   $('#select-cat').selectpicker('val', $values);
//   $('#select-cat').selectpicker('render');
// }

// Show More Fields
function showMoreFields(){
  $(".show-more-fields").css("display","block");
  $(".show-more-btn").parent().removeClass("d-flex").hide();
}

//jQuery for steps
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

$(".step").click(function(){
  const selTab = $(this).data("step");
  const sTab = $("fieldset");
  sTab.css("display","none");
  sTab[selTab].style.display = "block";
  currentTab = selTab;
  showTab(currentTab);
});

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = $('fieldset');
  if(x.length){
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {

      $(".prev-btn").css("display","none");
    } else {

      $(".prev-btn").css("display","block");
    }
    if (n == (x.length - 1)) {

      $(".nxt-sub-btn").html("Save");
    } else {

      $(".nxt-sub-btn").html("Next");
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n);
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = $("fieldset");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:

    $("#dashbd-form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  // x = document.getElementsByClassName("tab");
  // y = x[currentTab].getElementsByTagName("input");
  // // A loop that checks every input field in the current tab:
  // for (i = 0; i < y.length; i++) {
  //   // If a field is empty...
  //   if (y[i].value == "") {
  //     // add an "invalid" class to the field:
  //     y[i].className += " invalid";
  //     // and set the current valid status to false
  //     valid = false;
  //   }
  // }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "current" class of all steps...
  var i, x = $(".step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" current", "");
  }
  //... and adds the "current" class on the current step:
  x[n].className += " current";
}

// Dashboard Page

// Rangeslider script
// Setting default values
$( ".rangeSlider" ).each(function(i,val){
  const defMin = $(this).data("defmin");
  const defMax = $(this).data("defmax");
  const minVal = $(this).data("minval");
  const maxVal = $(this).data("maxval");
  $(this).slider({
      range: true,
      min: minVal,
      max: maxVal,
      values: [defMin,defMax]
  });
  $(this).parent().find(".minMaxVal .minVal").html($(this).slider("values", 0));
  $(this).parent().find(".minMaxVal .maxVal").html($(this).slider("values", 1));
});
// Updating the min max values in textbox when slider changes
$(".rangeSlider").on("slide",function(event,ui){
  $(this).parent().find(".minMaxVal .minVal").html(ui.values[0]);
  $(this).parent().find(".minMaxVal .maxVal").html(ui.values[1]);
});