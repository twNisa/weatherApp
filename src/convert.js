function convertC(data){

  data.temp = Math.round(data.temp-273.15);
  data.feels = Math.round(data.feels-273.15);
  return data;
}
function convertF(data){
  data.temp = Math.round(1.8 * (data.temp-273) + 32);
  data.feels = Math.round(1.8 * (data.feels-273) + 32);
  return data;
}

export {convertC, convertF}