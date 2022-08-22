function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function closeApp() {
  sendMain({ 'sM.close()': 'null' })
}

function minimizeApp() {
  sendMain({ 'sM.minimize()': 'null' })
}

function load_bounds() {
  boundsX = parseInt(localStorage.getItem('boundsX'));
  boundsY = parseInt(localStorage.getItem('boundsY'));
  sendMain({ 'sM.set_bounds()': [boundsX, boundsY] })
}


function save_bounds(bounds) {
  localStorage.setItem('boundsX', bounds[0]);
  localStorage.setItem('boundsY', bounds[1]);
}

window.addEventListener('mousemove', click_thru);
function click_thru(e) {
  coords = [e.pageX, e.pageY]
  sendMain({ 'sM.mouse_move()': coords });
}


function sendMain(message) {
  window.api.send("toMain", JSON.stringify(message));
}

window.api.receive("toRender", (data) => {
  var values = JSON.parse(data);
  var keys = Object.keys(values);
  var call = keys[0];

  if (call == 'sR.save_bounds()') {
    bounds = values['sR.save_bounds()']
    save_bounds(bounds);
  }

  if (call == 'sR.close()') {
    save_menu_pos();
    save_di_pos();
    save_zoom_level();
    eel.terminate();
  }

  if (call == 'sR.err_in_main()') {
    console.log(values['sR.err_in_main()']);
  }
});





let is_mgdl;
let temp_is_mgdl;
let vibe_check = false;


di = document.getElementById('display_info');
entire_menu = document.getElementById('menu_wrapper');
entire_hitbox = document.getElementById('full_hitbox');
entire_hitbox.addEventListener('mouseleave', passive_menu);
entire_hitbox.addEventListener('mouseenter', passive_menu);
entire_hitbox.addEventListener('click', passive_menu);
entire_menu.addEventListener('mouseleave', passive_menu);
entire_menu.addEventListener('mouseenter', passive_menu);

let active = true;

function inc() {
  if (active == false) {
    entire_menu.style.opacity = 0;
  }
}

function passive_menu(e) {
  if (e["type"] == "mouseenter") {
    entire_menu.style.opacity = 1;
    active = true;
  }
  if (e["type"] == "mouseleave") {
    active = false;
    idlething = setTimeout(inc, 10000)
  }
}

move_detect = document.getElementById('move_detect');
move_detect.addEventListener('mouseenter', move_icon_detect);
move_detect.addEventListener('mouseleave', move_icon_detect);

function move_icon_detect(e) {
  entire_menu.style.opacity = 1;
  active = true;
}



entire_dexcom = document.getElementById('dexcom');
zoom_in.addEventListener('click', zoom_in_dexcom);
zoom_out.addEventListener('click', zoom_out_dexcom);

function zoom_in_dexcom(e) {
  zoom_level = parseFloat(window.getComputedStyle(entire_dexcom).zoom);
  if ((zoom_level + 0.05) > 1.4) {
    return
  }
  entire_dexcom.style.zoom = zoom_level + 0.05;
}

function zoom_out_dexcom(e) {
  zoom_level = parseFloat(window.getComputedStyle(entire_dexcom).zoom);
  entire_dexcom.style.zoom = zoom_level - 0.05;
}

function load_zoom_level() {
  zl = localStorage.getItem('zoom');
  entire_dexcom.style.zoom = zl;
}

function save_zoom_level() {
  localStorage.setItem('zoom', parseFloat(window.getComputedStyle(entire_dexcom).zoom));
}



let menu_dragging = false;
let di_dragging = false;

