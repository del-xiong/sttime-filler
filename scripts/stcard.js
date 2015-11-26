
var stepId = 0;
var ele = null;
var clearAct = false;

var steps = [{
  requirement: function() {
    ele = $('#pload_backgroundElement');
    if(!ele)
      return true;
    return ele[0].style.display === 'none'?true:false;
  },
  action: function() {
  }
},
{
  requirement: function() {
    ele = $('#Content_UI_ddlCustomer');
    return ele?true:false;
  },
  action: function() {
    ele.val('TCT Mobile International');
    ele[0].dispatchEvent(new CustomEvent('change'));
  }
},
{
  requirement: function() {
    ele = $('#Content_UI_ddlProject');
    var options = ele.find('option');
    return options.length>1?true:false;
  },
  action: function(){
    var options = ele.find('option');
    var v = options[1].getAttribute('value');
    ele.val(v);
    ele[0].dispatchEvent(new CustomEvent('change'));
  }
},
{
  requirement: function() {
    ele = $('#Content_UI_ddlTask');
    var options = ele.find('option');
    return options.length>1?true:false;
  },
  action: function(){
    var options = ele.find('option');
    if(options[1].textContent === 'General Billable')
      ele.val(options[1].getAttribute('value'));
    ele[0].dispatchEvent(new CustomEvent('change'));
  }
},
{
  requirement: function() {
    if(ele!=''){
      ele = '';
      return false;
    }else
    return true;
  },
  action: function(){
    for(var i in workDaySelectId) {
      var hrsSelect = $('#'+workDaySelectId[i]);
      hrsSelect.val('08:00');
      hrsSelect[0].dispatchEvent(new CustomEvent('change'));
      var btn = $('input[name="'+workDayCloBtn[i]+'"]')[0];
      btn.click();
    }
  }
}];

function init() {
  if(clearAct)
    return;
  if(steps[stepId]) {
    var state = steps[stepId].requirement();
    if(state) {
      var callback = steps[stepId].action;
      callback();
      stepId ++;
      init();
    }else
    setTimeout(function(){init();},500);
  }
}

function reboot(){
  clearAct = true;
  var fs = $('#Content_UI_ddlCustomer');
  fs.val('0');
  fs[0].dispatchEvent(new CustomEvent('change'));
  setTimeout(function(){
    stepId = 0;
    clearAct = false;
    init();
  },1000);
}

$(document).ready(function(){
  init();
  var jqDock = document.querySelector('.jqDock');
  var d = document.createElement('div');
  d.setAttribute('style','position: relative; padding: 0px 6px; margin: 0px; border: 0px none; float: left; filter: inherit; background-color: transparent;');
  d.className = 'jqDockItem jqDockMouse7';
  d.innerHTML='<div style="position: relative; padding: 0px; margin: 0px; border: 0px none; height: 48px; width: 48px; filter: inherit; background-color: transparent;"><img id="Payout" src="Content/stTimeImages/Payout.png" data-title="Payout" alt="" class="pad_img jqDockMouse6" data-hasqtip="6" aria-describedby="qtip-6" style="position: relative; padding: 0px; margin: 0px; border-width: 0px; border-style: none; vertical-align: top; display: block; width: 100%; height: 100%; filter: inherit;"><div class="jqDockLabel jqDockLabelImage" style="position: absolute; margin: 0px; display: none; filter: inherit;"><div class="jqDockLabelText" style="filter: inherit;"></div></div></div>';
  d.onclick = function(){
    reboot();
  }
  jqDock.appendChild(d);
});