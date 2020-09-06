'use strict';

{
  // 文字列を数式に変換し計算結果を得る
  function safeEval(val){
    console.log(val);
    return Function('return ('+val+')')();
  }

  // ans_countをリセット
  function ansCountReset() {
    if (ans_count > 0) {
      ans_count = 0;
    }
  }

  // dot_countをリセット
  function dotCountReset() {
    if (dot_count > 0) {
      dot_count = 0;
    }
  }

  let display = document.getElementById('display');
  let answer = 0;
  let ans_count = 0;
  let dot_count = 0;
  const btn = document.getElementsByClassName('btn');
  const symbol = document.getElementsByClassName('symbol');
  const min = document.getElementById('min');
  const dot = document.getElementById('dot');
  const clear = document.getElementById('clear');
  const equal = document.getElementById('equal');
  
  // 数字がクリックされたときの処理
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function(){
      if (display.value == 0) {
        display.value = btn[i].value;
        answer = btn[i].value;
        ansCountReset();
      } else {
        if (ans_count > 0) {
          ansCountReset();
          display.value = btn[i].value;
        } else {
          display.value = display.value + btn[i].value;
          answer = answer + btn[i].value;
        }
      }
    });
  }

  // ÷, ×, +がクリックされたときの処理
  for (let i = 0; i < symbol.length; i++) {
    symbol[i].addEventListener('click', function(){
      ansCountReset();
      if (isFinite(display.value.slice(-1))) {
        dotCountReset();
        display.value = display.value + symbol[i].value;
        if (symbol[i].value == '÷') {
          answer = answer + '/';
        } else if (symbol[i].value == '×') {
          answer = answer + '*';
        } else {
          answer = answer + '+';
        }
      } else if (display.value.slice(-1) == '.') {
        display.value = display.value + 0 + symbol[i].value;
        dotCountReset();
        if (symbol[i].value == '÷') {
        } else if (symbol[i].value == '×') {
        } else {
          answer = answer + '+';
        } 
      }
    });
  }

  // -がクリックされたときの処理
  min.addEventListener('click', function(){
    if (isFinite(display.value.slice(-1))) {
      dotCountReset();
      if (display.value == 0) {
        ansCountReset();
        display.value = '-';
        answer = '-';
      } else {
        ansCountReset();
        display.value = display.value + min.value;
        answer = answer + '-';
      }
    } else if (display.value.slice(-1) == '.') {
      countReset();
      dotCountReset();
      display.value = display.value + 0 + min.value;
      answer = answer + '-';
    }
  });

  // .がクリックされたときの処理
  dot.addEventListener('click', function(){
    if (dot_count == 0 && ans_count == 0){
      if (isFinite(display.value.slice(-1))) {
        dot_count++;
        display.value = display.value + dot.value;
        answer = answer + dot.value;
      }
    } 
  });

  // ACがクリックされたときの処理
  clear.addEventListener('click', function(){
    ansCountReset();
    dotCountReset();
    display.value = 0;
  });

  // =がクリックされたときの処理
  equal.addEventListener('click', function(){
    if (isFinite(display.value.slice(-1))) {
      display.value = safeEval(answer);
      answer = display.value;
      ans_count++;
    }
  });
}