settings = document.getElementById('settings');
zoom_in = document.getElementById('zoom_in');
zoom_out = document.getElementById('zoom_out');
move = document.getElementById('move');
move_icon = document.getElementById('move_icon');
move_icon_hitbox = document.getElementById('move_icon_hitbox');
menu = document.getElementById('menu');
menu.addEventListener('click', menu_expand);
menu_icon = document.getElementById("menu_icon");
close_icon = document.getElementById("close_icon");
function menu_expand(e) {
  open = menu.getAttribute('data-open');
  if (!menu_dragging) {
    if (open == 'false') {
      menu.classList.remove('pop_up');
      menu_icon.classList.remove("menu_icon_appear");
      close_icon.classList.remove("close_icon_disappear");
      settings.classList.remove('settings_dissolve');
      settings_icon.classList.remove('settings_icon_dissolve');
      move.classList.remove('move_dissolve');
      move_icon.classList.remove('move_icon_dissolve');
      move_detect.classList.remove('move_detect_dissolve');
      move_icon_hitbox.classList.remove('move_icon_hitbox_dissolve');
      zoom_in.classList.remove('zoom_in_dissolve');
      zoom_in_icon.classList.remove('zoom_in_icon_dissolve');
      zoom_out.classList.remove('zoom_out_dissolve');
      zoom_out_icon.classList.remove('zoom_out_icon_dissolve');


      menu.classList.add('pop_down');
      menu_icon.classList.add("zoom_out_icon_disappear");
      close_icon.classList.add("close_icon_appear");
      settings.classList.add('settings_expand');
      settings_icon.classList.add('settings_icon_appear');
      move.classList.add('move_expand');
      move_icon.classList.add('move_icon_appear');
      move_detect.classList.add('move_detect_appear');
      move_icon_hitbox.classList.add('move_icon_hitbox_appear');
      zoom_in.classList.add('zoom_in_expand');
      zoom_in_icon.classList.add('zoom_in_icon_appear');
      zoom_out.classList.add('zoom_out_expand');
      zoom_out_icon.classList.add('zoom_out_icon_appear');

      zoom_in.style.pointerEvents = 'auto';
      zoom_out.style.pointerEvents = 'auto';
      settings.style.pointerEvents = 'auto';

      menu.setAttribute('data-open', 'true');
      sleep(1);
      menu_icon.style.opacity = 0;
    }
    else if (open == 'true') {
      menu.classList.remove('pop_down');
      menu_icon.classList.remove("menu_icon_disappear");
      close_icon.classList.remove("close_icon_appear");
      settings.classList.remove('settings_expand');
      settings_icon.classList.remove('settings_icon_appear');
      move.classList.remove('move_expand');
      move_icon.classList.remove('move_icon_appear');
      move_detect.classList.remove('move_detect_appear');
      move_icon_hitbox.classList.remove('move_icon_hitbox_appear');
      zoom_in.classList.remove('zoom_in_expand');
      zoom_in_icon.classList.remove('zoom_in_icon_appear');
      zoom_out.classList.remove('zoom_out_expand');
      zoom_out_icon.classList.remove('zoom_out_icon_appear');

      menu.classList.add('pop_up');
      menu_icon.classList.add("menu_icon_appear");
      close_icon.classList.add("close_icon_disappear");
      settings.classList.add('settings_dissolve');
      settings_icon.classList.add('settings_icon_dissolve');
      move.classList.add('move_dissolve');
      move_icon.classList.add('move_icon_dissolve');
      move_detect.classList.add('move_detect_dissolve');
      move_icon_hitbox.classList.add('move_icon_hitbox_dissolve');
      zoom_in.classList.add('zoom_in_dissolve');
      zoom_in_icon.classList.add('zoom_in_icon_dissolve');
      zoom_out.classList.add('zoom_out_dissolve');
      zoom_out_icon.classList.add('zoom_out_icon_dissolve');

      zoom_in.style.pointerEvents = 'none';
      zoom_out.style.pointerEvents = 'none';
      settings.style.pointerEvents = 'none';

      menu.setAttribute('data-open', 'false');
    }
  }
}

function colliding(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height) < (bRect.top)) ||
    (aRect.top > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))
  );
}

bleft = document.getElementById("bleft");
bright = document.getElementById("bright");
btop = document.getElementById("btop");
bbottom = document.getElementById("bbottom");
function menu_is_colliding() {
  if (colliding(menu, bleft)) {
    return bleft;
  }
  if (colliding(menu, bright)) {
    return bright;
  }
  if (colliding(menu, btop)) {
    return btop;
  }
  if (colliding(menu, bbottom)) {
    return bbottom;
  }
  return false;
}


