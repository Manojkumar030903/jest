import React from 'react';

export default function Calculator() {
  return (
    <>
      <label></label>
      <input data-testid="first" id="first-number" type="number" placeholder="enter first number" />
      <label></label>
      <input data-testid="second" id="second-number" type="number" placeholder="enter second number" />
      <button data-testid="add-button" onClick={add}>+</button>
      <button onClick={minus}>-</button>
      <button onClick={multiply}>*</button>
      <button onClick={divide}>/</button>
      <p placeholder="arith-res" data-testid="result" id="res">result</p>
    </>
  );

  function add() {
    const first = parseFloat(document.getElementById('first-number').value);
    const second = parseFloat(document.getElementById('second-number').value);
    document.getElementById('res').innerText = first + second;
  }

  function minus() {
    const first = parseFloat(document.getElementById('first-number').value);
    const second = parseFloat(document.getElementById('second-number').value);
    document.getElementById('res').innerText = first - second;
  }

  function multiply() {
    const first = parseFloat(document.getElementById('first-number').value);
    const second = parseFloat(document.getElementById('second-number').value);
    document.getElementById('res').innerText = first * second;
  }

  function divide() {
    const first = parseFloat(document.getElementById('first-number').value);
    const second = parseFloat(document.getElementById('second-number').value);
    document.getElementById('res').innerText = first / second;
  }
}
