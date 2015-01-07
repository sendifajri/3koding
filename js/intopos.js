function isOperand(who)
	{
		return((!isOperator(who) && (who!="(") && (who!=")"))? true : false);
	}
	
function isOperator(who)
	{
		return((who=="+" || who=="-" || who=="*" || who=="/" || who=="^")? true : false);
	}
//cek tingkatan
function cek(who){
		if(who=="^")
			return(5);
		if((who=="*")||(who=="/"))
			return(4);
		if((who=="+")||(who=="-"))
			return(3);
		if(who=="(")
			return(2);
		if(who==")")
			return(1);
	}   
function main() {
    var str = document.getElementById("infixVal").value;
    var strArray = str.split("");//konvert ke array
//array stack dan hasil
    var stack =[];
    var hasil =[];
    var cetakArr=[];
    var tblArr=[];
    var popele=[];
    var popall= [];//pop semua stack akhir ke tabel
//cetak ke html
    var cetak=document.getElementById("stack");
    var cetaktbl = document.getElementById("tabel");
//-----------------------------------
if(strArray==""){
    $("#idAlert1").addClass('animated shake');
    $("#idAlert1").show();
}
else{
    for(var i=0; i < strArray.length; i++){
       if(isOperand(strArray[i])){
           hasil.push(strArray[i]);
           popele[i]=strArray[i];//PUSH hasil dengan length infix
     }
       
        if(isOperator(strArray[i])){
            while(cek(strArray[i])<=cek(stack[stack.length-1])){ //membandingkan operator
                popele[i]+=stack[stack.length-1];
                hasil.push(stack.pop());
            }
                stack.push(strArray[i]);
        }   
       if(strArray[i]=="("){
            stack.push(strArray[i]);
        }
//pop semua array sampai "("
        if(strArray[i]==")"){
            while(stack[stack.length-1]!="("){
                popele[i]+=stack[stack.length-1];
                hasil.push(stack.pop());
                if(stack[stack.length-1]==stack[-1]){
                    $("#idAlert2").addClass('animated shake');
                    $("#idAlert2").show();
                    break;}//handling loop
            }
                if(popele[i]==undefined)popele[i]="";//menghilangkan undefined
                stack.pop();
        }
        //simpan stack untuk tabel
        for(var j=stack.length-1;j>=0;j--){
        tblArr+=stack[j]+"<br/>";
        } 
        tblArr+=",";
    }
//^kodingan stack^
//split array (array --> string --> array)
    var pstack=tblArr.toString();
    var hstack=pstack.split(",");
// hasil stack dengan length infix (array --> string -->array(delete(,undefined)) --> string --> array)
    var ppopele=popele.toString();
    var hpopele=ppopele.split(",undefined");  
    var ppopele1=hpopele.toString();
    var hpopele1=ppopele1.split(",");    
//push semua sisa stack ke hasil
        if(strArray[i]==strArray[strArray.length]){
            for(var y=stack.length-1;y>=0;y--){
                popall+=stack[y]; //push semua stack ke tabel akhir 
                hasil.push(stack[y]);
                stack.pop();
            }
        }
//---------------TABEL-------------    
    var result = "<div class=table-responsive><table class=table>";
    for(var a=0; a< 3; a++) {
        result += "<tr>";
        for(var b=0; b<hstack.length; b++){
            if(a==0){ //cetak infix 
                if(b==hstack.length-1)result += "<td>"+";"+"</td>";//jika for tabel=length infix, maka ditambahkan nilai ";" 
                    else
                        result += "<td>"+strArray[b]+"</td>";    
            }
            else if(a==1){ //cetak stack
                result += "<td style=vertical-align:bottom;>"+hstack[b]+"</td>";}
            else { //cetak hasil
                if(b==hstack.length-1)result += "<td>"+popall+"</td>"; 
                    else result += "<td>"+hpopele1[b]+"</td>";}
        }
        result += "</tr>";
    }
    result += "</table>";
//-------------------------------   
    //cetak hasil
    for(var x=0; x < hasil.length;x++){
         cetakArr+=hasil[x]; 
        if(hasil[x]=="("){
         $("#idAlert2").addClass('animated shake');
         $("#idAlert2").show(); 
        }
        }
    cetak.innerHTML=cetakArr;
    cetaktbl.innerHTML=result;
}// else strarray =""
}