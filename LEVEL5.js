function solution(rectangels){
    var cnt=0;
    
    var minX=rectangels[0][0];
    var minY=rectangels[0][1];
    var maxX=rectangels[0][2];
    var maxY=rectangels[0][3];
    
    //minX, minY 찾아서 배열 좌표 재설정을 한번의 작업에 해야함.  

    for(var i=0;i<rectangels.length;i++){
        for(var j=0;j<rectangels[0].length;j++){
            var newRectangles=rectangels;
            if(j==0){
                if(minX>rectangels[i][j]) minX=rectangels[i][j];
             //   if(maxX<rectangels[i][j]) maxX=rectangels[i][j];
                newRectangles[i][j]-=minX;
            }
            else if(j==1){
                if(minY>rectangels[i][j]) minY=rectangels[i][j];
                if(maxY<rectangels[i][j]) maxY=rectangels[i][j];

            }
            else if(j==2){
                if(minX>rectangels[i][j]) minX=rectangels[i][j];
                if(maxX<rectangels[i][j]) maxX=rectangels[i][j];  

            }
            else {
                if(minY>rectangels[i][j]) minY=rectangels[i][j];
                if(maxY<rectangels[i][j]) maxY=rectangels[i][j];

            }
        }
    }
    







    return cnt;
}
function baseArray(newArray){  //
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



   ////////////////////////////////
   // var arr1=[2,3,4,5,6];
   // const arr2 = arr1.map((currValue) => currValue + 1);

   const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
   const flatArrayReducer = (accumulator, value, index, array) => {
     //return accumulator.concat(value);
     return accumulator+3;
   };
   const flattenedData = data.reduce(flatArrayReducer, []); 
console.log(flattenedData)
   