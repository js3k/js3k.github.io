function vs(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "silver" : "coral";
}

$('#copy').on('click', () => {navigator.clipboard.writeText($('#text').val());
$('#notif').text('✅ Berhasil di-copy').fadeIn();
setTimeout(() => {$('#notif').fadeOut(() => $('#notif').text(''))}, 2000)});
const svg = $('#svg')[0];
const $resizable = $('#resizable');
const $handle = $('#handle');
let isResizing = false;
let newWidth = $resizable.width();
let newHeight = $resizable.height();
const updateSizeDisplay = () => {
$('#sizeDisplay').text(`${Math.round(newWidth)}px × ${Math.round(newHeight)}px`);
const serializer = new XMLSerializer();
let source = serializer.serializeToString(svg);
$('#text').val(source);
};
const sendSizeAndUpdate = () => {
const data = { width: Math.round(newWidth), height: Math.round(newHeight) };
$.post("http://192.168.43.25:5000/save-size", JSON.stringify(data), null, "json")
.then(() => $.get("http://192.168.43.25:5000/dynamic-html"));
};
const startResize = (e) => {
isResizing = true;
const startX = e.clientX || e.originalEvent.touches[0].clientX;
const startY = e.clientY || e.originalEvent.touches[0].clientY;
const startWidth = $resizable.width();
const startHeight = $resizable.height();
const doResize = (moveEvent) => {
if (!isResizing) return;
const moveX = moveEvent.clientX || moveEvent.originalEvent.touches[0].clientX;
const moveY = moveEvent.clientY || moveEvent.originalEvent.touches[0].clientY;
newWidth = startWidth + (moveX - startX);
newHeight = startHeight + (moveY - startY);
$resizable.css({ width: newWidth, height: newHeight });
$('#svg').attr({ width: Math.round(newWidth), height: Math.round(newHeight) });
$('#text').css({ width: Math.round(newWidth), height: Math.round(newHeight)});
$('#display').css({ width: Math.round(newWidth)});
updateSizeDisplay();
};
const stopResize = () => {
isResizing = false;
$(window).off('mousemove touchmove', doResize);
$(window).off('mouseup touchend', stopResize);
updateSizeDisplay();
sendSizeAndUpdate();
};
$(window).on('mousemove touchmove', doResize);
$(window).on('mouseup touchend', stopResize);
};
$('#handle').on('mousedown touchstart', startResize);
updateSizeDisplay();
sendSizeAndUpdate();
$('.input-range').on('input', function(){
$(this).prev('.range-value').text(this.value);
const serializer = new XMLSerializer();
let source = serializer.serializeToString(svg);
$('#text').val(source);
});
let isDrawing = false;
let pathData = '';
$('#reset').click(function() {
pathData = '';
$('#path').attr('d', '');
$('#text').val("");
$('#panjang').text("");
});
const getLocalCoords = (event) => {
  const touch = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
  const svgRect = svg.getBoundingClientRect();
  const x = touch.clientX - svgRect.left;
  const y = touch.clientY - svgRect.top;
  return { x, y };
};

const isInsideSVG = ({ x, y }) => {
  return x >= 0 && y >= 0 && x <= svg.width.baseVal.value && y <= svg.height.baseVal.value;
};

const startDrawing = (event) => {
  const { x, y } = getLocalCoords(event);
  if (!isInsideSVG({ x, y })) return;

  isDrawing = true;
  pathData += `M ${Math.round(x)} ${Math.round(y)}`;
  $('path').attr('d', pathData);
  event.preventDefault();

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  $('#text').val(source);
};
const updatePathLength = () => {
  const path = document.getElementById('path');
  const length = path.getTotalLength();
  $('#panjang').text(`Panjang: ${Math.round(length)}`);

};
const draw = (event) => {
  if (!isDrawing) return;
  const { x, y } = getLocalCoords(event);
  if (!isInsideSVG({ x, y })) return;

  pathData += ` L ${Math.round(x)} ${Math.round(y)}`;
  $('#path').attr('d', pathData);

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  $('#text').val(source);
  updatePathLength(); 
};
const stopDrawing = () => { isDrawing = false; };
$('#svg').on('touchstart mousedown', startDrawing);
$('#svg').on('touchmove mousemove', draw);
$('#svg').on('touchend touchcancel mouseup mouseleave', stopDrawing);
$('#pSize').on('input', function() { $('#path').attr('stroke-width', this.value); });
$('#pFill').on('input', function() { $('#path').attr('fill', this.value); });
$('#pSc').on('input', function() { $('#path').attr('stroke', this.value); });
$('#cSw').on('input', function() { $('circle').attr('stroke-width', this.value); });
$('#circleR').on('input', function() { $('circle').attr('r', this.value); });
$('#cFill').on('input', function() { $('circle').attr('fill',this.value); });
$('#cSc').on('input', function() { $('circle').attr('stroke', this.value); });
$('#dur').on('input', function() { $('animateMotion').attr('dur',this.value)});
$('#download').on('click', () => {
const serializer = new XMLSerializer();
let source = serializer.serializeToString(svg);
const blob = new Blob([source], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);
const $a = $('<a>').attr('href', url).attr('download', 'image.svg').appendTo('body');
$a[0].click();
$a.remove();
URL.revokeObjectURL(url);
});
$('#text').on('input', function () {
  const svgMarkup = $(this).val();
  $('#svg').html(svgMarkup); 
});	