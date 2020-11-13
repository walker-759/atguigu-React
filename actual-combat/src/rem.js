// 移动端适配方案
function REM(){
    const fontSize=document.documentElement.clientWidth/10
    document.documentElement.style.fontSize=fontSize+'px'
}
REM()