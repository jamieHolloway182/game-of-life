import { useState } from 'react'
import React, { useRef, useEffect } from 'react'
import canvasStyles from '../../styles/Canvas/Canvas.module.css'

const Canvas = ({cells, canvasDimensions, cellSize, onClick}) => {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawCells(ctx, cells);

    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    for (let i = 0; i < ctx.canvas.height / cellSize ; i ++){
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(ctx.canvas.width, i * cellSize);
    }
    for (let i = 0; i < ctx.canvas.width / cellSize ; i ++){
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i* cellSize, ctx.canvas.width);
    }
    ctx.stroke();
  })



  const drawCells = (ctx, cells) => {
    for (let y = 0; y < canvasDimensions[1]; y ++){
      for (let x = 0; x < canvasDimensions[0]; x ++){
        if (cells[y][x]){
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
          ctx.fill();
        }
      }
    }
  }

  const clicked = (event) => {
    const coords = relMouseCoords(event);
    const x = Math.floor(Math.min(canvasDimensions[0] - 1,(Math.max(coords.x / cellSize, 0))));
    const y = Math.floor(Math.min(canvasDimensions[1] - 1,(Math.max(coords.y / cellSize, 0))));
    onClick(x, y)
  }

  function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = canvasRef.current;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
  }
  
  return (
      <div className = {canvasStyles.canvasContainer}>
          <canvas onClick={clicked.bind(this)} className = {canvasStyles.canvas} ref = {canvasRef} width={canvasDimensions[0] * cellSize} height={canvasDimensions[1] * cellSize} ></canvas>
      </div>
  )
}




export default Canvas