menu_drag(menu);
function menu_drag(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    menu_dragging = false;
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    open = menu.getAttribute('data-open');
    if (open == 'false') {
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    menu_dragging = true;
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    collision = menu_is_colliding();
    if ((collision == bleft)) {
      if (pos1 > 0)
        pos1 = 0;
    }
    if ((collision == bright)) {
      if (pos1 < 0)
        pos1 = 0;
    }
    if ((collision == btop)) {
      if (pos2 > 0)
        pos2 = 0;
    }
    if ((collision == bbottom)) {
      if (pos2 < 0)
        pos2 = 0;
    }

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    move.style.top = (move.offsetTop - pos2) + "px";
    move.style.left = (move.offsetLeft - pos1) + "px";
    zoom_in.style.top = (zoom_in.offsetTop - pos2) + "px";
    zoom_in.style.left = (zoom_in.offsetLeft - pos1) + "px";
    zoom_out.style.top = (zoom_out.offsetTop - pos2) + "px";
    zoom_out.style.left = (zoom_out.offsetLeft - pos1) + "px";
    settings.style.top = (settings.offsetTop - pos2) + "px";
    settings.style.left = (settings.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function save_menu_pos() {
  menu_pos = {
    'menu': [(window.getComputedStyle(menu).top), (window.getComputedStyle(menu).left)],
    'move': [(window.getComputedStyle(move).top), (window.getComputedStyle(move).left)],
    'zoom_in': [(window.getComputedStyle(zoom_in).top), (window.getComputedStyle(zoom_in).left)],
    'zoom_out': [(window.getComputedStyle(zoom_out).top), (window.getComputedStyle(zoom_out).left)],
    'settings': [(window.getComputedStyle(settings).top), (window.getComputedStyle(settings).left)]
  }
  localStorage.setItem('menu_pos', JSON.stringify(menu_pos));
}

function load_menu_pos() {
  try {
    menu_pos = JSON.parse(localStorage.getItem('menu_pos'));
    menu.style.top = menu_pos['menu'][0];
    menu.style.left = menu_pos['menu'][1];
    move.style.top = menu_pos['move'][0];
    move.style.left = menu_pos['move'][1];
    zoom_in.style.top = menu_pos['zoom_in'][0];
    zoom_in.style.left = menu_pos['zoom_in'][1];
    zoom_out.style.top = menu_pos['zoom_out'][0];
    zoom_out.style.left = menu_pos['zoom_out'][1];
    settings.style.top = menu_pos['settings'][0];
    settings.style.left = menu_pos['settings'][1];
  }
  catch (err) {
    console.log(err);
  }
}


function di_is_colliding() {
  if (colliding(di, bleft)) {
    return bleft;
  }
  if (colliding(di, bright)) {
    return bright;
  }
  if (colliding(di, btop)) {
    return btop;
  }
  if (colliding(di, bbottom)) {
    return bbottom;
  }
  return false;
}


di_drag(di);
function di_drag(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    di_dragging = false;
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    di_dragging = true;
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    collision = di_is_colliding();
    if ((collision == bleft)) {
      if (pos1 > 0)
        pos1 = 0;
    }
    if ((collision == bright)) {
      if (pos1 < 0)
        pos1 = 0;
    }
    if ((collision == btop)) {
      if (pos2 > 0)
        pos2 = 0;
    }
    if ((collision == bbottom)) {
      if (pos2 < 0)
        pos2 = 0;
    }

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function save_di_pos() {
  di_pos = [(window.getComputedStyle(di).top), (window.getComputedStyle(di).left)]
  localStorage.setItem('di_pos', JSON.stringify(di_pos));
}

function load_di_pos() {
  try {
    function opa(di_opa) {
      if (di_opa['display info']) {
        di.style.opacity = 1;
        di.style.pointerEvents = 'auto';
      }
      else {
        di.style.opacity = 0;
        di.style.pointerEvents = 'none';
      }
    }
    di_pos = JSON.parse(localStorage.getItem('di_pos'));
    di.style.top = di_pos[0];
    di.style.left = di_pos[1];
    eel.get_settings()(opa);
  }
  catch (err) {
    console.log(err);
  }
}






dexcom_body = document.getElementById('dexcom_body');
dexcom_back = document.getElementById('dexcom_back');
dexcom_circle = document.getElementById('dexcom_circle');
main_arrow = document.getElementById('main_arrow');
second_arrow = document.getElementById('second_arrow');

reading_text = document.getElementById('reading');
unit_text = document.getElementById('unit');

di_name_txt = document.getElementById('di_name_txt');
di_time_txt = document.getElementById('di_time_txt');
di_delta_txt = document.getElementById('di_delta_txt');

eel.expose(first_reading);
function first_reading(name, reading, unit, status, trend, time, delta) {
  if (unit == "mg/dL") { is_mgdl = true; } else { is_mgdl = false; }

  di_name_txt.textContent = name;
  di_time_txt.textContent = time;
  di_delta_txt.textContent = delta;
  load_di_pos();

  if (is_mgdl) {
    reading_text.textContent = reading;
    unit_text.textContent = "mg/dL";
  }
  else if (!is_mgdl) {
    reading_text.textContent = (reading * 0.0555);
    unit_text.textContent = "mmol/L";
  }

  if (trend == 'trend unavailable' || trend == 'unable to determine trend') {
    dexcom_body.style.opacity = 0;
  } else { dexcom_body.style.opacity = 1; }

  dexcom_body.style.transform = "rotate(var(--" + trend.replace(/\s+/g, '-').toLowerCase() + "))";
  dexcom_back.style.opacity = 1;
  main_arrow.style.opacity = 1;

  if (trend == "rising quickly" || trend == "falling quickly") {
    second_arrow.style.opacity = 1;
  } else {
    second_arrow.style.opacity = 0;
  }
  if (status == "high") {
    dexcom_circle.style.fill = "var(--high-yellow)";
    unit_text.style.color = "var(--black)";
  }
  else if (status == "low") {
    dexcom_circle.style.fill = "var(--low-red)";
    reading_text.style.color = "var(--white)";
    unit_text.style.color = "var(--white)";
  }
  else {
    dexcom_circle.style.fill = "var(--normal-gray)";
    reading_text.style.color = "var(--black)";
    unit_text.style.color = "var(--black)";
  }
}

eel.expose(new_reading);
function new_reading(name, reading, unit, status, trend, time, delta) {
  if (unit == "mg/dL") { is_mgdl = true; } else { is_mgdl = false; }

  di_name_txt.textContent = name;
  di_time_txt.textContent = time;
  di_delta_txt.textContent = delta;

  if (is_mgdl) {
    reading_text.textContent = reading;
    unit_text.textContent = "mg/dL";
  }
  else if (!is_mgdl) {
    reading_text.textContent = round((reading * 0.0555), 1);
    unit_text.textContent = "mmol/L";
  }

  if (trend == 'trend unavailable' || trend == 'unable to determine trend') {
    dexcom_body.style.opacity = 0;
  } else { dexcom_body.style.opacity = 1; }

  dexcom_body.style.transform = "rotate(var(--" + trend.replace(/\s+/g, '-').toLowerCase() + "))";
  if (trend == "rising quickly" || trend == "falling quickly") {
    second_arrow.style.opacity = 1;
  } else { second_arrow.style.opacity = 0; }

  if (status == "high") {
    dexcom_circle.style.fill = "var(--high-yellow)";
    unit_text.style.color = "var(--black)";
  }
  else if (status == "low") {
    dexcom_circle.style.fill = "var(--low-red)";
    reading_text.style.color = "var(--white)";
    unit_text.style.color = "var(--white)";
  }
  else {
    dexcom_circle.style.fill = "var(--normal-gray)";
    reading_text.style.color = "var(--black)";
    unit_text.style.color = "var(--black)";
  }
}





ous_yes = document.getElementById('ous_yes');
ous_no = document.getElementById('ous_no');
ous_yes.addEventListener('click', ous_yes_click);
ous_no.addEventListener('click', ous_no_click);
function ous_yes_click(e) {
  if (ous_no.checked) {
    ous_no.click();
  }
}
function ous_no_click(e) {
  if (ous_yes.checked) {
    ous_yes.click();
  }
}
mtry_yes = document.getElementById('military_yes');
mtry_no = document.getElementById('military_no');
mtry_yes.addEventListener('click', mtry_yes_click);
mtry_no.addEventListener('click', mtry_no_click);
function mtry_yes_click(e) {
  if (mtry_no.checked) {
    mtry_no.click();
  }
}
function mtry_no_click(e) {
  if (mtry_yes.checked) {
    mtry_yes.click();
  }
}
di_yes = document.getElementById('di_yes');
di_no = document.getElementById('di_no');
di_yes.addEventListener('click', di_yes_click);
di_no.addEventListener('click', di_no_click);
function di_yes_click(e) {
  if (di_no.checked) {
    di_no.click();
  }
  di.style.opacity = 1;
  di.style.pointerEvents = "auto";
}
function di_no_click(e) {
  if (di_yes.checked) {
    di_yes.click();
  }
  di.style.opacity = 0;
  di.style.pointerEvents = "none";
}

mgdl = document.getElementById('unit_mg/dL');
mmoll = document.getElementById('unit_mmol/L');
mgdl.addEventListener('click', mgdl_click);
mmoll.addEventListener('click', mmoll_click);
function mgdl_click(e) {
  if (mmoll.checked) {
    mmoll.click();
  }
  high_display_txt.textContent = high_input.value;
  low_display_txt.textContent = low_input.value;
  temp_is_mgdl = true;
}
function mmoll_click(e) {
  if (mgdl.checked) {
    mgdl.click();
  }
  high_display_txt.textContent = round((high_input.value * 0.0555), 1);
  low_display_txt.textContent = round((low_input.value * 0.0555), 1);
  temp_is_mgdl = false;
}



high_input = document.getElementById('high_input');
high_display_txt = document.getElementById('high_display_txt');
high_spin_minus = document.getElementById('high_spin_minus');
high_spin_plus = document.getElementById('high_spin_plus');

high_spin_minus.addEventListener('click', hsm);
high_spin_minus.addEventListener('mouseover', hsm);
high_spin_minus.addEventListener('mouseout', hsm);

high_spin_plus.addEventListener('click', hsp);
high_spin_plus.addEventListener('mouseover', hsp);
high_spin_plus.addEventListener('mouseout', hsp);

function hsm(e) {
  value = parseInt(high_input.value);

  if (e["type"] == "click") {
    high_spin_plus.style.cursor = 'pointer';
    if (isNaN(value)) {
      val = 120;
      high_input.value = val;
      high_spin_minus.style.cursor = 'default';
      if (temp_is_mgdl) { high_display_txt.textContent = val; }
      else { high_display_txt.textContent = round((val * 0.0555), 1); }
    }
    else if (value == 120) { }
    else {
      val = value - 5;
      high_input.value = val;
      if (temp_is_mgdl) { high_display_txt.textContent = val; }
      else { high_display_txt.textContent = round((val * 0.0555), 1); }
    }

    if (((value - 5) == 120) || (parseInt(high_input.value) == 120)) {
      high_spin_minus.style.cursor = 'default';
      high_spin_minus.style.color = 'var(--gray)';
    } else { high_spin_minus.style.cursor = 'pointer'; }
  }

  if (e["type"] == "mouseover") {
    if (value != 120) {
      high_spin_minus.style.color = 'var(--text-brown)';
    }
  }

  if (e["type"] == "mouseout") {
    high_spin_minus.style.color = 'var(--gray)';
  }
}

function hsp(e) {
  value = parseInt(high_input.value);

  if (e["type"] == "click") {
    high_spin_minus.style.cursor = 'pointer';
    if (isNaN(value)) {
      val = 400;
      high_input.value = val;
      high_spin_plus.style.cursor = 'default';
      if (temp_is_mgdl) { high_display_txt.textContent = val; }
      else { high_display_txt.textContent = round((val * 0.0555), 1); }
    }
    else if (value == 400) { }
    else {
      val = value + 5;
      high_input.value = val;
      if (temp_is_mgdl) { high_display_txt.textContent = val; }
      else { high_display_txt.textContent = round((val * 0.0555), 1); }
    }

    if (((value + 5) == 400) || (parseInt(high_input.value) == 400)) {
      high_spin_plus.style.cursor = 'default';
      high_spin_plus.style.color = 'var(--gray)';
    } else { high_spin_plus.style.cursor = 'pointer'; }
  }

  if (e["type"] == "mouseover") {
    if (value != 400) {
      high_spin_plus.style.color = 'var(--black)';
    }
  }

  if (e["type"] == "mouseout") {
    high_spin_plus.style.color = 'var(--gray)';
  }
}

low_input = document.getElementById('low_input');
low_display_txt = document.getElementById('low_display_txt');
low_spin_minus = document.getElementById('low_spin_minus');
low_spin_plus = document.getElementById('low_spin_plus');

low_spin_minus.addEventListener('click', lsm);
low_spin_minus.addEventListener('mouseover', lsm);
low_spin_minus.addEventListener('mouseout', lsm);

low_spin_plus.addEventListener('click', lsp);
low_spin_plus.addEventListener('mouseover', lsp);
low_spin_plus.addEventListener('mouseout', lsp);

function lsm(e) {
  value = parseInt(low_input.value);
  if (e["type"] == "click") {
    low_spin_plus.style.cursor = 'pointer';
    if (isNaN(value)) {
      val = 60;
      low_input.value = val;
      low_spin_minus.style.cursor = 'default';
      if (temp_is_mgdl) { low_display_txt.textContent = val; }
      else { low_display_txt.textContent = round((val * 0.0555), 1); }
    }
    else if (value == 60) { }
    else {
      val = value - 5;
      low_input.value = val;
      if (temp_is_mgdl) { low_display_txt.textContent = val; }
      else { low_display_txt.textContent = round((val * 0.0555), 1); }
    }

    if (((value - 5) == 60) || (parseInt(low_input.value) == 60)) {
      low_spin_minus.style.cursor = 'default';
      low_spin_minus.style.color = 'var(--gray)';
    } else { low_spin_minus.style.cursor = 'pointer'; }
  }

  if (e["type"] == "mouseover") {
    if (value != 60) {
      low_spin_minus.style.color = 'var(--black)';
    }
  }

  if (e["type"] == "mouseout") {
    low_spin_minus.style.color = 'var(--gray)';
  }
}

function lsp(e) {
  value = parseInt(low_input.value);
  if (e["type"] == "click") {
    low_spin_minus.style.cursor = 'pointer';
    if (isNaN(value)) {
      val = 100;
      low_input.value = val;
      low_spin_plus.style.cursor = 'default';
      if (temp_is_mgdl) { low_display_txt.textContent = val; }
      else { low_display_txt.textContent = round((val * 0.0555), 1); }
    }
    else if (value == 100) { }
    else {
      val = value + 5;
      low_input.value = val;
      if (temp_is_mgdl) { low_display_txt.textContent = val; }
      else { low_display_txt.textContent = round((val * 0.0555), 1); }
    }

    if (((value + 5) == 100) || (parseInt(low_input.value) == 100)) {
      low_spin_plus.style.cursor = 'default';
      low_spin_plus.style.color = 'var(--gray)';
    } else { low_spin_plus.style.cursor = 'pointer'; }
  }

  if (e["type"] == "mouseover") {
    if (value != 100) {
      low_spin_plus.style.color = 'var(--black)';
    }
  }

  if (e["type"] == "mouseout") {
    low_spin_plus.style.color = 'var(--gray)';
  }
}

settings_container = document.getElementById('settings_container');
save_btn = document.getElementById('save_btn');
save_txt = document.getElementById('save_txt');
save_check = document.getElementById('save_check');
save_err = document.getElementById('save_err');
save_btn.addEventListener('click', sb);

let settings_open = false;
let python_ss_err = false;

function sb(e) {
  if (e["type"] == 'click') {
    try {
      save_settings();
    }
    catch (err) {
      console.log('Error Saving Settings:\n' + err);
      save_btn.style.backgroundColor = 'var(--low-red)';
      save_btn.style.border = '3px solid var(--low-red)';
      save_btn.classList.add('save_btn_err');
      save_txt.style.transform = 'scale(0)';
      save_err.style.transform = 'translate(-50%, -50%) scale(1)';
      ce = setTimeout(cleanup_err, 2000);
      save_err.style.opacity = 1;
      return;
    }
    save_btn.classList.add('save_btn_anim');
    save_txt.style.transform = 'scale(0)';
    save_check.style.transform = 'translate(-50%, -50%) scale(1)';
    settings_container.style.top = '-100%';
    cl = setTimeout(cleanup_settings, 2000);
    if (vibe_check) {
      eel.end_vibe_check();
      vibe_check = false;
    }
  }
}

function cleanup_settings() {
  save_txt.style.color = 'var(--white)';
  save_btn.classList.remove('save_btn_anim');
  save_txt.style.transform = 'scale(1)'
  save_check.style.transform = 'translate(-50%, -50%) scale(0)'
}

function cleanup_err() {
  function icons() {
    save_txt.style.transform = 'scale(1)';
    save_txt.opacity = 1;
  }
  save_btn.style.backgroundColor = 'var(--green)';
  save_btn.style.border = '3px solid var(--green)';
  save_btn.classList.remove('save_btn_err');
  save_err.style.opacity = 0;
  save_txt.opacity = 0;
  save_err.style.transform = 'translate(-50%, -50%) scale(0)';

  ic = setTimeout(icons, 10);
}

name_inp = document.getElementById('name_input');
username_inp = document.getElementById('username_input');
password_inp = document.getElementById('password_input');

function save_settings() {
  python_ss_err = false;
  function cs_callb(err) {
    if (err) {
      python_ss_err = true;
    }
  }
  st_name = name_inp.value;
  st_username = username_inp.value;
  st_password = password_inp.value;
  st_ous = null;
  st_mtry = null;
  st_di = null;
  st_unit = null;
  if (ous_yes.checked) { st_ous = true; }
  if (ous_no.checked) { st_ous = false; }
  if (mtry_yes.checked) { st_mtry = true; }
  if (mtry_no.checked) { st_mtry = false; }
  if (di_yes.checked) { st_di = true; }
  if (di_no.checked) { st_di = false; }
  if (mgdl.checked) { st_unit = 'mg/dL'; }
  if (mmoll.checked) { st_unit = 'mmol/L'; }
  st_high = parseInt(high_input.value);
  st_low = parseInt(low_input.value);
  eel.change_settings(st_name, st_username, st_password, st_ous, st_mtry, st_unit, st_high, st_low, st_di)(cs_callb);
  if (python_ss_err) { console.log('ererrr'); throw 'Error In Python While Saving Settings'; }
  settings_open = false;
}

settings.addEventListener('click', load_settings);

function load_settings(e) {
  function update(data) {
    name_inp.value = data["name"];
    username_inp.value = data["username"];
    password_inp.value = data["password"];

    ous = data["outside united states"];
    if (ous) { if (!ous_yes.checked) { ous_yes.click() } } else { if (!ous_no.checked) { ous_no.click() } }

    mtry = data["military time"];
    if (mtry) { if (!mtry_yes.checked) { mtry_yes.click() } } else { if (!mtry_no.checked) { mtry_no.click() } }

    disp = data["display info"];
    if (disp) { if (!di_yes.checked) { di_yes.click() } } else { if (!di_no.checked) { di_no.click() } }

    unit = data["unit (mg/dL or mmol/L)"];
    if (unit == "mg/dL") { if (!mgdl.checked) { mgdl.click() } } else { if (!mmoll.checked) { mmoll.click() } }

    high_input.value = data["high"];
    low_input.value = data["low"];
    if (is_mgdl) {
      high_display_txt.textContent = high_input.value;
      low_display_txt.textContent = low_input.value;
    }
    else if (!is_mgdl) {
      high_display_txt.textContent = round((high_input.value * 0.0555), 1);
      low_display_txt.textContent = round((low_input.value * 0.0555), 1);
    }

    settings_container.style.top = '50%';

    settings_open = true;
  }
  if (!settings_open) {
    eel.get_settings()(update);
  }
}


document.addEventListener('click', (event) => {
  inside_settings = event.composedPath().includes(settings_container);
  if (!inside_settings && settings_open) {
    settings_container.style.top = '-100%';
    settings_open = false;
  }
})

eel.expose(settings_vibe_check);
function settings_vibe_check() {
  settings_container.style.top = '50%';
  settings_open = true;
  vibe_check = true;
}


document.addEventListener('DOMContentLoaded', init);
function init() {
  load_bounds();
  load_zoom_level();
  load_menu_pos();
  eel.d4d();
}


const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('autocorrect', 'off')
  input.setAttribute('autocapitalize', 'off')
  input.setAttribute('spellcheck', false)
})


// Disable keyboard shortcuts
window.onkeydown = function (e) {
  if ((e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) && settings_open) {
    settings_container.style.top = '-100%';
    settings_open = false;
  }
  if ((e.ctrlKey || e.metaKey) && (e.which === 61 || e.which === 107 || e.which === 173 || e.which === 109 || e.which === 187 || e.which === 189)) {
    e.preventDefault();
  }
  // Disable zoom
  if ((e.keyCode == 173 || e.keyCode == 61) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable minimize and close
  if ((e.keyCode == 77 || e.keyCode == 87) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable reload
  if ((e.keyCode == 82 || (e.keyCode == 82 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable inspect
  if ((e.keyCode == 73 && e.shiftKey) && (e.ctrlKey || e.metaKey)) { e.preventDefault() }
  // Disable find in search
  if ((e.keyCode == 70) && (e.ctrlKey || e.metaKey)) { e.preventDefault() }
  // Disable F1-F4 keys
  if (e.keyCode == 112 || e.keyCode == 113 || e.keyCode == 114 || e.keyCode == 115) { e.preventDefault(); }
  // Disable F5-F8 keys
  if (e.keyCode == 116 || e.keyCode == 117 || e.keyCode == 118 || e.keyCode == 119) { e.preventDefault(); }
  // Disable F9-F12 keys
  if (e.keyCode == 120 || e.keyCode == 121 || e.keyCode == 122 || e.keyCode == 123) { e.preventDefault(); }
  // Disable undo, redo, select all
  if ((e.keyCode == 90 || e.keyCode == 89 || e.keyCode == 65) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable cut, copy, and paste
  if ((e.keyCode == 88 || e.keyCode == 67 || e.keyCode == 86) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable new tab, open last tab
  if ((e.keyCode == 84 || (e.keyCode == 84 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable source code, save page, history
  if ((e.keyCode == 85 || e.keyCode == 83 || e.keyCode == 72) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable open bookmarks
  if ((e.keyCode == 79 && e.shiftKey) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable printing
  if ((e.keyCode == 80 || (e.keyCode == 80 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable find in search (with G)
  if ((e.keyCode == 71 || (e.keyCode == 71 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable downloads and devtools
  if ((e.keyCode == 74 || (e.keyCode == 74 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
  // Disable new tab and new incognito tab
  if ((e.keyCode == 78 || (e.keyCode == 78 && e.shiftKey)) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); }
}

