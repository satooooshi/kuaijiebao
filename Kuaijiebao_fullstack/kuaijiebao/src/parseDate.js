function parseDate(date){
    if(date) return date[0]+'/'+date[1]+'/'+date[2];
    else date;
}

module.exports = parseDate;