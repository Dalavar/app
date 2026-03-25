var title = this.document.getElementById("title");
title.innerHTML = "Тестовое задание";
let canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight - 4;
let ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
// -
ctx.beginPath();
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, canvas.height);
ctx.strokeStyle = '#42567A';
ctx.lineWidth = 0.25;
ctx.stroke();
// |
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(0, canvas.height);
ctx.strokeStyle = '#42567A';
ctx.lineWidth = 0.25;
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0, centerY);
ctx.lineTo(1440, centerY);
ctx.strokeStyle = '#42567A';
ctx.lineWidth = 0.25;
ctx.stroke();
ctx.beginPath();
ctx.moveTo(canvas.width, 0);
ctx.lineTo(canvas.width, canvas.height);
ctx.strokeStyle = '#42567A';
ctx.lineWidth = 0.25;
ctx.stroke();
//  o
ctx.beginPath();
ctx.arc(centerX, centerY, 265, 0, Math.PI * 2, true);
ctx.moveTo(110, 75);
ctx.lineWidth = 0.25;
ctx.stroke();
// Гр.блок
ctx.beginPath();
let grd = ctx.createLinearGradient(0, 177, 0, 297);
grd.addColorStop(0, "#3877EE");
grd.addColorStop(1, "#EF5DA8");
ctx.fillStyle = grd;
ctx.fillRect(1, 177, 5, 120);
ctx.strokeStyle = '#42567A';
// Надпись
ctx.beginPath();
ctx.fillStyle = '#42567A';
ctx.font = 'bold 56px PTSans';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.fillText('Исторические', 80, 210);
ctx.beginPath();
ctx.fillStyle = '#42567A';
ctx.font = 'bold 56px PTSans';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.fillText('даты', 80, 270);
function calculatePoints(data, centerX, centerY) {
    points = [];
    const firstPointAngle = -Math.PI / 3;
    const angleStep = (2 * Math.PI) / data.length;
    for (let i = 0; i < data.length; i++) {
        const angle = firstPointAngle + (i * angleStep);
        const x = centerX + 265 * Math.cos(angle);
        const y = centerY + 265 * Math.sin(angle);
        let idPoint = data[i]['indexPoint'];
        let namePoint = data[i]['namePoint'];
        let dateSt = data[i]['datePointsStart'];
        let dateSp = data[i]['datePointsStop'];
        points.push({ x, y, idPoint, namePoint, dateSt, dateSp });
    }
    points.forEach(point => {
        ctx.beginPath();
        if (point.idPoint == 1) {
            ctx.fillStyle = '#ffffff';
            ctx.arc(point.x, point.y, 28, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#42567A';
            ctx.lineWidth = 0.25;
            ctx.stroke();
            // Номер точки
            ctx.fillStyle = '#42567A';
            ctx.font = 'bold 20px PTSans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.idPoint, point.x, point.y);
            // Надпись с точкой
            ctx.font = 'bold 20px PTSans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.namePoint, point.x + 75, point.y);
            // ГодЛ
            ctx.fillStyle = '#5D5FEF';
            ctx.font = 'bold 200px PTSans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.dateSt, centerX - 270, centerY);
            // ГодП
            ctx.fillStyle = '#EF5DA8';
            ctx.font = 'bold 200px PTSans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.dateSp, centerX + 250, centerY);
        }
        else {
            ctx.fillStyle = '#42567A';
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#42567A';
            ctx.lineWidth = 0.25;
            ctx.stroke();
        }
    });
}
fetch('assets/data.json')
    .then(response => response.json())
    .then(data => calculatePoints(data, centerX, centerY)).catch(error => console.error('Ошибка:', error));