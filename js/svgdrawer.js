function vs(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "silver" : "coral";
}
    $("#menu").click(function() {
        $("#resizable").toggle();
        if ($("#resizable").is(":visible")) {
            $(this).text("Tutup ❌");
        } else {
            $(this).text("Draw🖍");
        }
    });


const svg = $('#svg')[0];
const $resizable = $('#resizable');
const $handle = $('#handle');
let isResizing = false;
let newWidth = $resizable.width();
let newHeight = $resizable.height();
const updateSizeDisplay = () => {
$('#sizeDisplay').text(`${Math.round(newWidth)}px × ${Math.round(newHeight)}px`);
};
$(window).on('load', function() {
$('svg').attr('width',newWidth);
$('svg').attr('height',newHeight);
var mainPathD = $('#path').attr('d');
$('path').attr('d', mainPathD);
$('animate,animateMotion').attr('dur',$('#dur').val());
$('path').attr('stroke-width', $('#pSize').val());
$('path').attr('fill', $('#pFill').val());
$('path').attr('stroke', $('#pSc').val());
$('circle').attr('stroke-width', $('#cSw').val());
$('circle').attr('r', $('#circleR').val());
$('circle').attr('fill',$('#cFill').val());
$('circle').attr('stroke', $('#cSc').val());
$('text').attr('fill', $('#tFc').val());
$('text').attr('font-size', $('#tFs').val());
$('animate,animateMotion').attr('dur',$('#dur').val()+'s');
$('#textPath').text($('#tAc').val());

});
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
$('svg').attr({ width: Math.round(newWidth), height: Math.round(newHeight) });
updateSizeDisplay();
};
const stopResize = () => {
isResizing = false;
$(window).off('mousemove touchmove', doResize);
$(window).off('mouseup touchend', stopResize);
updateSizeDisplay();
};
$(window).on('mousemove touchmove', doResize);
$(window).on('mouseup touchend', stopResize);
};
$('#handle').on('mousedown touchstart', startResize);
updateSizeDisplay();

$('.input-range').on('input', function(){
$(this).prev('.range-value').text(this.value);
});
let isDrawing = false;
let pathData = '';
$('#reset').click(function() {
pathData = '';
$('path').attr('d', '');
$('#textPath').text('');
$('#text').val("");
$('#panjang').text("");
});
$('#fNone').click(function() {$('path').attr('fill', 'none')});
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
$('path').attr('d', pathData);
$('#textPath').text($('#tAc').val()); 
updatePathLength(); 
};
const stopDrawing = () => { isDrawing = false; };
$('#svg').on('touchstart mousedown', startDrawing);
$('#svg').on('touchmove mousemove', draw);
$('#svg').on('touchend touchcancel mouseup mouseleave', stopDrawing);

$('#pSize').on('input', function() { $('path').attr('stroke-width', this.value); });
$('#pFill').on('input', function() { $('path').attr('fill', this.value); });
$('#none').on('click', function() { $('path').attr('fill','none'); });
$('#pSc').on('input', function() { $('path').attr('stroke', this.value); });
$('#cSw').on('input', function() { $('circle').attr('stroke-width', this.value); });
$('#circleR').on('input', function() { $('circle').attr('r', this.value); });
$('#cFill').on('input', function() { $('circle').attr('fill',this.value); });
$('#cSc').on('input', function() { $('circle').attr('stroke', this.value); });
$('#tFc').on('input', function() { $('text').attr('fill',this.value); });
$('#tFs').on('input', function() { $('text').attr('font-size',this.value); });
$('#dur').on('input', function() { $('animate,animateMotion').attr('dur',this.value+'s')});
$('#tAc').on('input', function (){$('#textPath').text($(this).val()); });
$('svg').on('click', function () {
  const svgElement = this; 
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgElement);
  const svgWithNS = source.includes('xmlns')
    ? source
    : source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const blob = new Blob([svgWithNS], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const $a = $('<a>')
    .attr('href', url)
    .attr('download', 'clicked-image.svg') 
    .appendTo('body');
  $a[0].click();
  $a.remove();
  URL.revokeObjectURL(url);
});