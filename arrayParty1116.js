var rectangels=[[13,0,90,1],[22,0,98,1]]
function finalResult(rectangels){
    var minXminY= getMinMax(rectangels) // minX, minY, maxX, maxY구해놓은것 
    var array = baseArray(minXminY); // base Array (판)
    var n1=[];
    var n2=[];
    var n3=[];
    var n4=[];
    var minX = minXminY[0]
    var minY = minXminY[1]
    var maxX = minXminY[2]
    var maxY = minXminY[3]
    var fromOut = rectangels; // 여기를 map, reduce를 이용해 minXminY배열의 1,2번째 값으로 for문돌리면서 빼줘야 한다. ---> 걍 쓰지말자. 

    console.log(minX," << minX")
    console.log(minY," << minY")
   
    for(var i=0;i<fromOut.length;i++){   // x,y값을 각각 원점으로 삼아 여기에 맞춰서 각 사각형들의 시작점과 끝점을 세팅 (n2, n1, n4, n3 // 시작점 ~ 끝점)
        for(var j=0;j<fromOut[i].length;j++){
            if(j==0){
                n1.push(fromOut[i][j]-minX);                  
            }
            else if(j==1){
                n2.push(fromOut[i][j]-minY);
               
            }
            else if(j==2){                   
                n3.push(fromOut[i][j]-minX-1);               
            }
            else if(j==3){
                n4.push(fromOut[i][j]-minY-1);                  
            }                  
        }
    }
  
   
   console.log('n2 <<<<< ',n2)
   console.log('n1 <<<<< ',n1)
   console.log('n4 >>>>> ',n4)   
   console.log('n3 <<<<< ',n3)

   var cnt=0;
   var length=n2.length;      
   for(var k=0;k<length;k++){

       var x0=n2[k]; console.log('x0',x0)
       var y0=n1[k]; console.log('y0',y0)
       var x1=n4[k]; console.log('x1',x1)
       var y1=n3[k]; console.log('y1',y1)

       for(var a=x0;a<=x1;a++){             
           for(var b=y0;b<=y1;b++){
               if(array[a][b]!=0){
               array[a][b]=0;
               cnt++;
               }
           }

       } 
 
   }   
  return cnt;   
}
function baseArray(newArray){
    console.log("newArray >> ",newArray)
       var width = newArray[2]-newArray[0];
       var height = newArray[3]-newArray[1];
       console.log("width >> ",width,"height >> ",height)
       var arr = new Array();   
        for(var i=1;i<width*height+1;i+=width){
            var arr2 = new Array();
            for(var j=i;j<i+width;j++){
                arr2.push(j);
            }
            arr.push(arr2);   
        }    console.table(arr)
    return arr;     
   }
function getMinMax(rectangels){
    var array=rectangels; 
    var minMaxArray=[];
    var minX=array[0][0];
    var minY=array[0][1];
    var maxX=array[0][2];
    var maxY=array[0][3];
    var length=array.length;
    console.log("length   >>>>>>>   ",length)
    for(var i=0;i<length;i++){
        for(var j=0;j<4;j++){        
            if(j%2==0){   
                //x축         
                if(minX>array[i][j]) minX=array[i][j];
                if(maxX<array[i][j]) maxX=array[i][j];                   
            }
            else if(j%2==1){
                //y축
                if(minY>array[i][j]) minY=array[i][j];
                if(maxY<array[i][j]) maxY=array[i][j];
            }
       }
    }
    minMaxArray.push(minX,minY,maxX,maxY)
   return minMaxArray;
   }
console.log(finalResult(rectangels))