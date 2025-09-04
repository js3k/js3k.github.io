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

let targetEl = null;

const ATTR_MAP = {
  svg: ['width', 'height', 'viewBox'],
  circle: ['fill', 'stroke', 'stroke-width', 'r'],
  rect: ['fill', 'stroke', 'stroke-width', 'width', 'height'],
  path: ['fill', 'stroke', 'stroke-width'],
  text: ['fill', 'stroke', 'font-size'],
  line: ['stroke', 'stroke-width', 'x1', 'y1', 'x2', 'y2'],
  ellipse: ['fill', 'stroke', 'stroke-width', 'rx', 'ry'],
  polygon: ['fill', 'stroke', 'stroke-width'],
  polyline: ['fill', 'stroke', 'stroke-width'],
  textpath: ['startOffset', 'href', 'fill', 'stroke', 'font-size']
};

const injectHtml = `<div id="pickerContainer">
  <div id="output">Klik elemen SVG untuk melihat atribut dan mulai injeksi...</div>
  <button id="toggleSourceBtn">🔍Source</button>
  <button id="copySourceBtn">📋 Copy</button>
  <button id="downloadSvgBtn">💾 Download</button>
  <pre id="svgSourceDisplay"></pre>
  <fieldset>
    <legend>Target Atribut:</legend>
    <div id="attrRadioGroup">
      <!-- Radio dinamis akan dimasukkan di sini -->
    </div>
  </fieldset>
  <div class="range-group" id="rangeGroup">
    <label for="sizeRange">Ukuran:</label>
    <input class="input-range" type="range" id="sizeRange" value="5" min="1" max="1000">
    <span class="range-value" id="rangeValue">5</span>
  </div>
  <div id="picker"></div>
</div>`;

function injectPanel(html) {
  $('.inject-container').remove();
  const $inject = $('<div class="inject-container"></div>').html(html);
  $(targetEl).closest('svg').after($inject);
  initLivePanel();
}

function renderAttrRadios(tagName) {
  const attrs = ATTR_MAP[tagName] || [];
  const $container = $('#attrRadioGroup');
  $container.empty();

  if (attrs.length === 0) {
    $container.append('<p>(Tidak ada atribut yang bisa dimodifikasi)</p>');
    return;
  }

  attrs.forEach(attr => {
    const id = `attr-${attr}`;
    const radio = `
      <label for="${id}">
        <input type="radio" name="attrTarget" value="${attr}" id="${id}">
        ${attr}
      </label>
    `;
    $container.append(radio);
  });

  $container.find('input[name="attrTarget"]').first().prop('checked', true).trigger('change');
}

function initLivePanel() {
  const tag = targetEl.tagName.toLowerCase();
  const attrs = Array.from(targetEl.attributes).map(attr => `${attr.name}="${attr.value}"`);
  $('#output').text(`🎯 Target: <${tag}>\n${attrs.join('\n') || '(tidak ada atribut)'}`);
  renderAttrRadios(tag);
  updateLiveSource();

  $('input[name="attrTarget"]').off('change').on('change', function () {
  const attr = $(this).val();
  const isSizeAttr = ['stroke-width', 'r', 'font-size', 'width', 'height', 'rx', 'ry'].includes(attr);
  const isViewBox = attr === 'viewBox';

  $('#rangeGroup').toggle(isSizeAttr);
  $('#viewBoxGroup').remove(); // bersihkan dulu

  if (isViewBox) {
    const currentVal = $(targetEl).attr('viewBox') || '';
    const viewBoxInput = `
      <div id="viewBoxGroup">
        <label for="viewBoxInput">ViewBox:</label>
        <input type="text" id="viewBoxInput" value="${currentVal}" placeholder="contoh: 0 0 100 100">
      </div>
    `;
    $('#picker').before(viewBoxInput);

    $('#viewBoxInput').on('input', function () {
      const val = this.value;
      $(targetEl).attr('viewBox', val);
      $('#output').text(`\n🧭 viewBox diubah ke "${val}"`);
      updateLiveSource();
    });
  }
});

  $('#picker').colpick({
    flat: true,
    layout: 'hex',
    submit: 0,
    color: 'ff0000',
    onChange: function(hsb, hex, rgb, el, bySetColor) {
      if (targetEl) {
        const attr = $('input[name="attrTarget"]:checked').val();
        const isSizeAttr = ['stroke-width', 'r', 'font-size', 'width', 'height', 'rx', 'ry'].includes(attr);
        if (!isSizeAttr) {
          $(targetEl).attr(attr, '#' + hex);
          $('#output').text(`\n🎨 ${attr} diubah ke #${hex}`);
          updateLiveSource();
        }
      }
    }
  });

  $('#sizeRange').off('input').on('input', function () {
    const val = this.value;
    $('#rangeValue').text(val);
    const attr = $('input[name="attrTarget"]:checked').val();
    if (targetEl && ['stroke-width', 'r', 'font-size', 'width', 'height', 'rx', 'ry'].includes(attr)) {
      $(targetEl).attr(attr, val);
      $('#output').text(`\n📏 ${attr} diubah ke ${val}`);
      updateLiveSource();
    }
  });

  $('#toggleSourceBtn').off('click').on('click', function () {
    $('#svgSourceDisplay').slideToggle();
    updateLiveSource();
  });

  $('#copySourceBtn').off('click').on('click', function () {
    const svgRoot = $(targetEl).closest('svg')[0];
    if (svgRoot) {
      const svgText = svgRoot.outerHTML;
      navigator.clipboard.writeText(svgText).then(() => {
        alert('✅ SVG berhasil disalin ke clipboard!');
      }).catch(err => {
        alert('❌ Gagal menyalin: ' + err);
      });
    } else {
      alert('⚠️ Tidak ada elemen SVG yang dipilih.');
    }
  });

  $('#downloadSvgBtn').off('click').on('click', function () {
    const svgRoot = $(targetEl).closest('svg')[0];
    if (svgRoot) {
      const svgText = svgRoot.outerHTML;
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'injected-svg.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert('⚠️ Tidak ada elemen SVG yang dipilih.');
    }
  });
}

function updateLiveSource() {
  const svgRoot = targetEl ? $(targetEl).closest('svg')[0] : null;
  const svgContent = svgRoot ? svgRoot.outerHTML : '(SVG tidak ditemukan)';
  $('#svgSourceDisplay').text(svgContent);
}
$(document).on('click', 'svg, svg *', function (e) {
  e.stopPropagation();
  $('svg,svg *').removeClass('highlight');
  $(this).addClass('highlight');

  let clickedEl = this;
  let tag = clickedEl.tagName.toLowerCase();

  // ✅ Jika klik <textPath>, fallback ke parent <text>
  if (tag === 'textpath') {
    const parentText = $(clickedEl).closest('text')[0];
    if (parentText) {
      targetEl = parentText;
      console.log('🎯 Fallback ke <text> dari <textPath>');
    } else {
      targetEl = clickedEl; // fallback tetap ke <textPath> kalau gak ada <text>
    }
  } else {
    targetEl = clickedEl;
  }

  injectPanel(injectHtml);
});

$(document).ready(function () {
  setupSVGClickHandler();
});